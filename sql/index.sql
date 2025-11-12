CREATE TABLE student_login(
id INTEGER PRIMARY KEY AUTOINCREMENT,
student_name TEXT UNIQUE NOT NULL,
student_password TEXT NOT NULL
);

INSERT INTO student_login(student_name,student_password) VALUES('Student1','12345');

