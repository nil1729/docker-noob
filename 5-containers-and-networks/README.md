# Containers and Networks

## Module Content

- Containers and External Networks
- Connecting Containers with Networks

## Containers and Network Requests

1. Requests from container to WWW
2. Requests from container to Host Machine (`localhost` should be replaced with `host.docker.internal`)
3. Requests from container to another container (Requires a container network + use **container name as address**)
4. Docker will **NOT replace our source code**. It simply detects **outgoing requests** and resolves the IP for such requests.

## Creating Container Networks

- `docker run --network my_network ...`
- Within a Docker network, all containers can communicate with each other and IPs are automatically resolved
- `docker network --help` - For more information on Docker Networking
- `docker network create <network_name>` - Creates a New Docker Network
