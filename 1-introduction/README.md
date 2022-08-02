## Docker

- Docker is a container technology: A tool for creating and managing containers.

### Container

- A standardized unit of Software.
- A package of code and dependencies to run that code (eg. NodeJS Code + the NodeJS runtime)
- The same container always yields the exact same application and execution behavior! No matter where or by whom it might be executed.
- Support for Containers is built into modern operating systems!
- Docker simplifies the creation and management of such containers.

### Why Containers? (Why we want independent, standardized "application packages" ?)

**Environment:** The runtimes, languages, and frameworks we need for development

- Different Development and Production Environments

  - We want to build and test in exactly (!) the same environment as we later run our app in.

- Different Development Environments within a Team / Company
  - Every team member should have the exactly (!) same environment when working on the same project.
- Clashing Tools / Versions between Different Projects
  - When switching between projects, tools used in project A should not clash with tools used in project B.

> We want Reliability and Reproducible Environments

1. We want to have the _exact same environment for development and production_ -> This ensures that it works exactly as tested
2. It should be easy to _share a common development environment_ / setup with (new) employees and colleagues
3. We _don't want to uninstall and re-install_ local dependencies and runtimes all the time

### Solution: Virtual Machines / Virtual Operating Systems

| Pros                                                             | Cons                                                                         |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Separated Environments                                           | Redundant duplication, waste of space                                        |
| Environment-specific configurations are possible                 | Performance can be slow, boot times can be long                              |
| Environment configurations can be shared and reproduced reliably | Reproducing on another computer / server is possible but may still be tricky |

### Containers vs Virtual Machines

| Docker Container                                          | Virtual Machine                                                |
| --------------------------------------------------------- | -------------------------------------------------------------- |
| Low impact on OS, very fast, minimal disk space usage     | Bigger impact on OS, slower, higher disk space usage           |
| Sharing, rebuilding and distribution is easy              | Sharing, re-building and distribution can be challenging       |
| Encapsulate apps/environments instead of "whole machines" | Encapsulate "whole machines" instead of just apps/environments |
