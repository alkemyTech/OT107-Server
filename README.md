# Server Base - Proyecto ONG


## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

## Start local server

``` bash
npm start
```


## Usuarios

``` JSON
[
  {
    "firstName": "Agustin",
    "lastName": "Tafura",
    "email": "agustin_tafura@test.com",
    "password": "123456789_t",
    "roleId": 1
  },
  {
    "firstName": "Andrea",
    "lastName": "Maccan",
    "email": "andrea_maccan@test.com",
    "password": "123456789_a",
    "roleId": 1
  },
  {
    "firstName": "Ezequiel",
    "lastName": "Astrada",
    "email": "ezequiel_astrada@test.com",
    "password": "123456789_e",
    "roleId": 1
  },
  {
    "firstName": "Franco",
    "lastName": "Garancini",
    "email": "franco_garancini@test.com",
    "password": "123456789_f",
    "roleId": 1
  },
  {
    "firstName": "joaquin",
    "lastName": "Bascur",
    "email": "bascur@test.com",
    "password": "123456789_j",
    "roleId": 1
  },
  {
    "firstName": "Juan Pablo",
    "lastName": "Choter",
    "email": "juantablo_ch@test.com",
    "password": "123456789_j",
    "roleId": 1
  },
  {
    "firstName": "Matias",
    "lastName": "Dalceggio",
    "email": "matias_dalceggio@test.com",
    "password": "123456789_m",
    "roleId": 1
  },
  {
    "firstName": "Sebastian",
    "lastName": "Galvan",
    "email": "seba_galvan@test.com",
    "password": "123456789_s",
    "roleId": 1
  },
  {
    "firstName": "Manuel",
    "lastName": "Francisco",
    "email": "manu_f@test.com",
    "password": "123456789_m",
    "roleId": 1
  },
  {
    "firstName": "Admin0",
    "lastName": "Demo",
    "email": "test0@test.com",
    "password": "5678_5498",
    "roleId": 1
  },
  {
    "firstName": "User1",
    "lastName": "Demo",
    "email": "test1@test.com",
    "password": "5678_5498",
    "roleId": 2
  },
  {
    "firstName": "User2",
    "lastName": "Demo",
    "email": "test2@test.com",
    "password": "5678_5498",
    "roleId": 2
  },
  {
    "firstName": "Elon",
    "lastName": "Musk",
    "email": "e_musk@test.com",
    "password": "dogecoin",
    "roleId": 2
  },
  {
    "firstName": "Steeve",
    "lastName": "Jobs",
    "email": "steeve_j@test.com",
    "password": "i<3microsoft",
    "roleId": 2
  },
  {
    "firstName": "Mark",
    "lastName": "Zuckerberg",
    "email": "facebook@facebook.com",
    "password": "metafacebook",
    "roleId": 2
  },
  {
    "firstName": "Satoshi",
    "lastName": "Naka",
    "email": "btc@test.com",
    "password": "shibamoon",
    "roleId": 2
  },
  {
    "firstName": "Usuario_dePrueba1",
    "lastName": "Demo",
    "email": "test1@test.com",
    "password": "5678",
    "roleId": 2
  },
  {
    "firstName": "Usuario_dePrueba2",
    "lastName": "Demo",
    "email": "test2@test.com",
    "password": "5678",
    "roleId": 2
  },
  {
    "firstName": "Usuario_dePrueba3",
    "lastName": "Demo",
    "email": "test3@test.com",
    "password": "5678",
    "roleId": 2
  },
  {
    "firstName": "Usuario_dePrueba4",
    "lastName": "Demo",
    "email": "test4@test.com",
    "password": "5678",
    "roleId": 2
  }
]
```