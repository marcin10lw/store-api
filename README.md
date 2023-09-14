# Store API Documentation

Welcome to the documentation for the Store API. This API allows you to search for products in a store based on various criteria, sort the results, select specific fields, and paginate through the results.

## Table of Contents

- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
  - [Get All Products](#get-all-products)
- [Query Parameters](#query-parameters)
- [Examples](#examples)

## Getting Started

To use this API, you need to have Node.js and MongoDB installed on your system. Follow these steps to set up and run the API:

1. Clone the repository:

   ```bash
   git clone https://github.com/marcin10lw/store-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install Nodemon as a global dependency (if not already installed):

   ```bash
   npm install -g nodemon
   ```

4. Create a `.env` file in the root directory and create `MONGO_URI` variable with Mongodb Atlas connection string.

5. Start the server.

   ```bash
   npm start
   ```

The server should now be running locally at `http://localhost:3000`

## Usage

To use the Task Manager API, you can interact with it via HTTP requests. You can use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to send requests to the API endpoints.

## Endpoints

### Get All Products

- **URL:** `/api/v1/products`
- **Method:** `GET`
- **Description:** Retrieve a list of products based on various criteria.

#### Query Parameters

- `featured` (optional): Filter products by featured status. Possible values: `true` or `false`.

- `company` (optional): Filter products by company name.

- `name` (optional): Search products by name using a case-insensitive regular expression.

- `numericFilters` (optional): Apply numeric filters to fields such as `price` and `rating`. Format: `field-operator-value`. Supported operators: `<`, `<=`, `=`, `>`, `>=`.

- `sort` (optional): Sort the results. Provide a comma-separated list of fields to sort by. Prefix a field with `-` to sort in descending order.

- `select` (optional): Select specific fields to include in the response. Provide a comma-separated list of field names.

- `page` (optional): Specify the page number for pagination. Default is `1`.

- `limit` (optional): Specify the number of items to display per page. Default is `10`.

#### Examples

1. Filter by `featured` Status

- Request:

```
  GET /api/v1/products?featured=true
```

- Response:

```json
{
  "nbHits": 10,
  "products": [
    {
      "_id": "64ff71d4d1533f6e19e89d73",
      "name": "high-back bench",
      "price": 39,
      "featured": true,
      "rating": 4.5,
      "createdAt": "2023-09-11T20:00:19.870Z",
      "company": "Company X",
      "__v": 0
    }
    // More featured products...
  ]
}
```

2. Filter by `company` Name

- Request:

```
  GET /api/v1/products?company=ikea
```

- Response:

```json
{
  "nbHits": 10,
  "products": [
    {
      "_id": "64ff71d4d1533f6e19e89d70",
      "name": "dining table",
      "price": 42,
      "featured": false,
      "rating": 4.55,
      "createdAt": "2023-09-11T20:00:19.870Z",
      "company": "ikea",
      "__v": 0
    }
    // More ikea products...
  ]
}
```

3. Search by `name`

- Request:

```
  GET /api/v1/products?name=ente
```

- Response:

```json
{
  "nbHits": 8,
  "products": [
    {
      "_id": "64ff71d4d1533f6e19e89d72",
      "name": "entertainment center",
      "price": 59,
      "featured": true,
      "rating": 4.5,
      "createdAt": "2023-09-11T20:00:19.870Z",
      "company": "caressa",
      "__v": 0
    }
    // More products with names containing "ente" string
  ]
}
```

4. Apply Numeric Filters

- Request:

```
  GET /api/v1/products?numericFilters=price>=30,rating>4.5
```

- Response:

```json
{
  "nbHits": 2,
  "products": [
    {
      "_id": "64ff71d4d1533f6e19e89d6c",
      "name": "albany sectional",
      "price": 109,
      "featured": false,
      "rating": 5,
      "createdAt": "2023-09-11T20:00:19.870Z",
      "company": "liddy",
      "__v": 0
    }
    // More products matching the numeric filters...
  ]
}
```

5. Sort Results

- Request:

```
  GET /api/v1/products?sort=-price,rating
```

- Response:

```json
{
  "nbHits": 10,
  "products": [
    {
      "_id": "64ff71d4d1533f6e19e89d6d",
      "name": "albany table",
      "price": 309,
      "featured": false,
      "rating": 4.9,
      "createdAt": "2023-09-11T20:00:19.870Z",
      "company": "liddy",
      "__v": 0
    },
    {
      "_id": "64ff71d4d1533f6e19e89d79",
      "name": "sofa set",
      "price": 129,
      "featured": false,
      "rating": 4.5,
      "createdAt": "2023-09-11T20:00:19.870Z",
      "company": "marcos",
      "__v": 0
    }
    // More products matching the numeric filters...
  ]
}
```

6. Select Specific Fields

- Request:

```
  GET /api/v1/products?select=name,price,createdAt
```

- Response:

```json
{
  "nbHits": 10,
  "products": [
    {
      "_id": "64ff71d4d1533f6e19e89d75",
      "name": "modern bookshelf",
      "price": 31,
      "createdAt": "2023-09-11T20:00:19.870Z"
    },
    {
      "_id": "64ff71d4d1533f6e19e89d76",
      "name": "modern poster",
      "price": 30,
      "createdAt": "2023-09-11T20:00:19.870Z"
    }
    // More products with only the "name", "price" and "createdAt" fields...
  ]
}
```

7. Pagination

- Request:

```
  GET /api/v1/products?limit=5,page=3
```

- Response:

```json
{
  "nbHits": 10,
  "products": [
    {
      "_id": "64ff71d4d1533f6e19e89d75",
      "name": "modern bookshelf",
      "price": 31,
      "featured": true,
      "rating": 4.5,
      "createdAt": "2023-09-11T20:00:19.870Z",
      "company": "caressa",
      "__v": 0
    },
    {
      "_id": "64ff71d4d1533f6e19e89d76",
      "name": "modern poster",
      "price": 30,
      "featured": false,
      "rating": 4.5,
      "createdAt": "2023-09-11T20:00:19.870Z",
      "company": "liddy",
      "__v": 0
    }

    // 3 more products on page 3 with a limit of 5 per page...
  ]
}
```

#### Response

- `nbHits`: The total number of products that match the query.
- `products`: An array of product objects that match the query criteria.
