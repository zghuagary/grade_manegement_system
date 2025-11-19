DROP TABLE IF EXISTS student_login;
DROP TABLE IF EXISTS teacher_login;

CREATE TABLE student_login(
id INTEGER PRIMARY KEY AUTOINCREMENT,
student_name TEXT UNIQUE NOT NULL,
student_password TEXT NOT NULL
);

CREATE TABLE teacher_login(
id INTEGER PRIMARY KEY AUTOINCREMENT,
teacher_name TEXT UNIQUE NOT NULL,
teacher_password TEXT NOT NULL
);

INSERT INTO student_login(student_name,student_password) VALUES('Student1','12345');
INSERT INTO student_login(student_name,student_password) VALUES('Student2','12345');
INSERT INTO student_login(student_name,student_password) VALUES('Student3','12345');
INSERT INTO student_login(student_name,student_password) VALUES('Student4','12345');
INSERT INTO student_login(student_name,student_password) VALUES('Student5','12345');

INSERT INTO teacher_login(teacher_name,teacher_password) VALUES('Test1','111');
INSERT INTO teacher_login(teacher_name,teacher_password) VALUES('Test2','111');
INSERT INTO teacher_login(teacher_name,teacher_password) VALUES('Test3','111');
INSERT INTO teacher_login(teacher_name,teacher_password) VALUES('Test4','111');
INSERT INTO teacher_login(teacher_name,teacher_password) VALUES('Test5','111');

