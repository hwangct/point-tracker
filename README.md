# Point-Tracker

Point-Tracker is an Angular application used for tracking points for activities. The application supports the ability to create/edit/delete users and activities and associate a number of points with each activity. The users can `earn`, `lose`,
and `spend` points.

The application currently relies on the a[activity-service](https://github.com/hwangct/activity-service) microservice.

## Installation

Docker needs to be installed, and the installation steps can vary
based on the Operating System.

- [windows](https://docs.docker.com/desktop/install/windows-install/)
- [linux](https://docs.docker.com/desktop/install/linux-install/)
- [mac](https://docs.docker.com/desktop/install/mac-install/)

## Usage

Push the code into a docker container and build the code.

### Build the image

```bash
docker build -t point-tracker .
```

### Verify the image was built

```bash
docker image
```

### Run the container in detached mode

```bash
docker run -p 80:80 --rm -it -d --name point-tracker point-tracker:latest
```

### Verify the container is running

```bash
docker ps
```

### View container logs for debugging

```bash
docker logs -f point-tracker
```

Refer to the [documentation](https://docs.docker.com/get-started/docker_cheatsheet.pdf) as reference to other common docker commands.

## Start JSON Server

This is a temporary solution until the user data is persisted in a better place, with an API.

```
json-server --host localhost users.json
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
