INSERT INTO depts (name)
VALUES
  ("Human Resources"), ("Sales"),('Accounting'),('Design');

INSERT INTO roles (title,dept_id ,salary)
VALUES
  ('HR Manager', 1, 100000.00),
  ('HR personal', 1, 60000.00),
  ('Accounting Manager', 3, 250000.00),
  ('Accountant', 3, 180000.90),
  ('Sales Manager', 2, 200000.00),
  ('Salesperson', 2, 80000.00),
  ('Design Manager', 4, 250000.00),
  ('Design Superviser', 4, 160000.00),
  ('Designer', 4, 80000.00);

INSERT INTO employees (first_name, last_name,role_id,manager_id)
VALUES
  ('Virginia', 'Woolf',1, NULL),
  ('Piers', 'Gaveston', 2, 1),
  ('Charles', 'LeRoi', 3, 1),
  ('Katherine', 'Mansfield', 3, 1),
  ('Peter', 'Greenaway', 3, 1),
  ('Dora', 'Carrington',3, 1),
  ('Edward', 'Bellamy', 3, 1),
  ('Montague', 'Summers', 2, NULL),
  ('Octavia', 'Butler', 4, 3),
  ('Unica', 'Zurn', 3, 1),
  ('Samuel', 'jackson', 2, 4),
  ('John', 'smith', 2, 4),
  ('James', 'Jones', 3, NULL),
  ('Dennis', 'Smith', 2, 4),
  ('Derek', 'Jarman', 3, 1),
  ('Jack', 'Black', 2, 1),
  ('Paola', 'Dean', 3, 1),
  ('Samuel', 'Hash', 5, 2),
  ('Alexander', 'TheGreat', 4, NULL),
  ('John', 'Bennett', 1, 1),
  ('Bruce', 'Almighty', 3, 1);