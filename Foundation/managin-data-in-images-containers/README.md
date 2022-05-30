# Managing Data in Images and Containers

- Writing, Reading and Persisting Data

## Module Content

    - Understanding Different kinds of Data
    - Images, Containers and Volumes
    - Using Arguments and Environment Variables

## Data ?

- **Application (Code + Environment)**

  - Written and provided by us (= the developer)
  - Added to image and container in build phase
  - **"Fixed"**: Can't e changed once image is built
  - Read-only, hence stored in `images`

- **Temporary App Data (eg. entered user input)**

  - Fetched / Produced in running container
  - Stored in memory or temporary files
  - Dynamic and changing, but cleared regularly
  - Read + Write, temporary, hence stored in `containers`

- **Permanent App Data (eg. user accounts)**

  - Fetched / Produced in running container
  - Stored in files or a database
  - Must not be lost if container stops / restarts
  - Read + write, permanent, stored with `Containers` & `Volumes`

## Understanding Volumes

- Volumes are **folders on our host machine** hard drive which are **mounted ("made available", mapped) into containers**
- Volumes **persist if a container shuts down.** If a container (re-) starts and mounts a volume, any data inside of that volume is **available in the container**
- A container **can write** data into a volume **and read** data from it.

## Two Types of External Data Storages

- _Volumes (Managed by Docker)_

  - **Anonymous Volumes**

    - Docker sets up a folder / path on our host machine, exact location is unknown to us (= dev). Managed via `docker volume` commands.
    - `docker run -v /app/data <image_id>`

  - **Named Volumes**
    - A defined path in the container is mapped to the created volume / mount. e.g. /some-path on our hosting machine is mapped to /app/data
    - Great for data which should be persistent but which we don't need to edit directly.
    - `docker run -v data:/app/data <image_id>`

- _Bind Mounts (Managed by us)_
  - Same as Volumes, but we have to specify the path on our host machine. eg. /some-path on our hosting machine is mapped to /app/data
  - Great for persistent, editable (by us) data. (e.g. Source Code)
  - `docker run -v /path/to/code:/app/code <image_id>`
  - `docker run -v "/path/to/code:/app/code:ro" <image_id>` [**Read-Only**]

| Anonymous Volumes                                              | Named Volumes                                                  | Bind Mounts                                                      |
| -------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| Created specifically for a single container                    | Created in general - not tied to any specific container        | Location on host file system, not tied to any specific container |
| Survives container shutdown / restart unless --rm used         | Survives container shutdown / restart - removal via Docker CLI | Survives container shutdown / restart - removal on host fs       |
| Can not be shared across containers                            | Can be share across containers                                 | Can be shared across containers                                  |
| Since it's anonymous, it can't be re-used (even on same image) | Can be re-used for same container (across restarts)            | Can be re-used for same container (across restarts)              |

## Volume Commands

- `docker volume create` - Create a new Volume
- `docker volume ls` - List all Volumes
- `docker volume inspect` - Inspect a Volume (eg. to get the mounted path)
- `docker volume rm` - Remove a Volume

## Summary

- Containers can read + write data. **Volumes** can help with data storage, **Bind Storage** can help with direct container interaction
- **Containers can read + write data,** but written **data is lost** if the container is removed
- **Volumes** are folders on the host machine, managed by Docker, which are mounted into the Container
- **Named Volumes** survive container removal and can therefore be used to store persistent data.
- **Anonymous Volumes** are attached to a container - they can be used to save (temporary) data inside the container.
- **Bind Mounts** are folders on the host machine which are specified by the user and mounted into the containers - like **Named Volumes**
