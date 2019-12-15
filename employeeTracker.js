const inquirer = require("inquirer");
const connection = require("./db/connection");
const cTable = require("console.table");
const { actionQuestions, add_department } = require("./db/questions.js");
const {
  select,
  selectEmployee,
  selectDepartment,
  selectRole,
  insertDepartment,
  insertEmployee,
  insertRole,
  updateManager,
  updateRole,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  roleUpdate,
  managerUpdate,
  empByDepartment,
  empByManager,
  budgetByDepartment
} = require("./db/sqlFunctions.js");

async function init() {
  const answers = await inquirer.prompt(actionQuestions);
  let { action } = answers;

  let removeChoices;
  let manager = await selectEmployee();
  manager.push("none");

  switch (action.split(" ")[1]) {
    case "role":
      removeChoices = await selectRole();
      break;
    case "department":
      removeChoices = await selectDepartment();
      break;
    case "employee":
      removeChoices = await selectEmployee();
      break;
    default:
      break;
  }

  const add_role = [
    {
      name: "title",
      message: "What role´s title do you want to add?"
    },
    {
      name: "salary",
      message: "What is the salary for this role?"
    },
    {
      type: "list",
      name: "department",
      message: "To which department do you want to add this role?",
      choices: await selectDepartment()
    }
  ];

  const add_employee = [
    {
      name: "first_name",
      message: "What is the employee´s first name?"
    },
    {
      name: "last_name",
      message: "What is the employee´s last name?"
    },
    {
      type: "list",
      name: "role_id",
      message: "What is the employee´s role?",
      choices: await selectRole()
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who is the employee´s manager?",
      choices: manager
    }
  ];

  const remove = [
    {
      type: "list",
      name: "remove",
      message: `Which ${action.split(" ")[1]} do you want to delete?`,
      choices: removeChoices
    }
  ];

  const update = [
    {
      type: "list",
      name: "updateEmployee",
      message: `For which employee do you want to update the ${
        answers.action.split(" ")[2]
      }?`,
      choices: await selectEmployee()
    }
  ];

  switch (action) {
    case "view departments":
    case "view roles":
    case "view employees":
      select(action);
      init();
      break;

    case "add department":
      const newDepartment = await inquirer.prompt(add_department);
      insertDepartment(newDepartment);
      init();
      break;

    case "add role":
      const newRole = await inquirer.prompt(add_role);
      insertRole(newRole);
      init();
      break;

    case "add employee":
      const newEmployee = await inquirer.prompt(add_employee);
      insertEmployee(newEmployee);
      init();
      break;

    case "delete department":
      const depToDelete = await inquirer.prompt(remove);
      deleteDepartment(depToDelete);
      init();
      break;

    case "delete role":
      const roleToDelete = await inquirer.prompt(remove);
      deleteRole(roleToDelete);
      init();
      break;

    case "delete employee":
      const empToDelete = await inquirer.prompt(remove);
      deleteEmployee(empToDelete);
      init();
      break;

    case "update employee role":
      const updateRoleQuestions = await inquirer.prompt(update);
      const updateNewRole = [
        {
          type: "list",
          name: "updatePropriety",
          message: `What is the new employee ${action.split(" ")[2]}?`,
          choices: await updateRole(updateRoleQuestions)
        }
      ];
      const updateEmpRole = await inquirer.prompt(updateNewRole);
      roleUpdate(updateRoleQuestions, updateEmpRole);
      init();
      break;

    case "update employee manager":
      const updateManagerQuestions = await inquirer.prompt(update);
      const updateNewManager = [
        {
          type: "list",
          name: "updatePropriety",
          message: `What is the new employee ${action.split(" ")[2]}?`,
          choices: await updateManager(updateManagerQuestions)
        }
      ];
      const updateEmpManager = await inquirer.prompt(updateNewManager);
      managerUpdate(updateManagerQuestions, updateEmpManager);
      init();
      break;

    case "view all employees by department":
      empByDepartment();
      init();
      break;

    case "view all employees by manager":
      empByManager();
      init();
      break;

    case "view total utilized budget by department":
      budgetByDepartment();
      init();
      break;

    case "exit":
      connection.end();
      break;
    default:
      break;
  }
}

init();
