# Utility Containers

## What are Utility Containers?

- Application Containers (Environment + <Our App/>)
  - `docker run myapp`
  - Runs CMD and starts app
- Utility Containers (Environment)
  - `docker run mynpm init`
  - Executes / Appends custom command

## Basic Example using Official `Node` Image

- We cannot use any node or npm commands in our host machine without installing the NodeJS.
- But we can use the Docker to do the same for us.
  - `docker run node --name nodejs` - Runs NodeJS and immediately stops.
  - `docker run -it node --name nodejs` - Runs NodeJS and allows us to interact with it.
  - `docker exec -it nodejs <executable command>` - Execute a command on nodejs container and allows us to interact with it.
  - `docker run -it node <our command>` - Override the default command and execute our command.

## Using our own NodeJS utility container

- Build the Image
  ```
    docker build -t node-util .
  ```
- Run the Image
  ```
    docker run -it -v $(pwd):/app node-util <command>
  ```
- Using `Docker Compose`
  ```
    docker-compose run npm <command>
  ```
