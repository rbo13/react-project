# React Project
This approach uses a monorepo project. It means that my `client` and `server` are in this repository.

`client/` = ReactJS Folder
`src/`    = NodeJS Folder

### Tech Stack
  - Docker/Docker Compose
  - PostgreSQL
  - NodeJS
  - ReactJS
  - AWS

### Installation

This project requires [Node.js](https://nodejs.org/) v4+, [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/) to run. You can also use the Makefile to run the application, but `make` sure its installed.

Install the dependencies and devDependencies inside docker:
```sh
$ cd react-project
$ cp -a .env.example .env
# copy .env.example inside client/ directory
$ cd client && cp -a .env.example .env && cd ..
$ docker-compose up -d --build
```

Run with `make`:
```sh
$ cd react-project
$ cp -a .env.example .env
# copy .env.example inside client/ directory
$ cd client && cp -a .env.example .env && cd ..
$ make run
```
Browse [http://localhost](http://localhost) in your browser.

Tearing down:
```sh
$ docker-compose down
```

### Why this approach?
I use this development approach so that this project is easily shippable and we can work faster in our local development environment, no more "It works on my machine!". Also, utilizing docker/docker-compose enables us to have a more reproducible builds. Thats why its more logical and efficient to follow this development practice.