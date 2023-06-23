# Node.js Skill-up

Short project description or overview.

## Prerequisites

- Docker: [Installation Guide](https://docs.docker.com/get-docker/)
- Docker Compose: [Installation Guide](https://docs.docker.com/compose/install/)

## Getting Started

These instructions will help you set up the development environment for the project.

1. Clone the repository:

`git clone https://github.com/OlegChuev/node-js-skillup.git`

2. Navigate to the project directory:

`cd node-js-skillup`

3. Create .env from .env.example and edit required variables.

`cp .env.example .env`

4. Build and start the Docker containers:

`docker compose up -d`

The application should now be running at `http://localhost:3000`.

## Testing

To run tests use the following command:

`docker compose run --rm web npm test`