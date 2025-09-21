### Para hacerle pull a la imagen del contenedor mysql
docker pull mysql:8.0

### Para crear el volumen que permita la persistencia del contenedor
docker volume create mysql_data


### Para Correr el contenedor teniendo la imagen mysql version 8.0

```
docker run --name arqui-soft-mysql \
  -v mysql_data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=dbtaller4 \
  -e MYSQL_USER=simis \
  -e MYSQL_PASSWORD=password \
  -p 3306:3306 \
  -d mysql:8.0
  ```

### Para ingresar al contenedor
docker exec -it arqui-soft-mysql mysql -u root -p

### Correr el Backend
./mvnw spring-boot:run

### Para correr el Frontend
npm start

### Si no vas a correr el frontend es válido correr solamente el back y hacer pruebas con POSTMAN:
  ->GET http://localhost:8080/productos
  ->POST http://localhost:8080/productos
    Body:
    ```
    {
      "nombre": "Alejandro Cañadas (negro)",
      "precio": 0,
      "cantidad": 1
    }
    ```
  ->PUT http://localhost:8080/productos/{id}
    ```
    Body:
    {
      "nombre": "Alejandro Cañadas (negro)",
      "precio": 0,
      "cantidad": 1
    }
    ```
  ->DELETE http://localhost:8080/productos/{id}
    Body:
    ```
    {
      "nombre": "Alejandro Cañadas (negro)",
      "precio": 0,
      "cantidad": 1
    }
    ```

### Eliminar el contendor
docker stop arqui-soft-mysql
docker kill {container-id}        
docker rm arqui-soft-mysql 


## zPara construir y correr los contenedores (docker compose)
docker-compose up --build

### Verificar que los contenedores están corriendo (terminal)
docker ps

### Probar la base de datos
docker exec -it mysql_db mysql -u simis -p dbtaller4
(contraseña: password)
SELECT COUNT(*) FROM producto;

### probar backend
http://localhost:8080/productos

### probar frontend
http://localhost:3000
