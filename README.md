# ☕ Challenge api patients - Node.js

## About

This project aims to develop a basic API using Node.js, Express.js and Prisma, to perform CRUD operations (Create, Read, Update, Delete) on an entity called "patient", which has a relationship (n: m) with the entity "problems". The database chosen for the project is SQLite, and the files are stored directly in the repository, facilitating the study. For testing, Jest was used.

## Covered concepts:

- SOLID
- Clean code
- Clean Architecture
- middlewares
- controllers
- factories
- repositories
- dependency injection
- Route parameters
- Query parameters
- Request body

## Starting the project:

1. Install the dependencies

```shell
npm i
```

2. Migrate obs:(you should have .env file with the database url)

```shell
npm run migrate
```

3. Start server

```shell
npm run dev
```

## Running tests

```shell
npm run test:coverage
```

## Seeding database

The problems entity can be seeded with the csv file of cids by running the command:

```shell
npm run seed
```
