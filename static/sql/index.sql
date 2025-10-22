DROP TABLE IF EXISTS student;

CREATE TABLE student(

student_id PRIMARY KEY,
student_name text,
student_grade


);

INSERT INTO student VALUES (1,'test_student_1',80);
INSERT INTO student VALUES (2,'test_student_2',60);
INSERT INTO student VALUES (3,'test_student_3',70);

SELECT * FROM student ORDER BY student_grade DESC;