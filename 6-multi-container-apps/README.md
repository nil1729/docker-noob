# Building Multi Container Apps

## Module Content

- Combining Multiple Services to one App
- Working with Multiple Containers

## Our Demo Project (Three Building Blocks)

1. Database (MongoDB)
   1. Data must persist across multiple containers
   2. Access should be limited
2. Backend (NodeJS REST API)
   1. Data must persist
   2. Live Source Code Update
3. Frontend (React SPA)
   1. Live Source Code Update

## Steps to Build a Multi Container App (Example-App)]

1. Create Network
   ```
      docker network create goals-network
   ```
2. Run MongoDB Container
   ```
      docker run --name mongodb \
         -e MONGO_INITDB_ROOT_USERNAME=nil1729 \
         -e MONGO_INITDB_ROOT_PASSWORD=password \
         -v mongo_data:/data/db \
         --network goals-network \
         --rm \
         -d \
         mongo
   ```
3. Build Node API Image
   ```
      docker build -t goals-node .
   ```
4. Run Node API Container
   ```
      docker run --name goals-backend \
         --network goals-network \
         -p 8080:8080 \
         -v <backend-directory-path>:/app \
         -v backend_logs:/app/logs \
         -v /app/node_modules \
         -e MONGODB_USERNAME=nil1729 \
         -e MONGODB_PASSWORD=password \
         --rm \
         -d \
         goals-node
   ```
5. Build React SPA Image
   ```
      docker build -t goals-react .
   ```
6. Run React SPA Container
   ```
      docker run --name goals-frontend \
         --network goals-network \
         -p 3000:3000 \
         -v <frontend-directory-path>:/app \
         -v /app/node_modules \
         --rm \
         -d \
         goals-react
   ```
7. Stop all Containers
   ```
      docker stop mongodb goals-backend goals-frontend
   ```

# Using Docker Compose (Automating Multi-Container Setup)

## Module Content

- What is **Docker Compose**?
- Using **Docker Compose** to Build Multi-Container Apps

### What is Docker Compose ?

- Our Configuration File + Orchestration Commands (build, start, stop, ...)

### What Docker Compose is NOT ?

- **Docker Compose** does **NOT replace Dockerfiles** for customer images.
- Docker Compose does **NOT replace Images or Containers**.
- Docker Compose is **NOT suited** for managing multiple containers on **different hosts** (machine).

### Writing Docker Compose Files

- **Services** (Containers)
  - Published Ports
  - Volumes
  - Environment Variables
  - Networks

### Docker Compose Commands

- `docker compose up`: Start all services in the Compose file.
- `docker compose down`: Stop all services in the Compose file.
