
# Authentication Flow with NextAuth.js

## Introduction

This document details the authentication mechanism implemented in our Next.js application. We are using **NextAuth.js**, a complete open-source authentication solution for Next.js applications. It is designed to be flexible and easy to use, handling everything from social logins to email/password authentication, session management, and JWT handling.

The primary goal of this implementation is to secure our application by distinguishing between public and private routes, ensuring that only authenticated users can access protected content.

---

## Core Implementation

The authentication flow is built around several key files and concepts.

### 1. The NextAuth.js API Route (`src/app/api/auth/[...nextauth]/route.ts`)

This is the heart of the NextAuth.js setup. It's a dynamic API route that catches all requests to `/api/auth/*`. NextAuth.js uses this single route to handle all its functionalities, such as sign-in, sign-out, session management, etc.

- **`CredentialsProvider`**: We use this provider for traditional email and password authentication. It allows us to define a custom `authorize` function.
- **`authorize` function**: This is where we connect to our backend API.
    1.  When a user attempts to log in from the frontend, the `authorize` function is called with the `email` and `password` they provided.
    2.  It makes a `POST` request to our backend's login endpoint (`http://localhost:8000/api/auth/login`).
    3.  If the backend returns a successful response (i.e., the credentials are valid), it sends back the user's data.
    4.  NextAuth.js then receives this user data, considers the user authenticated, and creates a JSON Web Token (JWT).
    5.  If the backend returns an error, we return `null`, and the login attempt fails.

- **Callbacks (`jwt` and `session`)**:
    - **`jwt`**: This callback is invoked whenever a JWT is created or updated. We use it to persist the user's ID from our database into the token.
    - **`session`**: This callback is called whenever a session is accessed. We use it to add the user's ID from the token to the session object, making it available on the client-side.

### 2. Middleware (`src/middleware.ts`)

Middleware allows us to run code before a request is completed. We use it to protect our application's routes.

- **How it Works**:
    1.  For almost every incoming request, the middleware function is executed.
    2.  It uses the `getToken` function from `next-auth/jwt` to check if the user has a valid session token in their cookies.
    3.  **Route Protection Logic**:
        - If a user **has a token** (is logged in) and tries to access public routes like `/login` or `/register`, they are redirected to the `/dashboard`.
        - If a user **does not have a token** (is not logged in) and tries to access any private route, they are redirected to the `/login` page.
        - Requests for static assets (`/_next/`, `/static/`, etc.) are always allowed.
- **`config.matcher`**: This property tells the middleware which paths it should run on. We've configured it to run on all paths except for specific ones like API routes, static files, and images.

### 3. Frontend Components

#### a. `AuthProvider` (`src/components/auth/auth-provider.tsx`)

This is a simple client-side component that wraps our entire application. Its sole purpose is to provide the `SessionProvider` from `next-auth/react`. The `SessionProvider` is a React Context provider that makes the user's session data (e.g., whether they are logged in, their name, email, etc.) available to all components in the application without having to pass props down the tree.

This provider is added to the root layout (`src/app/layout.tsx`) to ensure it's available everywhere.

#### b. Login & Register Pages (`src/app/login/page.tsx`, `src/app/register/page.tsx`)

- **Registration Page**:
    - This is a client component (`'use client'`) that renders a form for new users.
    - It uses the `useState` hook to manage the form's input fields (name, email, password, role).
    - On form submission, it makes a `POST` request directly to our backend's registration endpoint.
    - If registration is successful, it redirects the user to the `/login` page using Next.js's `useRouter` hook.

- **Login Page**:
    - This is also a client component that renders a login form.
    - On submission, it calls the `signIn` function provided by `next-auth/react`.
    - We call `signIn('credentials', { ... })`, specifying that we want to use our `CredentialsProvider`. We pass the user's email and password.
    - `redirect: false` tells NextAuth.js not to automatically redirect the page on success or failure. This gives us more control to handle the result.
    - If the `signIn` function is successful (returns an `ok` status), we manually redirect the user to the `/dashboard`.

#### c. Header Component (`src/components/layout/header.tsx`)

The header contains the "Log out" button.
- It uses the `signOut` function from `next-auth/react`.
- Calling `signOut()` clears the user's session and token from the browser's cookies.
- We provide a `callbackUrl: '/'` to redirect the user to the homepage after they have successfully logged out.

### 4. Environment Variables (`.env.local`)

- **`NEXTAUTH_SECRET`**: This is a critical security variable. NextAuth.js uses this secret to encrypt the JWTs it creates. It is essential that this value is kept private and is not committed to version control. You must create a `.env.local` file at the root of the project and set this variable.

---

## Authentication Flow Diagram

Here is a simplified step-by-step flow of a user logging in:

1.  **User** -> Enters email/password on `LoginPage`.
2.  **`LoginPage`** -> Calls `signIn('credentials', { email, password })`.
3.  **NextAuth.js (Client)** -> Sends credentials to the backend API route.
4.  **NextAuth.js API Route (`/api/auth/[...nextauth]`)** -> The `authorize` function is triggered.
5.  **`authorize` function** -> Makes a `POST` request to our external backend (`http://localhost:8000/api/auth/login`).
6.  **External Backend** -> Validates credentials against the database.
    - **On Success**: Returns user data (e.g., `{ id, name, email }`).
    - **On Failure**: Returns an error.
7.  **`authorize` function** -> Receives the response.
    - **On Success**: Returns the user object to the NextAuth.js core.
    - **On Failure**: Returns `null`.
8.  **NextAuth.js Core**:
    - **On Success**: Creates a JWT, signs it with `NEXTAUTH_SECRET`, and sets it in the user's browser cookies.
    - **On Failure**: Returns an error to the `signIn` function on the client.
9.  **`LoginPage`**:
    - **On Success**: The `signIn` promise resolves successfully. The page then redirects the user to `/dashboard`.
    - **On Failure**: The promise resolves with an error, and the user remains on the login page.

Once logged in, for every subsequent request to a protected page, the `middleware` will verify the JWT from the cookies before allowing access.
