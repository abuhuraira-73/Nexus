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

## Future Endpoints (Planned)
- `/boards`: CRUD operations for user boards.
- `/elements`: CRUD operations for elements within a board.
- `/profile`: User profile management.
