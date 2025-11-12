DROP TABLE IF EXISTS student;

CREATE TABLE student_login(

student_id INTEGETR PRIMARY KEY,
student_name TEXT,
student_password INTEGER


);

INSERT INTO student VALUES (1,'test_student_1',12);
INSERT INTO student VALUES (2,'test_student_2',13);
INSERT INTO student VALUES (3,'test_student_3',14);

SELECT * FROM student_login;