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

4. Install dependencies

`docker compose run --rm web npm i`

5. Build and start the Docker containers:

`docker compose up -d`

6. Run migrations

`docker compose run --rm web npx prisma migrate dev`

The application should now be running at `http://localhost:3000`.


## Development

* After making changes to the database schema or adding new migrations, execute

  `npx prisma migrate dev`

  to apply pending migrations, generate a new migration for any changes you made, etc.

  For more details, check the official [docs](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production).

## Testing

1. Create .env.test from .env.example and edit required variables.

2. Create required database in psql.

3. To run tests use the following command:

`docker compose run --rm web npm test`

## Stripe

To trigger webhooks in the local environment, please use the dedicated container `stripe-cli`.
Note that it requires STRIPE_WEBHOOK_KEY for correct work. The results of webhook events are displayed here on the [dashboard](https://dashboard.stripe.com/test/customers).

`docker compose run --rm stripe-cli trigger invoice.payment_failed`