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
    let query = "SELECT roles.id, title FROM roles";
    return new Promise((resolve, reject) => {
      connection.query(query, function(err, res) {
        if (err) return reject(err);
        resolve(res.map(role => role.id + " " + role.title));
      });
    });
  },
  updateManager: function updateManager(employee) {
    let query = `
            SELECT id, first_name, last_name FROM employees WHERE employees.first_name != '${
              employee.updateEmployee.split(" ")[1]
            }' AND employees.last_name != '${
      employee.updateEmployee.split(" ")[2]
    }'`;
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
  deleteDepartment: function deleteDepartment(department) {
    let query = "DELETE FROM departments WHERE id =?";
    connection.query(query, [department.remove.split(" ")[0]], function(
      err,
      res
    ) {
      if (err) throw err;
      console.log(res);
    });
  },
  deleteRole: function deleteRole(role) {
    let query = "DELETE FROM roles WHERE id =?";
    connection.query(query, [role.remove.split(" ")[0]], function(err, res) {
      if (err) throw err;
      console.log(res);
    });
  },
  deleteEmployee: function deleteEmployee(employee) {
    let query = "DELETE FROM employees WHERE id =?";
    connection.query(query, [employee.remove.split(" ")[0]], function(
      err,
      res
    ) {
      if (err) throw err;
      console.log(res);
    });
  },
  roleUpdate: function roleUpdate(employee, role) {
    let query = `UPDATE employees SET role_id = ${
      role.updatePropriety.split(" ")[0]
    } WHERE id = ${employee.updateEmployee.split(" ")[0]}`;
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.log(res);
    });
  },
  managerUpdate: function managerUpdate(employee, manager) {
    let query = `UPDATE employees SET manager_id = ${
      manager.updatePropriety.split(" ")[0]
    } WHERE id = ${employee.updateEmployee.split(" ")[0]}`;
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.log(res);
    });
  },
  empByDepartment: function empByDepartment() {
    let query = `
    SELECT departments.name, first_name, last_name
    FROM departments
    JOIN roles ON departments.id = roles.department_id
    JOIN employees ON roles.id = employees.role_id`;
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.log(res);
    });
  },
  empByManager: function empByManager() {
    let query = `
    SELECT  concat(M.first_name , ' ' , M.last_name) AS manager, 
    concat(E.first_name , ' ' , E.last_name) AS employee
    FROM employees E 
    LEFT OUTER JOIN employees M
    ON M.id = E.manager_id;
    `;
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.log(res);
    });
  },
  budgetByDepartment: function budgetByDepartment() {
    let query = `
    SELECT name, SUM(salary) AS budget
    FROM departments
    JOIN roles ON departments.id = roles.department_id
    JOIN employees ON roles.id = employees.role_id
    GROUP BY name
    ORDER BY budget DESC;
    `;
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.log(res);
    });
  }
};

module.exports = sqlFunctions;
