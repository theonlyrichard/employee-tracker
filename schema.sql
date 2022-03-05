

-- drops database
DROP DATABASE IF EXISTS employees_db;

-- creates database
CREATE DATABASE employees_db;

--uses database
USE employees_db;


-- create table for department
 CREATE TABLE department (
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(50) NOT NULL,
     PRIMARY KEY (id)
 );

-- create table for roles
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);


-- create employee table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);