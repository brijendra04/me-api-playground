# Me-API Playground

This project is a personal API playground designed to showcase a developer's profile, skills, and projects. It consists of a React frontend and a Node.js/Express/MongoDB backend.

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Known Limitations](#known-limitations)
- [Deployment](#deployment)

## Project Structure
├── .env
├── README.md
├── client/
│   ├── .gitignore
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   └── src/
└── server/
├── .gitignore
├── models/
│   └── Profile.js
├── package-lock.json
├── package.json
├── routes/
│   └── profile.js
├── seed.js
└── server.js
## Features

- **Profile Management**: Display personal information, skills, and projects.
- **Project Search**: Search projects by technology (both `technologies` array and `links.skill` fields are considered).
- **Responsive Frontend**: A React-based user interface.
- **RESTful API**: A Node.js/Express backend providing API endpoints.

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (Community Server)

### Backend Setup

1.  **Navigate to the `server` directory:**
    ```bash
    cd server
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Seed the database:**
    ```bash
    npm run seed
    ```
    This will clear any existing data and populate the database with sample profiles and projects.
4.  **Start the backend server:**
    ```bash
    npm start
    ```
    The backend server will run on `http://localhost:5000` (or the port specified in your `.env` file).

### Frontend Setup

1.  **Navigate to the `client` directory:**
    ```bash
    cd client
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the frontend development server:**
    ```bash
    npm start
    ```
    The frontend application will open in your browser, usually at `http://localhost:3000`.

## API Endpoints

The backend API is available at `http://localhost:5000` (or your configured port).

-   **`GET /profile`**:
    -   **Description**: Retrieves all profiles.
    -   **Response**: An array of profile objects.

-   **`GET /profile/:id`**:
    -   **Description**: Retrieves a single profile by ID.
    -   **Parameters**: `id` (string) - The ID of the profile.
    -   **Response**: A single profile object.

-   **`GET /profile/projects/technology?tech=<searchTerm>`**:
    -   **Description**: Searches for projects by technology.
    -   **Parameters**: `tech` (string) - The technology to search for.
    -   **Response**: An array of project objects that match the search term in their `technologies` array or `links.skill` field.

## Database Schema

The project uses a MongoDB database with a `Profile` schema.

**Profile Schema (`server/models/Profile.js`)**

```javascript
// ... existing code ...
const profileSchema = new mongoose.Schema({
  name: String,
  title: String,
  contact: {
    email: String,
    phone: String,
    linkedin: String,
    github: String,
  },
  skills: [String],
  experience: [
    {
      title: String,
      company: String,
      years: String,
      description: String,
    },
  ],
  education: [
    {
      degree: String,
      university: String,
      years: String,
    },
  ],
  projects: [
    {
      name: String,
      description: String,
      technologies: [String],
      links: {
        github: String,
        live: String,
        skill: String, // Used for additional skill-based filtering
      },
    },
  ],
});
// ... existing code ...
```

## Known Limitations

-   The search functionality on the frontend is currently not working as expected, despite backend logic being updated. Further debugging with browser console output is required to resolve this.
-   Error handling on the frontend is basic.
-   Authentication and authorization are not implemented.

## Deployment

The frontend application can be built for production using:

```bash
cd client
npm run build
```

This will create a `dist` directory containing the optimized production build. This `dist` directory can then be served by any static file server.

The backend can be deployed to a Node.js hosting service. Ensure that environment variables (like `PORT` and MongoDB connection string) are properly configured in the deployment environment.