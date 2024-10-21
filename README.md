# Auth Example Project

This project is an authentication example built with Node.js, Express, and MongoDB. It demonstrates user signup, login, and role-based access control using JWT for authentication.

## Features

- User Signup
- User Login
- Role-based Access Control
- JWT Authentication
- User Deletion (Admin only)

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/auth-example.git
   ```

2. Navigate to the project directory:
   ```bash
   cd auth-example
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add your MongoDB URI and JWT secret:
   ```plaintext
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_jwt_secret
   ```

### Running the Project

To start the server, run:

```bash
npm start
```

The server will be running on `http://localhost:3000`.

### Running Tests

To run the tests, use:

````bash
npm test

## API Documentation

### Signup

- **Endpoint**: `/api/auth/signup`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "username": "string",
    "role": "user" | "admin"
  }
````

- **Response**:
  - `201 Created` on success
  - `400 Bad Request` if user already exists or validation fails

### Login

- **Endpoint**: `/api/auth/login`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - `200 OK` with JWT token on success
  - `400 Bad Request` if credentials are incorrect

### Get Current User

- **Endpoint**: `/api/users/me`
- **Method**: GET
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**:
  - `200 OK` with user data
  - `401 Unauthorized` if token is missing or invalid

### Delete User

- **Endpoint**: `/api/users/delete/:id`
- **Method**: GET
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**:
  - `200 OK` if user is deleted
  - `403 Forbidden` if the user is not an admin
  - `404 Not Found` if user does not exist

## Types

### User

```typescript
interface IUser {
  name: string;
  email: string;
  password: string;
  username: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}
```

### Custom Request

```typescript
interface CustomRequest extends express.Request {
  user?: {
    _id: string;
    name: string;
    email: string;
    password: string;
    username: string;
    role: string;
  };
}
```

## License

This project is licensed under the ISC License.
