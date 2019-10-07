DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;

USE testdb;

CREATE TABLE products
(
    id INT NOT NULL
    AUTO_INCREMENT,
    name VARCHAR
    (100) NOT NULL,
    type VARCHAR
    (100) NULL,
    mood VARCHAR
    (100) NULL,
    stock VARCHAR
    (100) NULL,
    price DECIMAL
    (10, 2) NULL,
    createdAt TIMESTAMP NULL, 
    updatedAt TIMESTAMP NULL,
    PRIMARY KEY
    (id)
);

    CREATE TABLE users
    (
        id INT NOT NULL
        AUTO_INCREMENT,
        userName VARCHAR
        (100) NOT NULL,
        password VARCHAR
        (20) NOT NULL,
        createdAt TIMESTAMP NULL,
        updatedAt TIMESTAMP NULL,
        PRIMARY KEY
        (id)
    );

        CREATE TABLE purchases
        (
            id INT NOT NULL,
            name VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            amount DECIMAL (10,2) NOT NULL,
            createdAt TIMESTAMP NULL,
            updatedAt TIMESTAMP NULL
        );