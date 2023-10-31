## serene-client
This is a simple music storage client that allows you to manage and enjoy your music collection. You can upload your favorite songs and albums, search for them, and download music from youtube.

## Installation

To install project dependencies, run:
```shell
pnpm install
```

start the client
```shell
pnpm dev
```


<img src="https://github.com/kocierik/serene-client/assets/41591336/e72b67be-9040-4cf7-a435-96e400c9bb37" alt="App Screenshot" height="300" width="700">

<br>
<br>

<img src="https://github.com/kocierik/serene-client/assets/41591336/7d8bd8f6-c7b1-49aa-9d11-47288f0a5ee8" alt="App Screenshot" height="300" width="700">

### Run with Docker compose

You can use Docker Compose to run the client alongside the server. Here's a Docker Compose configuration:

```yaml
version: '3.8'
services:
  db:
    image: postgres:latest
    container_name: postgres
    restart: always
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  frontend:
    build:
      context: ./serene-client
      dockerfile: Dockerfile
    container_name: frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  backend:
    build:
      context: ./serene-server
      dockerfile: Dockerfile
    container_name: backend
    environment:
      DB_HOST: ${DB_HOST}
      DB_PORT: ${DB_PORT}
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}
    volumes:
      - /etc/music:/etc/music
    ports:
      - "4000:4000"
    depends_on:
      - db

volumes:
  postgres-data:
```


### Note
The use of Next.js in this project is for experimentation purposes 
