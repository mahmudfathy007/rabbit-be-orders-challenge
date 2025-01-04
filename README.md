# 🐰 Rabbit BE Orders Challenge

This project is a backend service for managing products and orders using NestJS and Prisma. It includes functionalities for creating, retrieving, and categorizing products, as well as managing orders and order items.

## 📋 Table of Contents

- [📦 Installation](#installation)
- [🚀 Running the Application](#running-the-application)
- [📚 API Endpoints](#api-endpoints)
- [💾 Caching Strategy](#caching-strategy)
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

    Create a `.env` file in the root directory and add the following variables:

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
```

## 📚 API Endpoints

### 1. **Get Top Products by Area**

#### **GET** `/product/top?area=Giza`

This endpoint retrieves the top products for a specific area based on the number of orders. Results are cached in Redis for 1 hour to optimize performance and reduce database load.

#### Request Example:
```http
GET http://localhost:8080/product/top?area=Giza
```

#### Response Example:
```json
{
    "success": true,
    "data": [
        {
            "id": 982,
            "name": "Product 982",
            "category": "Product 982 Category",
            "area": "Giza",
            "orderCount": 6
        }
        // ... more products
    ]
}
```

### 2. **Get Paginated Product List**

#### **GET** `/product?page=2`

This endpoint retrieves a paginated list of products. The `page` query parameter specifies which page of products to retrieve.

#### Request Example:
```http
GET http://localhost:8080/product?page=2
```

#### Response Example:
```json
{
    "success": true,
    "data": [
        {
            "id": 12,
            "name": "Product 12",
            "category": "Product 12 Category",
            "area": "Zayed",
            "createdAt": "2025-01-03T11:39:59.354Z"
        }
        // ... more products
    ],
    "pagination": {
        "totalProducts": 70000,
        "page": "2",
        "pageSize": 10,
        "totalPages": 7000
    }
}
```

## 💾 Caching Strategy

The application implements Redis caching to optimize performance and reduce database load:

- **Top Products Caching**: Results for the `/product/top` endpoint are cached in Redis for 1 hour.
- **Cache Key Format**: Cache keys are formatted as `top-products-{area}` to maintain separate caches for different areas.
- **Cache Duration**: The default cache duration is 1 hour but can be adjusted in the configuration.
- **Cache Invalidation**: The cache is automatically invalidated after the TTL expires, ensuring data freshness.

Benefits of the implemented caching strategy:
- Reduced database load
- Improved response times
- Better scalability for frequently accessed data
- Protection against traffic spikes

## 🌱 Seeding the Database

To seed the database with sample data, you can use the following command:

```sh
yarn seed:dev
```

This will populate the database with sample product and order data for testing.
