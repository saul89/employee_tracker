const connection = require("./connection");

const sqlFunctions = {
  select: function select(table) {
    let query = `SELECT * FROM ${table.split(" ")[1]}`;
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.log(res);
    });
  },
  selectEmployee: function selectEmployee() {
    let query = "SELECT id, first_name, last_name FROM employees";
    return new Promise((resolve, reject) => {
      connection.query(query, function(err, res) {
        if (err) return reject(err);
        resolve(
          res.map(
            employee =>
              employee.id + " " + employee.first_name + " " + employee.last_name
          )
        );
      });
    });
  },
  selectRole: function selectRole() {
    let query = "SELECT id, title FROM roles";
    return new Promise((resolve, reject) => {
      connection.query(query, function(err, res) {
        if (err) return reject(err);
        resolve(res.map(role => role.id + " " + role.title));
      });
    });
  },
  selectDepartment: function selectDepartment() {
    let query = "SELECT id, name FROM departments";
    return new Promise((resolve, reject) => {
      connection.query(query, function(err, res) {
        if (err) return reject(err);
        resolve(res.map(department => department.id + " " + department.name));
      });
    });
  },
  insertEmployee: function insertEmployee(employee) {
    let checkManager = employee.manager_id.split(" ")[0];
    switch (checkManager) {
      case "none":
        let noManagerQuery =
          "INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)";
        connection.query(
          noManagerQuery,
          [
            employee.first_name,
            employee.last_name,
            employee.role_id.split(" ")[0]
          ],
          function(err, res) {
            if (err) throw err;
            console.log(res);
          }
        );
        break;

      default:
        let managerQuery =
          "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
        connection.query(
          managerQuery,
          [
            employee.first_name,
            employee.last_name,
            employee.role_id.split(" ")[0],
            employee.manager_id.split(" ")[0]
          ],
          function(err, res) {
            if (err) throw err;
            console.log(res);
          }
        );
        break;
    }
  },
  insertDepartment: function insertDepartment(department) {
    let query = "INSERT INTO departments (name) VALUES (?)";
    connection.query(query, [department.name], function(err, res) {
      if (err) throw err;
      console.log(res);
    });
  },
  insertRole: function insertRole(role) {
    let query =
      "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)";
    connection.query(
      query,
      [role.title, role.salary, role.department.split(" ")[0]],
      function(err, res) {
        if (err) throw err;
        console.log(res);
      }
    );
  },
  updateRole: function updateRole(employee) {
    let query = `
            SELECT title
            FROM roles
            LEFT JOIN employees
            ON roles.id = employees.role_id
            WHERE employees.first_name != '${
              employee.updateEmployee.split(" ")[0]
            }' AND employees.last_name != '${
      employee.updateEmployee.split(" ")[1]
    }'`;
    return new Promise((resolve, reject) => {
      connection.query(query, function(err, res) {
        if (err) return reject(err);
        resolve(res.map(role => role.title));
      });
    });
  },
  updateManager: function updateManager(employee) {
    let query = `
            SELECT first_name, last_name FROM employees WHERE employees.first_name != '${
              employee.updateEmployee.split(" ")[0]
            }' AND employees.last_name != '${
      employee.updateEmployee.split(" ")[1]
    }'`;
    return new Promise((resolve, reject) => {
      connection.query(query, function(err, res) {
        if (err) return reject(err);
        resolve(
          res.map(employee => employee.first_name + " " + employee.last_name)
        );
      });
    });
  }
};

module.exports = sqlFunctions;
