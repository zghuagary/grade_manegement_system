DROP TABLE IF EXISTS student_login;
DROP TABLE IF EXISTS teacher_login;

CREATE TABLE student_login(
id INTEGER PRIMARY KEY,
student_name TEXT UNIQUE NOT NULL,
student_password TEXT NOT NULL
);

CREATE TABLE teacher_login(
id INTEGER PRIMARY KEY AUTOINCREMENT,
teacher_name TEXT UNIQUE NOT NULL,
teacher_password TEXT NOT NULL
);

DROP TABLE IF EXISTS students;
CREATE TABLE students(
    student_id INTEGER PRIMARY KEY, 
    class_number TEXT NOT NULL,
    student_name TEXT UNIQUE NOT NULL,     
    class TEXT                             
);

DROP TABLE IF EXISTS scores;
CREATE TABLE scores(
    student_id INTEGER NOT NULL,            
    course_name TEXT NOT NULL,
    course_id TEXT NOT NULL,              
    score REAL NOT NULL,                                   
    
    UNIQUE (student_id, course_name), 
    
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);


INSERT INTO student_login(student_name,student_password) VALUES
('Student1','12345'),
('Student2','12345'),
('Student3','12345'),
('Student4','12345');

INSERT INTO teacher_login(teacher_name,teacher_password) VALUES('Test1','111');
INSERT INTO teacher_login(teacher_name,teacher_password) VALUES('Test2','111');


INSERT INTO students (student_id, class_number, student_name, class) VALUES
(1, '1', 'Student1', '1-A'),
(2, '2', 'Student2', '1-A'),

(3, '1', 'Student3', '1-B'),
(4, '2', 'Student4', '1-B');

INSERT INTO scores (student_id, course_name, course_id, score) VALUES
(1, '國文', '01', 90),
(1, '英文', '02', 85),
(1, '數學', '03', 75),
(1, '物理', '04', 86),
(1, '化學', '05', 81),
(1, '生物', '06', 89),

(2, '國文', '01', 90),
(2, '英文', '02', 83),
(2, '數學', '03', 70),
(2, '物理', '04', 86),
(2, '化學', '05', 81),
(2, '生物', '06', 82),

(3, '國文', '01', 90),
(3, '英文', '02', 83),
(3, '數學', '03', 67),
(3, '物理', '04', 86),
(3, '化學', '05', 71),
(3, '生物', '06', 82),

(4, '國文', '01', 90),
(4, '英文', '02', 83),
(4, '數學', '03', 70),
(4, '物理', '04', 96),
(4, '化學', '05', 61),
(4, '生物', '06', 72);



SELECT students.student_id, students.class, students.class_number, scores.course_name, scores.score, scores_ranks.average_score, scores_ranks.class_rank, scores_ranks.school_rank FROM students JOIN scores ON scores.student_id = students.student_id JOIN scores_ranks ON students.student_id = scores_ranks.student_id;
SELECT students.student_id,  students.student_name, students.class, students.class_number, scores.course_id, scores.course_name, scores.score, scores_ranks.average_score, scores_ranks.class_rank, scores_ranks.school_rank FROM students  LEFT JOIN scores ON scores.student_id = students.student_id LEFT JOIN scores_ranks ON students.student_id = scores_ranks.student_id WHERE students.student_id = 1 ORDER BY scores.course_id  ASC;