# Fullstack auth

This project is a full implementation of authentication using:
- Nest.js for the backend
- Next.js for the frontend
- GraphQL.


## Getting Started

To get started with the project, follow these steps:

### 1. Cloning the Repository

```sh
git clone https://github.com/CodiProgs/auth-nest-next-graphql.git
cd auth-nest-next-graphql
```

### 2. Setting up the Backend

Navigate to the backend directory. Create a .env file based on .env.example

```sh
cd backend
cp .env.example .env
```

Install dependencies:

```sh
yarn install
```

Apply database migrations using Prisma:
```sh
prisma db push
```

Start the server in development mode:
```sh
yarn start:dev
```

### 3. Setting up the Frontend

Navigate to the frontend directory from the auth-nest-next-graphql folder:

```sh
cd frontend
```

Install dependencies:

```sh
yarn install
```

Start the development server:
```sh
yarn dev
```
