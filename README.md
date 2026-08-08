# Customer SignUp Page

## Project Description

This project is a small full-stack customer registration application for an event and wedding planning platform. It combines a React frontend in `signup_page/` with an Express + MongoDB backend in `backend/`.

Users can create an account from the sign-up interface, submit their personal details, and have the data stored in MongoDB through a REST API. The backend validates required fields, checks password confirmation, prevents duplicate emails, and hashes passwords before saving user records.

## Features

- Responsive sign-up page built with React
- Separate sign-in page for returning users
- Client-side validation for terms acceptance and password confirmation
- React Router navigation
- REST API for account creation
- MongoDB data persistence using Mongoose
- Password hashing with `bcryptjs`
- Duplicate email validation
- CORS support for frontend-backend communication

## Technologies Used

### Frontend

- Node.js
- React
- React DOM
- React Router DOM
- Vite
- CSS
- ESLint

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- nodemon
- cors
- bcryptjs
- jsonwebtoken

## Project Structure

```text
Sign-Up page/
├── backend/
│   ├── controllers/
│   │   └── userController.js
│   ├── models/
│   │   └── userModel.js
│   ├── routers/
│   │   └── userRouter.js
│   ├── .env
│   ├── .gitignore
│   ├── app.js
│   ├── package-lock.json
│   └── package.json
├── signup_page/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   └── signupForm_bg.jpg
│   │   ├── components/
│   │   │   ├── Signin.jsx
│   │   │   ├── SignupForm.jsx
│   │   │   └── signupForm.css
│   │   ├── pages/
│   │   │   └── SigninPage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── dist/
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
└── .gitignore
```

## Folder Explanation

### `backend/controllers/`

Contains the business logic for handling requests and responses.

Current controller:
- `signup()`

### `backend/models/`

Contains the Mongoose schema and model definitions.

Current model:
- `User`

### `backend/routers/`

Contains all backend API routes.

Current route:
- `router.post("/signup")`

### `signup_page/src/components/`

Contains reusable frontend components.

Current components:
- `SignupForm.jsx`
- `Signin.jsx`
- `signupForm.css`

### `signup_page/src/pages/`

Contains page-level route components.

Current page:
- `SigninPage.jsx`

### `signup_page/src/assets/`

Contains static assets such as the sign-up page background image.

## Installation Guide

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/customer-signup-page.git
```

### Step 2: Navigate Into the Project Directory

```bash
cd Sign-Up page
```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 4: Create Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=4017
DATABASE_URL=your_mongodb_connection_string
```

### Step 5: Start the Backend Server

```bash
npm run dev
```

If everything works correctly, you should see output similar to:

```text
Database Connected: You Can Proceed!
server is up and running at 4017
```

### Step 6: Install Frontend Dependencies

```bash
cd ../signup_page
npm install
```

### Step 7: Start the Frontend Development Server

```bash
npm run dev
```

The frontend is configured to run on:

```text
http://localhost:3030
```

## Base URL

The backend base URL is:

```text
http://localhost:4017/api/v1
```

The frontend development URL is:

```text
http://localhost:3030
```

## API Endpoints

### 1. Create Account

**Endpoint**

```http
POST /api/v1/signup
```

**Description**

Creates a new customer account in the database.

**Request Body**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+2348000000000",
  "interest": "hire",
  "password": "securePass123",
  "confirmPassword": "securePass123"
}
```

**Success Response**

```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "6892f1c4d7b1a2b3c4d5e6f7",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+2348000000000",
    "interest": "hire",
    "authProvider": "local"
  }
}
```

## Error Handling

### Validation Error

```json
{
  "success": false,
  "message": "All fields are required"
}
```

### Password Mismatch

```json
{
  "success": false,
  "message": "Passwords do not match"
}
```

### Duplicate Email

```json
{
  "success": false,
  "message": "Email already exists"
}
```

### Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Application port number |
| `DATABASE_URL` | MongoDB connection string |
| `JWT_SECRET` | Recommended for future authentication, not currently used |

## Frontend Routes

| Route | Component | Description |
|---|---|---|
| `/` | `SignupForm` | Displays the account creation form |
| `/signin` | `SigninPage` | Displays the sign-in page |

## Testing

No automated test suite was found in the uploaded codebase.

The project can currently be tested using:

- Browser-based manual form submission
- Postman
- Thunder Client
- Insomnia

Suggested test cases:

- Submit valid signup data
- Submit empty fields
- Submit mismatched passwords
- Submit an already existing email

## Deployment

No live deployment URL or deployment configuration was found in the uploaded project.

Suggested deployment options:

- Frontend: Vercel or Netlify
- Backend: Render, Railway, or VPS
- Database: MongoDB Atlas

## Important Notes

- The uploaded template was backend-oriented, but the actual project contains both frontend and backend code, so this documentation covers both parts.
- The frontend sign-in form currently sends requests to `http://localhost:5000/api/auth/login`, but that login endpoint is not implemented in the uploaded backend.
- The implemented backend route is `POST /api/v1/signup` and the backend `.env` file uses port `4017`.
- Real environment secrets should never be committed to source control. Replace sensitive values with placeholders before publishing.

## Author

Name: Your Name  
GitHub: Your GitHub Username  
LinkedIn: Your LinkedIn Profile  
Email: your@email.com

## Conclusion

This project provides a clean starting point for a customer onboarding system with a modern React UI and a simple Express + MongoDB signup backend. To improve it further, the next steps should be implementing login, securing environment variables, adding automated tests, and aligning all frontend and backend endpoints.
