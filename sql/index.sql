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

DROP TABLE IF EXISTS students;
CREATE TABLE students(
    student_id INTEGER PRIMARY KEY,       
    student_name TEXT UNIQUE NOT NULL,     
    class TEXT                             
);

DROP TABLE IF EXISTS scores;
CREATE TABLE scores(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,            -- 外鍵 (FK)，連結到 students(student_id)
    course_name TEXT NOT NULL,              -- 課程名稱 (例如: 國文、數學)
    score REAL NOT NULL,                    -- 該課程的成績
    semester TEXT NOT NULL,                 -- 學期 (例如: 114-1)
    
    -- 確保一個學生在同一學期不會重複錄入同一科成績
    UNIQUE (student_id, course_name, semester), 
    
    -- 設定外鍵約束
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

DROP TABLE IF EXISTS scores_ranks;
CREATE TABLE scores_ranks(
    student_id INTEGER PRIMARY KEY,         -- 外鍵 (FK)，連結到 students(student_id)
    average_score REAL,                     -- 平均分數
    class_rank INTEGER,                     -- 班級排名
    school_rank INTEGER,                    -- 全校排名

    FOREIGN KEY (student_id) REFERENCES students(student_id)
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

INSERT INTO students (student_id, student_name, class) VALUES
(1, 'Student1', 'A班'),
(2, 'Student2', 'A班'),
(3, 'Student3', 'B班');

-- 3. 插入成績資料 (scores)
INSERT INTO scores (student_id, course_name, score, semester) VALUES
(1, '國文', 90, '114-1'),
(1, '數學', 85, '114-1'),
(2, '國文', 78, '114-1'),
(2, '數學', 95, '114-1'),
(3, '國文', 88, '114-1'),
(3, '數學', 80, '114-1');


-- 4. 插入排名資料 (scores_ranks)
INSERT INTO scores_ranks (student_id, average_score, class_rank, school_rank) VALUES
(1, 87.5, 2, 3),
(2, 86.5, 3, 4),
(3, 84.0, 1, 5);

