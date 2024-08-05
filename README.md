# swoc_react_v2

1. after Installation of docker
 - enable terminal in docker itself

2 . clone the project 
>> git clone https://github.com/kuteprasad/swoc_react_v2.git

3. to build 
docker-compose up --build

4. further setup
- Open pgAdmin by navigating to http://localhost:5050
- Log in using the credentials you set (PGADMIN_DEFAULT_EMAIL and PGADMIN_DEFAULT_PASSWORD).

5. 
- Go to "Servers" in the left sidebar.
Right-click and select "Create" > "Server".
Enter a name for the server.
In the "Connection" tab, use db as the host (since it's the service name in your Docker Compose file), 5432 as the port, and provide the credentials you used (POSTGRES_USER and POSTGRES_PASSWORD).

6. Open a browser and navigate to http://localhost:5173

