-- DROP TABLE if EXISTS todos;

CREATE TABLE todos (
 id SERIAL PRIMARY KEY UNIQUE,
 task_id SERIAL PRIMARY KEY UNIQUE,
 task_name VARCHAR (255),
 task_desc TEXT,
 completed BOOLEAN DEFAULT false,
 task_time_start date,
 task_time_end date,
 task_time_created date
);
