## Images

- Templates/Blueprints for containers
- Contains code + required tools/run-times

## Containers

- The running "unit of Software"
- Multiple containers can be created based on one image

## Images (How we can use an Image)

- Use an existing, pre-built Image (eg. via Docker Hub)
- Create our own, custom Image (Write our own dockerfile (based on another image))

## Docker Commands

- `docker run node` - Runs a container based on the image
- `docker ps -a` - Show all Processes
- `docker ps` - Show running Processes
- `docker run -it node` - Run a container in interactive mode
- `docker run -p <local_port>:<container_port> <image>` - Run a container with a port mapping
- `docker start <container_name>` - Start a existing container

- **Managing Containers** (add --help to see all options)

  - can be named (`--name`)
  - can be configured in detail (see `--help`)
  - can be listed (`docker ps`)
  - can be removed (`docker rm`)

- **Managing Images** (add --help to see all options)
  - can be tagged (named) [`-t`, `docker tag ...`]
  - can be listed (`docker images`)
  - can be analyzed (`docker inspect`)
  - can be removed (`docker rmi`, `docker prune`)

### `docker prune` Command

- Removes all stopped containers (`docker container prune`)
- Remove all unused images (`docker image prune`)
- Remove all unused containers, networks, images, and volumes (`docker system prune`)

### Attach Mode and Detach Mode

- `docker attach <container_id>` - Attach to the container
- `docker run <image_id>` - Start with attach mode by default
- `docker run -d <image_id>` - Running Container in detached mode
- `docker start <container_id>` - Start a container in detached mode by default
- `docker logs <container_id>` - Show logs of a container

### Removing Containers and Images:

- `docker rm <container_id>` - Remove a stopped container
- `docker rmi <image_id>` - Remove an Image
- `docker run --rm <image_id>` - Run an container and remove it after it's done

### Copying Files to a Container

- When we need to inspect log-file for a running app which running on a container
  - `docker cp <source> <destination>`
  - `docker cp <container_id/container_name>:/path/to/file <destination>` or vice-versa

### Naming Containers

- `docker run --name <my_container_name> <image_id>`

### Naming Images

- **name**:**tag** (Unique identifier)

  - _name_ - Defines a group of , possible more specialized, images (example: "node")
  - _tag_ - Defines a specified image withing a group of images (example: "14")

- `docker build -t <my_name:my_tag> <source_dir>`
- Renaming an existing image:
  - `docker tag <image_id> <new_name:new_tag>`

### Sharing Images and Containers

- Everyone who has an image, can create containers based on the image!

| Share a **Dockerfile**                                                                          | Share a **Built Image**                                                     |
| ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Simply run `docker build .`                                                                     | Download an image, **run a container** based on it                          |
| Important: The Dockerfile instructions might need surrounding files / folders (eg. Source Code) | **No build step** is required, everything is included in the image already! |

### Sharing via Docker Hub and Private Registry

| Docker Hub                            | Private Registry                     |
| ------------------------------------- | ------------------------------------ |
| Official Docker Image Registry        | Any provider/registry we want to use |
| Public, private and "official" Images | Only our own (or Team) Images        |

- **Share**: `docker puch <IMAGE_NAME>` [In case of Private Registry `docker push <HOST:IMAGE_NAME>`]
- **Use**: `docker pull <IMAGE_NAME>` [In case of Private Registry `docker pull <HOST:IMAGE_NAME>`]

### Foundation Summary

- Docker is all about Images and Containers
- **Images**:
  - `Images` are the templates/blueprints for containers, multiple Containers can be created based on one Image
  - `Images` are either downloaded (`docker pull`) or created with a `Dockerfile` and `docker build`
  - `Images` contain multiple layers (1 Instruction = 1 Layer) to optimize build speed (caching!) and re-usability
  - `Images` can also be listed (`docker images`), removed (`docker rmi`, `docker image prune`) and shared (`docker push / pull`)
- **Containers**:
  - `Containers` are created with `docker run IMAGE` and can be configured with various options/flags
  - `Containers` can be listed (`docker ps`) and removed (`docker rm`) and stopped + started (`docker stop / start`)
