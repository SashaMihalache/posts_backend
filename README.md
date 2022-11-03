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

###Starting the container

```
docker run -v $(pwd):/app:ro -v /app/node_modules -p 3000:3000 -d --name posts-backend posts-backend
```

### Stopping the container

```
docker rm posts-backend -f
```

### Debugging

```
docker exec -it posts-backend bash
```
