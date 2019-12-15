/* Seeds for SQL table. */
USE employee_trackerDB;

/* Insert 3 Rows into department, role and employee tables */
INSERT INTO department (name)
VALUES 
    ("Operations"),
    ("Investment"),
    ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Engineer", 45000, 1),
    ("Analyst", 70000, 2),
    ("Accountant", 40000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES 
    ("Simone", "Rossi", 1),
    ("Francesco", "Bianchi", 2),
    ("Anna", "Verdi", 3);
