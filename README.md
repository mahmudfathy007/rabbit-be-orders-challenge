# 🐰 Rabbit BE Orders Challenge

This project is a backend service for managing products and orders using NestJS and Prisma. It includes functionalities for creating, retrieving, and categorizing products, as well as managing orders and order items.

## 📋 Table of Contents

- [📦 Installation](#installation)
- [🚀 Running the Application](#running-the-application)
- [📚 API Endpoints](#api-endpoints)
- [🗄️ Database Schema](#database-schema)
- [🌱 Seeding the Database](#seeding-the-database)

## 📦 Installation

1. Clone the repository:

    ```sh
    git clone <[repository-url](https://github.com/mahmudfathy007/rabbit-be-orders-challenge.git)>
    cd rabbit-be-orders-challenge
    ```

2. Install dependencies:

    ```sh
    yarn install
    ```

3. Set up the environment variables:

    Create a [`.env`](.env ) file in the root directory and add the following variables:

    ```env
    DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
    REDIS_URL=redis://<host>:<port>
    ```

4. Generate the Prisma client:

    ```sh
    yarn prisma:generate
    ```

5. Run database migrations:

    ```sh
    yarn migrate:dev
    ```

## 🚀 Running the Application

To start the application in development mode:

```sh
yarn start:dev

