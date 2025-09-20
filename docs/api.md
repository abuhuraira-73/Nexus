# API Documentation

This document outlines the REST API endpoints for the Nexus backend.

## Base URL
`http://localhost:5000/api` (for local development)

## Authentication Endpoints

### 1. Register User
- **URL:** `/auth/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1Ni...",
    "user": {
      "id": "65f...",
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  }
  ```
- **Error Responses (JSON):**
  - `400 Bad Request`: `{"msg": "User already exists"}`
  - `500 Internal Server Error`: `{"msg": "Server error"}`

### 2. Login User
- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a JWT.
- **Request Body (JSON)::**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1Ni...",
    "user": {
      "id": "65f...",
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  }
  ```
- **Error Responses (JSON):**
  - `400 Bad Request`: `{"msg": "Invalid credentials"}`
  - `500 Internal Server Error`: `{"msg": "Server error"}`

## Canvas Endpoints

Authentication: All canvas endpoints require a valid JWT to be sent in the `Authorization: Bearer <token>` header.

### 1. Create Canvas
- **URL:** `/canvases`
- **Method:** `POST`
- **Description:** Creates a new, empty canvas.
- **Request Body (JSON):**
  ```json
  {
    "name": "My New Canvas"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "_id": "68ce69...",
    "name": "My New Canvas",
    "user": "68cc41...",
    "data": {},
    "createdAt": "2025-09-20T...",
    "updatedAt": "2025-09-20T..."
  }
  ```

### 2. Get All Canvases
- **URL:** `/canvases`
- **Method:** `GET`
- **Description:** Retrieves a list of all canvases belonging to the authenticated user.
- **Success Response (200 OK):**
  ```json
  [
    {
      "_id": "68ce69...",
      "name": "My New Canvas",
      "user": "68cc41...",
      "createdAt": "2025-09-20T...",
      "updatedAt": "2025-09-20T..."
    }
  ]
  ```

### 3. Get Canvas by ID
- **URL:** `/canvases/:id`
- **Method:** `GET`
- **Description:** Retrieves a single canvas by its unique ID.
- **Success Response (200 OK):**
  ```json
  {
    "_id": "68ce69...",
    "name": "My New Canvas",
    "user": "68cc41...",
    "data": {
      "shapes": []
    },
    "createdAt": "2025-09-20T...",
    "updatedAt": "2025-09-20T..."
  }
  ```
- **Error Responses (JSON):**
  - `404 Not Found`: `{"msg": "Canvas not found"}`
  - `401 Unauthorized`: `{"msg": "Not authorized"}`

## Future Endpoints (Planned)
- `/boards`: CRUD operations for user boards.
- `/elements`: CRUD operations for elements within a board.
- `/profile`: User profile management.
