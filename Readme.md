# YouTube Clone using MERN Stack

## Project Objective

The objective of this project is to create a full-stack YouTube clone application using the MERN (MongoDB, Express, React, Node.js) stack. This project aims to provide users with the ability to view, interact, and manage videos, similar to the functionality of the popular video-sharing platform, YouTube.

## Features

The YouTube clone application includes the following key features:

1. **Front-End (React)**:

   - Home Page: Display a YouTube-like header, sidebar, filter buttons, and a grid of video thumbnails.
   - User Authentication: Allow users to register, log in, and manage their account using JWT-based authentication.
   - Video Player Page: Display the selected video with its details, comments, and like/dislike functionality.
   - Channel Page: Enable users to create, edit, and delete their own channels and videos.
   - Responsive Design: Ensure the application is fully responsive across different devices (mobile, tablet, desktop).

2. **Back-End (Node.js, Express)**:

   - API Endpoints:
     - User Authentication: Provide APIs for user registration, login, and token-based authentication.
     - Channel Management: Offer APIs to create, update, and fetch channel information.
     - Video Management: Implement APIs to fetch, update, and delete videos.
     - Comments: Provide APIs to add and fetch comments.
   - Database (MongoDB): Store user, video, channel, and comment data in a MongoDB database.
   - JWT Integration: Implement secure JWT-based authentication and protected routes.

3. **Search and Filter Functionality**:

   - Search: Allow users to search for videos based on title.
   - Filters: Provide filters to sort and display videos based on category.

4. **Code Quality and Documentation**:
   - Code Structure: Maintain a clean, well-organized codebase with proper folder structure and adherence to best practices.
   - Documentation: Provide a detailed README file explaining the project setup, features, and usage.

## Technologies Used

The YouTube clone application is built using the following technologies:

- **Front-End**: React, React Router, Axios, Tailwind CSS, React-Toastify, Shadcn UI
- **Back-End**: Node.js, Express.js, Prisma, MongoDB
- **Database**: MongoDB (NoSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **Uploads**: Multer and Cloudinary for file uploads
- **Version Control**: Git

## Project Setup

1. **Clone the repository**:

   ```
   git clone https://github.com/Lunar-spec/youtubeC.git
   ```

2. **Install dependencies**:

   - Front-End:
     ```
     cd client
     pnpm install
     ```
   - Back-End:
     ```
     cd server
     pnpm install
     ```

3. **Set up environment variables**:

   - Create a `.env` file in the `server` directory and add the following variables:

     ```
     DATABASE_URL=
     ```

     Replace `DATABASE_URL` with the connection string for your MongoDB database.

   - Create a `.env` file in the `client` directory and add the following variables:

     ```
     VITE_API_BASE_URL=
     ```

     Replace `VITE_API_BASE_URL` with the base URL of your back-end API.

4. **Start the development servers**:

   - Front-End:
     ```
     cd client
     pnpm run dev
     ```
   - Back-End:
     ```
     cd server
     pnpm run dev
     ```

## Project Structure

The project is organized into two main directories:

1. **client**: Contains the front-end React application.
2. **server**: Contains the back-end Node.js/Express application.

## Conclusion

The YouTube clone application built using the MERN stack provides a comprehensive set of features that mimic the functionality of the popular video-sharing platform, YouTube. This project allows users to view, interact, and manage videos, as well as create and manage their own channels. The application's code is well-structured, documented, and can be easily deployed to a production environment.
