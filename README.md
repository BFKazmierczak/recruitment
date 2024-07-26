# Frontend Developer Recruitment Task

Welcome to my solution to the recruitment task!

## Repository Structure

The repository contains two main folders:

1. **backend**
2. **frontend**

## How To Use

> **_NOTE:_** I provided a simple auth solution using json-server-auth. For
> simplicity reasons, user session is not persisted in the browser after
> refreshing the page - additional login is required.

1. Create an example account using /register route.
   > **_NOTE:_** Provide an example email like mail@example.com
2. Log in with your new credentials
3. Test out functionalities related to posts
4. Add and browse bookmarks
5. Go to /profile and log out
6. Test again on another account

### Backend

The `Backend` for auth and CRUD

1. **Navigate to the Backend Folder**:

   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   yarn install
   ```

> **_NOTE:_** Please ignore TypeScript compilation errors - I couldn't get
> json-server-auth to work with TypeScript.

3. **Build**:

   ```bash
   yarn build
   ```

4. **Start the server**

   ```bash
   yarn start
   ```

   The server will run on `http://localhost:3000` and provide auth and CRUD
   endpoints.
   
### Frontend

1. **Install Dependencies**:

   - Navigate to the `Frontend` folder and install the required dependencies.

   ```bash
   cd frontend
   yarn install
   ```
   
2. **Build**:

   ```bash
   yarn build
   ```

3. **Start the Frontend Server**:

   ```bash
   yarn preview
   ```

   The application should run on `http://localhost:8081` or another port
   specified by your configuration.
