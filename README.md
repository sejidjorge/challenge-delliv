# Documentação da aplicação

para iniciar clone o projeto para sua maquina com o seguinte comando

```powershell
git clone https://github.com/sejidjorge/challenge-delliv.git
```

navegue para a pasta `./api`

```powershell
yarn add ou npm install
```

agora vamos iniciar os containers: 

```powershell
docker-compose up
```

agora vamos iniciar o banco de dados, dentro da pasta ./api

```powershell
npx prisma migrate dev --name init
```

## Routes Documentation

**Users:**

- **`/users/register`** (POST): Registers a new user.
    - **Body:** `RegisterUserTypes`
        - `name`: Name of the user (string).
        - `email`: Email address of the user (string).
        - `address`: Address of the user (string).
        - `password`: Password of the user (string).
        - `role?`: Role of the user (optional string).
- **`/users/login`** (POST): Logs in a user.
    - **Body:** `LoginUserTypes`
        - `email`: Email address of the user (string).
        - `password`: Password of the user (string).
- **`/users/all`** (GET): Gets a list of all users.
    - **Requires authentication:** Yes
- **`/users/profile/{userId}`** (GET): Gets the profile of a specific user.
    - **Path parameter:** `userId` (string)
    - **Requires authentication:** Yes
- **`/users/profile/{userId}`** (PUT): Updates the profile of a specific user.
    - **Path parameter:** `userId` (string)
    - **Body:** `UpdateUserTypes`
        - `name`: Name of the user (string).
        - `role`: Role of the user (string).
        - `address`: Address of the user (string).
    - **Requires authentication:** Yes
- **`/users/profile/{userId}/password`** (PUT): Updates the password of a specific user.
    - **Path parameter:** `userId` (string)
    - **Body:** `UpdateUserPasswordTypes`
        - `oldPassword`: Old password of the user (string).
        - `newPassword`: New password of the user (string).
    - **Requires authentication:** Yes
- **`/users/profile/{id}`** (DELETE): Deletes the profile of a specific user.
    - **Path parameter:** `id` (string)
    - **Requires authentication:** Yes

**Orders:**

- **`/orders/new`** (POST): Creates a new order.
    - **Body:** `userId` (string)
    - **Requires authentication:** Yes
- **`/orders/all`** (GET): Gets a list of all orders.
    - **Requires authentication:** Yes
- **`/orders/{id}`** (GET): Gets a specific order by ID.
    - **Path parameter:** `id` (string)
    - **Requires authentication:** Yes
- **`/orders/{id}`** (PUT): Updates an order's status.
    - **Path parameter:** `id` (string)
    - **Body:** `status` (string)
    - **Requires authentication:** Yes
- **`/orders/user/{userId}`** (GET): Gets orders for a specific user.
    - **Path parameter:** `userId` (string)
    - **Requires authentication:** Yes
- **`/orders/{id}`** (DELETE): Deletes a specific order.
    - **Path parameter:** `id` (string)
    - **Requires authentication:** Yes