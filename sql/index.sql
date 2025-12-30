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
    student_name TEXT UNIQUE NOT NULL,     
    class TEXT                             
);

DROP TABLE IF EXISTS scores;
CREATE TABLE scores(
    student_id INTEGER NOT NULL,            
    course_name TEXT NOT NULL,              
    score REAL NOT NULL,                                   
    
    UNIQUE (student_id, course_name), 
    
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

DROP TABLE IF EXISTS scores_ranks;
CREATE TABLE scores_ranks(
    student_id INTEGER NOT NULL,         
    average_score REAL,                     
    class_rank INTEGER,                     
    school_rank INTEGER,
    UNIQUE (student_id, average_score, class_rank, school_rank),             
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

INSERT INTO student_login(student_name,student_password) VALUES('Student1','12345');
INSERT INTO student_login(student_name,student_password) VALUES('Student2','12345');

INSERT INTO teacher_login(teacher_name,teacher_password) VALUES('Test1','111');
INSERT INTO teacher_login(teacher_name,teacher_password) VALUES('Test2','111');


INSERT INTO students (student_id, student_name, class) VALUES
(1, 'Student1', 'A班'),
(2, 'Student2', 'A班');

INSERT INTO scores (student_id, course_name, score) VALUES
(1, '國文', 90),
(1, '數學', 85),
(2, '國文', 78),
(2, '數學', 95);

INSERT INTO scores_ranks (student_id, average_score, class_rank, school_rank) VALUES
(1, 87.5, 2, 3),
(2, 86.5, 3, 4);

