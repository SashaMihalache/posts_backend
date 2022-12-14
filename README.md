Complex application containing most of the backend flows you need

Technologies:

- node
- express
- mongo
- redis
- docker

---

## Running locally

### Building the image (first time)

```
docker build -t posts-backend .
```

### Docker compose

```
docker-compose -f docker-compose.yml -f docker-compose.[selected-env].yml up -d / docker-compose down
```

###Starting the container

```
docker run -v $(pwd):/app:ro -v /app/node_modules --env-file ./.env  -p 3000:3000 -d --name posts-backend posts-backend
```

### Stopping the container (-f is force, -v for deleting volume)

```
docker rm posts-backend -fv
```

### Debugging

```
docker exec -it posts-backend bash
```
