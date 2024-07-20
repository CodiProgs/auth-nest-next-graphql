# Fullstack auth

This project is a full implementation of authentication with added social login functionality, using:
- Nest.js for the backend
- Next.js for the frontend
- GraphQL.


## Getting Started

To get started with the project, follow these steps:

### 1. Cloning the Repository

```sh
git clone https://github.com/CodiProgs/auth-nest-next-graphql.git
git checkout feature/oauth-integration
cd auth-nest-next-graphql
```

### 2. Setting up the Backend

Navigate to the backend directory. Create a .env file based on .env.example

```sh
cd backend
cp .env.example .env
```

[Setting Up Google OAuth](#setting-up-google-oauth)

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
## Setting Up Google OAuth

- Go to the [Google Cloud Console](https://console.cloud.google.com)
- If you don't already have a project, create a new project by clicking on the project dropdown at the top and selecting "New Project".
- Navigate to the Credentials page.
- Click on "Create Credentials" and select "OAuth 2.0 Client IDs".
- Configure the OAuth consent screen if you haven't done so already:
  - Provide the necessary information such as application name, support email, etc.
  - Add the scopes required for your application.
  - Add your authorized domains.
- After configuring the consent screen, you can proceed to create your OAuth client ID:
  - Select "Web application" as the application type.
  - Set an appropriate name for your client ID.
  - Add your authorized redirect URIs. These are the URLs where Google will redirect users after they have authenticated: http://localhost:4200/auth/google/callback.
- Once created, you will see your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.
- Update Environment Variables
