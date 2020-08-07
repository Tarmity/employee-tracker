-- Drop any existing databases with the same name --
DROP DATABASE IF EXISTS employee_DB;

-- Create the new data base --
CREATE DATABASE employee_DB;

-- Use the new data base --
USE employee_DB;

-- Create the table for Department --
CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Create the table for employee --
CREATE TABLE employee (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);   

-- Create the table for role --
CREATE TABLE role (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);