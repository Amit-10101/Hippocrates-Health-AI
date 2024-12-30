# Hippocrates Health AI

## Overview

Hippocrates Health AI is a full-stack application designed to facilitate NFT generation and management integrated with an e-prescription system. The backend is built using Node.js and Express.js, while the frontend utilizes React.

## Project Structure

```
Hippocrates-Health-AI
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── models
│   │   ├── middlewares
│   │   ├── utils
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── frontend
└── README.md
```

## Backend

The backend is responsible for handling API requests related to user authentication, NFT management, and e-prescription operations. It includes:

-   **Controllers**: Contain business logic and interact with the database or blockchain.
-   **Routes**: Define the API endpoints and map them to controller methods.
-   **Models**: Define the data structures for NFTs and prescriptions.
-   **Middlewares**: Implement authentication and other request processing logic.
-   **Utils**: Provide utility functions for blockchain interactions.

### Setup Instructions

1. Navigate to the `backend` directory.
2. Install dependencies:
    ```
    npm install
    ```
3. Start the backend server:
    ```
    npm run dev
    ```

<!-- ## Frontend
The frontend is built with React and provides a user interface for interacting with the backend services. It includes:

- **Components**: Reusable UI components.
- **Pages**: Page-level components for routing.
- **Services**: Functions for making API calls to the backend. -->

<!-- ### Setup Instructions
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend application:
   ```
   npm start
   ``` -->

## API Documentation

Refer to the backend README for detailed API documentation, including available endpoints and request/response formats.
