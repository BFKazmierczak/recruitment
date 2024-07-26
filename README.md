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

The `Frontend` folder is where you will create your application. Your task is to
build a simple Twitter-like application with the following requirements:

1. **Display Posts**:

   - Fetch and display a list of posts from the backend server.

2. **Create Post**:

   - Provide a form to create a new post. The new post should be sent to the
     backend server and added to the list of posts.
   - Example to create a post: Send a POST request to `/api/posts`.

3. **Update Post**:

   - Allow users to edit an existing post. The updated post should be sent to
     the backend server and updated in the list.

4. **Delete Post**:
   - Allow users to delete a post. The deletion should be sent to the backend
     server and the post should be removed from the list.

### Getting Started

1. **Install Dependencies**:

   - Navigate to the `Frontend` folder and install the required dependencies.

   ```bash
   cd frontend
   yarn install
   ```

2. **Start the Frontend Server**:

   ```bash
   yarn start
   ```

   The application should run on `http://localhost:8081` or another port
   specified by your configuration.
