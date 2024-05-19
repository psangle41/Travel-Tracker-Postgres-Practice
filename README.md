# World Map Tracker

A Node.js project to track visited countries using PostgreSQL and EJS templates. This project allows you to enter the name of a country, fetch its country code from a database, and visualize the visited countries on a world map.

## Demo Video

Click [here](https://github.com/psangle41/Travel-Tracker-Postgres-Practice/blob/main/Images/demo.mov) to view the demo video.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [SQL Code](#sql-code)

## Introduction

This project is designed to practice using PostgreSQL with Node.js. It leverages the EJS template engine to render a world map, highlighting the countries you've visited.

## Features

- Enter country names to mark them as visited.
- Fetch country codes from a countries table in PostgreSQL.
- Store visited country codes in a separate table.
- Render a world map with highlighted visited countries using EJS and SVG.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- EJS (Embedded JavaScript templates)
- SVG for rendering the world map

## SQL Code

1. In a database, Created table countries using following SQL and imported countries.csv

``CREATE TABLE countries(
	id SERIAL PRIMARY KEY,
	country_code CHAR(2) NOT NULL UNIQUE,
	country_name VARCHAR(100)
);``

2.  In a database, Created table visited_countries using following SQL

``CREATE TABLE visited_countries(
	id SERIAL PRIMARY KEY,
	country_code CHAR(2) NOT NULL UNIQUE
)``
