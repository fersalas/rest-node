# Typescript REST API


## Description
Personal learning project based on the great articles of **[Toptal Series by makinhs](https://github.com/makinhs/toptal-rest-series)** and built on top of it.

## About The Project
The project is to better understand a real-world file structure and API architecture using modern techonologies.

### Built with

- [Node](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Docker](https://www.docker.com/)

## Getting Started

### Prerequisites
Make sure you have `node`, `docker`, `yarn` or `npm` installed.

### Installation
```sh
 yarn install
```

### Usage
Inside the project's directory run:
```sh
 # start MongoDB service in the background
 docker-compose up -d
 # start node server
 yarn start
```

Interact with the API using `curl` or import the [Postman collection](rest-node.postman_collection.json)

CURL example
```sh
curl --location --request GET "localhost:3003/users/" --header 'Content-Type: application/json'
```

## Contact
---
- [Twitter](https://twitter.com/fersalaswho)
- [LinkedIn](https://www.linkedin.com/in/fersalasdev/)

---
