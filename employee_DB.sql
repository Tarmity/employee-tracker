-- Drop any existing databases with the same name --
DROP DATABASE IF EXISTS employee_DB;

-- Create the new data base --
CREATE DATABASE employee_DB;

-- Use the new data base --
USE employee_DB;

-- Create the table for Department --
CREATE TABLE department (
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);


INSERT INTO `department` (`id`,`name`) VALUES (1,'Executive');
INSERT INTO `department` (`id`,`name`) VALUES (2,'Management');
INSERT INTO `department` (`id`,`name`) VALUES (3,'Software Engineer');
INSERT INTO `department` (`id`,`name`) VALUES (4,'Full Stack Developer');


-- Create the table for employee --
CREATE TABLE employee (
    id int NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)

);   

INSERT INTO `employee` (`id`,`first_name`,`last_name`,`role_id`,`manager_id`) VALUES (1,'Bob','Childs',2,1);
INSERT INTO `employee` (`id`,`first_name`,`last_name`,`role_id`,`manager_id`) VALUES (2,'Frank','Little',1,NULL);
INSERT INTO `employee` (`id`,`first_name`,`last_name`,`role_id`,`manager_id`) VALUES (3,'Raymond','Grey',4,3);
INSERT INTO `employee` (`id`,`first_name`,`last_name`,`role_id`,`manager_id`) VALUES (4,'David','Green',3,2);
INSERT INTO `employee` (`id`,`first_name`,`last_name`,`role_id`,`manager_id`) VALUES (5,'Ricky',' Bobby',4,3);

-- Create the table for role --
CREATE TABLE role (
    id int NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
   
);

INSERT INTO `role` (`id`,`title`,`salary`,`department_id`) VALUES (1,'General Manager',500000,1);
INSERT INTO `role` (`id`,`title`,`salary`,`department_id`) VALUES (2,'Manager',250000,2);
INSERT INTO `role` (`id`,`title`,`salary`,`department_id`) VALUES (3,'Engineer',200000,3);
INSERT INTO `role` (`id`,`title`,`salary`,`department_id`) VALUES (4,'Developer',150000,4);
INSERT INTO `role` (`id`,`title`,`salary`,`department_id`) VALUES (5,'Developer',80000,4);
