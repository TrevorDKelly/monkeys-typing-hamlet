CREATE DATABASE monkeys;

\c monkeys;

create TABLE monkeys (
  id serial PRIMARY KEY,
  name varchar(30),
  presses int,
  correct int,
  best int
);

INSERT INTO monkeys (name, presses, correct, best)
  VALUES ('Trevor', 0, 0, 0),
         ('Josh', 0, 0, 0),
         ('Wes', 0, 0, 0),
         ('Will', 0, 0, 0);

