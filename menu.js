const db = require("./db/connection");
const inquirer = require("inquirer");

// search for all dept
getAllDepts = () => {
  const sql = `SELECT id, name AS Department FROM depts;`;
  const menuInput = require("./menu");

  db.promise()
    .query(sql)
    .then(([rows]) => {
      console.table(rows);
      menuInput();
    })
    .catch((err) => {
      if (err) throw err;
    });
};

// fit all roles
getAllRoles = () => {
  const sql = `SELECT roles.id, roles.title, roles.salary, depts.name as Department
              FROM roles
              LEFT JOIN depts ON roles.dept_id = depts.id;`;
  const menuInput = require("./menu");

  db.promise()
    .query(sql)
    .then(([rows]) => {
      console.table(rows);
      menuInput();
    })
    .catch((err) => {
      if (err) throw err;
    });
};
// get  all employees
getAllEmp = () => {
  const sql = `
  SELECT employees.id, employees.first_name, employees.last_name, roles.title,
  depts.name AS department, roles.salary AS salaries, 
  CONCAT (manager.first_name,' ', manager.last_name) AS manager
  FROM employees
  LEFT JOIN roles ON employees.role_id = roles.id
  LEFT JOIN depts ON roles.dept_id = depts.id
  LEFT JOIN employees manager ON employees.manager_id = manager.id;`;

  db.promise()
    .query(sql)
    .then(([rows]) => {
      console.table(rows);
      menuInput();
    })
    .catch((err) => {
      if (err) throw err;
    });
};

// add a new dept
addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDept",
        message: "Name of new Department?",
        validate: (newDept) => {
          if (newDept) {
            return true;
          } else {
            console.log("Please enter a name for the new department!");
            return false;
          }
        },
      },
    ])
    .then((deptName) => {
      const sql = `INSERT INTO depts (name)
    VALUES (?);`;
      const newDept = deptName.newDept;
      db.promise()
        .query(sql, newDept)
        .then(getAllDepts())
        .catch((err) => {
          if (err) throw err;
        });
    });
};

// adding roles
addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newName",
        message: "What is the name of the role you want to add?",
        validate: (newName) => {
          if (newName) {
            return true;
          } else {
            console.log("Please enter a name for the new role!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "newSalary",
        message: "What is the salary for the role you want to add?",
        validate: (newSalary) => {
          if (newSalary) {
            return true;
          } else {
            console.log("Please enter a salary for the new role!");
            return false;
          }
        },
      },
    ])
    .then((role) => {
      const params = [role.newName, role.newSalary];
      const roleSql = `SELECT name, id FROM depts`;
      db.query(roleSql, (err, data) => {
        if (err) throw err;

        const department = data.map(({ name, id }) => ({
          name: name,
          value: id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "department",
              message: "Which department does this role belong to?",
              choices: department,
            },
          ])
          .then((choice) => {
            const deptPicked = choice.department;
            params.push(deptPicked);

            const sql = `INSERT INTO roles (title, salary, dept_id)
                        VALUES (?, ?, ?);`;

            db.query(sql, params, (err, result) => {
              if (err) throw err;

              console.log("Role added!");
              getAllRoles();
            });
          });
      });
    });
};

// add employee
addEmp = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "New employee's first name?",
        validate: (fn) => {
          if (fn) {
            return true;
          } else {
            console.log("Please enter employee's first name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "New employee's last name?",
        validate: (ln) => {
          if (ln) {
            return true;
          } else {
            console.log("Please enter employee's last name!");
            return false;
          }
        },
      },
    ])
    .then((empNames) => {
      const params = [empNames.firstName, empNames.lastName];
      const roleSql = `SELECT roles.id, roles.title FROM roles`;

      db.query(roleSql, (err, data) => {
        if (err) throw err;
        const roles = data.map(({ id, title }) => ({ name: title, value: id }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What's the role of this employee?",
              choices: roles,
            },
          ])
          .then((roleChoice) => {
            const role = roleChoice.role;
            params.push(role);
            const managerSql = `SELECT * FROM employees`;

            db.query(managerSql, (err, data) => {
              if (err) throw err;

              const managers = data.map(({ id, first_name, last_name }) => ({
                name: first_name + " " + last_name,
                value: id,
              }));

              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's manager?",
                    choices: managers,
                  },
                ])
                .then((managerChoice) => {
                  const manager = managerChoice.manager;
                  params.push(manager);
                  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                              VALUES (?, ?, ?, ?)`;

                  db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log("Employee has been added!");
                    getAllEmp();
                  });
                });
            });
          });
      });
    });
};

// update employee
updateEmp = () => {
  const empSQL = `SELECT * FROM employees`;

  db.query(empSQL, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee would you like to update?",
          choices: employees,
        },
      ])
      .then((selectEmployee) => {
        const employeeName = selectEmployee.name;
        const params = [];
        params.push(employeeName);

        const roleSql = `SELECT * FROM roles`;

        db.query(roleSql, (err, data) => {
          if (err) throw err;

          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roles,
              },
            ])
            .then((selectRole) => {
              const role = selectRole.role;
              params.push(role);

              let employee = params[0];
              params[0] = role;
              params[1] = employee;

              const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;

              db.query(sql, params, (err, result) => {
                if (err) throw err;

                console.log("Employee has been updated!");
                getAllEmp();
              });
            });
        });
      });
  });
};
// ending the db connection.
exit = () => {
  db.end();
};
// called from server on start up of app, to make inquire run
const menuInput = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choices",
        choices: [
          "1 View all departments",
          "2 View all roles",
          "3 View all employees",
          "4 Add a department",
          "5 Add a role",
          "6 Add an employee",
          "7 Update an employee role",
        ],
      },
    ])
    .then((choice) => {
      switch (choice.choices) {
        case "1 View all departments":
          getAllDepts();
          break;

        case "2 View all roles":
          getAllRoles();
          break;

        case "3 View all employees":
          getAllEmp();
          break;

        case "4 Add a department":
          addDept();
          break;

        case "5 Add a role":
          addRole();
          break;

        case "6 Add an employee":
          addEmp();
          break;

        case "7 Update an employee role":
          updateEmp();
          break;

        default:
          exit();
      }
    });
};

module.exports = menuInput;
