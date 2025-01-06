# 2cs-back

## Getting Started

### Clone the Repository
  ```bash
  git clone https://gitlab.com/mitchi-02/2cs-back.git
  ```

### Create a docker network with bridge driver called project-net
  ```bash
  docker network create --driver bridge project-net
  ```

### Launching the Development Environment
To start the development environment, run the following command:

```bash
./serv.sh
```

To stop the development environment, run the following command:

```bash
./exit.sh
```

### Project-2CS Databases
You can use the live adminer to connect to the databases on [http://http://20.199.41.15/data](http://http://20.199.41.15/data).

#### PostgreSQL Databases

##### ms-users-db
**Connecting with Adminer:**

1. Open your web browser and go to [http://localhost:8080](http://localhost:8080).

**Connection Details:**
- **System:** PostgreSQL
- **Server:** `ms-users-db`
- **Port:** `5432`
- **Database:** `tripx`
- **Username:** `root`
- **Password:** `aaa`

##### ms-payment-db

**Connection Details:**
- **System:** PostgreSQL
- **Host:** `ms-payment-db`
- **Port:** `5433`
- **Database:** `tripx`
- **Username:** `root`
- **Password:** `aaa`

#### MongoDB Databases

**Connecting with MongoDB Compass:**
1. Open MongoDB Compass.
2. Click on "New Connection."

##### ms-notifications-db
- **URI:** `mongodb://root:aaa@localhost:27017/`

##### ms-hikes-db
- **URI:** `mongodb://root:aaa@localhost:27018/`

##### ms-travels-db
- **URI:** `mongodb://root:aaa@localhost:27019/`
