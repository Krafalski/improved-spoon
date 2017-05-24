-- DROP TABLE if EXISTS todo;

CREATE TABLE todo (
 task_id SERIAL PRIMARY KEY UNIQUE,
 task_name VARCHAR (255),
 task_desc TEXT,
 completed BOOLEAN DEFAULT false,
 task_time_start date,
 task_time_end date,
 task_time_created timestamp DEFAULT NOW()
);
