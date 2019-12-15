/* Schema for SQL database/table. */
DROP DATABASE IF EXISTS employee_trackerDB;

/* Create database */
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

/* Create department, role and employee tables*/
CREATE TABLE department (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30)
);

CREATE TABLE role (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INT
);

CREATE TABLE employee (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT DEFAULT NULL
);