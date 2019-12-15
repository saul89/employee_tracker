const questionObj = {
  actionQuestions: [
    {
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "add department",
        "add role",
        "add employee",
        "delete department",
        "delete role",
        "delete employee",
        "update employee role",
        "update employee manager",
        "view departments",
        "view roles",
        "view employees",
        "view all employees by department",
        "view all employees by manager",
        "view total utilized budget by department",
        "exit"
      ]
    }
  ],
  add_department: [
    {
      name: "name",
      message: "Which department do you want to add?"
    }
  ]
};

module.exports = questionObj;
