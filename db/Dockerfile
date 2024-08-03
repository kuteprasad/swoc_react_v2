# db/Dockerfile
FROM postgres:latest

# Add the initialization script
COPY init/schema.sql /docker-entrypoint-initdb.d/
