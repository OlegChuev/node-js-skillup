#!/bin/sh
set -e

# Import all .env file variables
if [ -f ".env" ]
then
  export $(cat .env | xargs)
else
  exit 1
fi

# Define the database container name
PSQL_SERVICE_NAME="node-js-skillup-postgres-1"

# Create the database
docker exec -ti $PSQL_SERVICE_NAME psql -U postgres -c "CREATE DATABASE $POSTGRES_NAME;"

# Run migrations
docker compose run --rm web yarn sequelize-cli db:migrate

exec "$@"
