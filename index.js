import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  database: 'world',
  port: '5433',
  host: 'localhost',
  password: '123456',
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const checkVisited = async () => {
  const result = await db.query('SELECT country_code FROM visited_countries');
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
};

app.get('/', async (req, res) => {
  let countries = await checkVisited();
  res.render('index.ejs', { countries: countries, total: countries.length });
});

app.post('/add', async (req, res) => {
  const input = req.body['country'];
  try {
    //This is to match exact string of input
    // const result = await db.query(
    //   'SELECT country_code FROM countries WHERE country_name = $1',
    //   [input]
    // );
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );
    const data = result.rows[0];
    const country_code = data.country_code;
    try {
      if (result.rows.length) {
        console.log(country_code);
        await db.query(
          'INSERT INTO visited_countries (country_code) VALUES($1)',
          [country_code]
        );
      }
      res.redirect('/');
    } catch (err) {
      let countries = await checkVisited();
      res.render('index.ejs', {
        countries: countries,
        total: countries.length,
        error: `Country has already been added, try again.`,
      });
    }
  } catch (err) {
    let countries = await checkVisited();
    res.render('index.ejs', {
      countries: countries,
      total: countries.length,
      error: `Country name does not exist, try again.`,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
