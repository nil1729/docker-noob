## Arguments and Environment Variables

- Docker supports build-time **ARG**uments and **ENV**ironments variables

| ARG                                                                           | ENV                                                      |
| ----------------------------------------------------------------------------- | -------------------------------------------------------- |
| Available inside of Dockerfile, NOT accessible in CMD or any application code | Available inside of Dockerfile & in application code     |
| Set on image build (`docker build`) via `--build-arg`                         | Set via ENV in Dockerfile or via `--env` on `docker run` |

## Environment Variables

- `ENV VARIABLE_NAME VALUE` - Set deault Environment Variable Value
- `docker run --env VARIABLE_NAME=VALUE` or `docker run -e VARIABLE_NAME=VALUE` - Set an Environment Variable
- `docker run --env-file ENV_FILE_PATH` - Load Environment Variables from a file

## Argument Variables

- `ARG VARIABLE_NAME=VALUE` - Set a Deafult Argument Variable Value
- `docker build --build-arg VARIABLE_NAME=VALUE` - Set a Build-Time Argument Variable Name

## Summary

- **Build Arguments and Runtime Environment Variables** can be used to make images and containers more **dynamic / configurable**
