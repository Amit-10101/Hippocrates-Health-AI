# Hippocrates Health AI

## Overview

Hippocrates Health AI is a backend application designed to manage e-prescriptions and facilitate NFT generation for healthcare purposes. The application is built using TypeScript, Express, MongoDB, and Mongoose, adhering to modern development practices.

## Project Structure

```
Hippocrates-Health-AI
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
```

## Setup Instructions

1. **Clone the Repository**

    ```bash
    git clone <repository-url>
    cd Hippocrates-Health-AI/backend
    ```

2. **Install Dependencies**
   Ensure you have Node.js and npm installed. Then run:

    ```bash
    npm install
    ```

3. **Configure Environment Variables**
   Create a `.env` file in the `backend` directory and set the necessary environment variables, such as MongoDB connection string.

4. **Run the Application**
   Start the server using:
    ```bash
    npm run start
    ```

## Functionalities

-   **Authentication**: Secure API endpoints for user registration and login.
-   **NFT Management**: Generate and manage NFTs linked to e-prescriptions.
-   **Blockchain Integration**: Prepare the backend for blockchain-based transactions, focusing on NFT standards like ERC-721.

## Technologies Used

-   TypeScript
-   Express.js
-   MongoDB
-   Mongoose

## Contribution

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.
