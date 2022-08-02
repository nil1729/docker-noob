# Deploying Docker Containers

### Module Content

- Deployment Overview and General Process
- Deployment Scenarios, Examples and Problems

### Development to Production: Things to watch out for

- **Bind Mounts shouldn't** be used in Production!
- Containerized apps **might need a build step** (eg. React App)
- **Multi Container projects** might need to be split (or should be split) across multiple hosts / remote machines
- **Trade-offs** between control and **responsibility** might be worth it

### Example: Deploy to AWS EC2

- AWS EC2 is a service that allows us to spin up and manage our own remote machines
- Steps for Deployment
  - Create and launch EC2 instance, VPC and security group
  - Configure security group to expose all required ports to WWW
  - Connect to instance (SSH), install Docker and run container

### Bind Mounts, Volumes & COPY

| In Development                                                                         | In Production                                                                                   |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Containers should encapsulate the runtime environment but not necessarily the code     | A container should really work standalone, we should NOT have source code on our remote machine |
| Use **`Bind Mounts`** to provide our local host project files to the running container | Use **`COPY`** to copy a code snapshot into the image                                           |
| Allows for instant updates without restarting the container                            | Ensures that every image runs without any extra, surrounding configuration or code              |

### Deploy Source Code VS Image

- Option 1: (Deploy Source Code)
  - Build image on remote machine
  - Push source code to remote machine, run `docker build` and then `docker run`
  - Unnecessary Complexity
- Option 2
  - Build Image before deployment (e.g. on Local Machine)
  - Just execute `docker run`
  - Avoid unnecessary remote server work
