#!/bin/sh
PG_READY="pg_isready -h $DB_HOST"

echo "Waiting for database to start..."
until [ $PG_READY -eq "0" ]; do
  echo "Ready database!"
  # Collect static files
  python3 manage.py collectstatic --noinput

  # Apply database migrations
  python3 manage.py migrate

  # Start server with debug mode
  python3 manage.py runserver 0.0.0.0:8000
  # Start server with production mode
  #daphne -b 0.0.0.0 -p 8000 social_network.asgi:application
  sleep 1
done