

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
```

## 📚 API Endpoints

### 1. **Get Top Products by Area**

#### **GET** `/product/top?area=Giza`

This endpoint retrieves the top products for a specific area based on the number of orders.

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
        },
        {
            "id": 67012,
            "name": "Product 67012",
            "category": "Product 67012 Category",
            "area": "Giza",
            "orderCount": 6
        },
        {
            "id": 44247,
            "name": "Product 44247",
            "category": "Product 44247 Category",
            "area": "Giza",
            "orderCount": 6
        },
        {
            "id": 61791,
            "name": "Product 61791",
            "category": "Product 61791 Category",
            "area": "Giza",
            "orderCount": 6
        },
        {
            "id": 48008,
            "name": "Product 48008",
            "category": "Product 48008 Category",
            "area": "Giza",
            "orderCount": 6
        }
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
        },
        {
            "id": 13,
            "name": "Product 13",
            "category": "Product 13 Category",
            "area": "Giza",
            "createdAt": "2025-01-03T11:39:59.354Z"
        },
        {
            "id": 14,
            "name": "Product 14",
            "category": "Product 14 Category",
            "area": "Giza",
            "createdAt": "2025-01-03T11:39:59.354Z"
        },
        {
            "id": 15,
            "name": "Product 15",
            "category": "Product 15 Category",
            "area": "Giza",
            "createdAt": "2025-01-03T11:39:59.354Z"
        },
        {
            "id": 16,
            "name": "Product 16",
            "category": "Product 16 Category",
            "area": "Maadi",
            "createdAt": "2025-01-03T11:39:59.354Z"
        },
        {
            "id": 17,
            "name": "Product 17",
            "category": "Product 17 Category",
            "area": "Giza",
            "createdAt": "2025-01-03T11:39:59.354Z"
        },
        {
            "id": 18,
            "name": "Product 18",
            "category": "Product 18 Category",
            "area": "Giza",
            "createdAt": "2025-01-03T11:39:59.354Z"
        },
        {
            "id": 19,
            "name": "Product 19",
            "category": "Product 19 Category",
            "area": "Maadi",
            "createdAt": "2025-01-03T11:39:59.354Z"
        },
        {
            "id": 20,
            "name": "Product 20",
            "category": "Product 20 Category",
            "area": "Zayed",
            "createdAt": "2025-01-03T11:39:59.354Z"
        },
        {
            "id": 1,
            "name": "Product 1",
            "category": "Product 1 Category",
            "area": "New Cairo",
            "createdAt": "2025-01-03T11:39:59.354Z"
        }
    ],
    "pagination": {
        "totalProducts": 70000,
        "page": "2",
        "pageSize": 10,
        "totalPages": 7000
    }
}
```

---

### 🌱 Seeding the Database

To seed the database with sample data, you can use the following command:

```sh
yarn seed:dev
```

This will populate the database with sample product and order data for testing.

---

