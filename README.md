# Java & PostgreSQL Dev Container

This repository provides a Dev Container setup for Java development with PostgreSQL integration. It includes a Docker Compose configuration and Visual Studio Code extensions for a seamless development environment.

## Prerequisites

Before you begin, ensure you have the following tools installed:

- [Docker](https://www.docker.com/get-started)
- [Visual Studio Code](https://code.visualstudio.com/download)

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name


Open the repository in Visual Studio Code:

code .

Visual Studio Code will detect the Dev Container configuration in .devcontainer/devcontainer.json and prompt you to reopen in a container. Click "Reopen in Container" to set up the development environment.


BlogAPI and blog-ui

This repository contains two projects: BlogAPI and blog-ui. BlogAPI is a Spring Boot application for the backend, while blog-ui is a React.js application for the frontend.

Getting Started

BlogAPI

Navigate to the BlogAPI folder:

cd BlogAPI

Build and run the Spring Boot application:

./mvnw spring-boot:run

The API should now be accessible at http://localhost:8080.

blog-ui

Navigate to the blog-ui folder:

cd blog-ui

Install the necessary dependencies:

npm install

Start the React.js development server:

npm start

The React.js app should now be accessible at http://localhost:3000.


Project Structure


The project is organized as follows:


BlogAPI/: Contains the Spring Boot backend code.

blog-ui/: Contains the React.js frontend code.

You can explore each subfolder for more specific details about their respective structures.