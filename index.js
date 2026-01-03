const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
const dbPath = path.join(__dirname, "sql", "index.db");
console.log("Database path being used:", dbPath);
const db = new sqlite3.Database(dbPath)
db.run("PRAGMA foreign_keys = ON");



function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "未提供 token" });

    jwt.verify(token, "SECRET_KEY", (err, user) => {
        if (err) return res.status(403).json({ message: "token 無效" });

        req.user = user; 
        next();
    });
};

function authorizeTeacher(req, res, next) {
    if (req.user.role !== "teacher") {
        return res.status(403).json({ message: "權限不足，僅限教師操作" });
    }
    next();
}

/*Login system*/
app.post("/login", (req,res)=>{

const { student_name, student_password, teacher_name, teacher_password } = req.body;

db.get("SELECT * FROM student_login WHERE student_name = ? AND student_password= ?", [student_name, student_password], (err, student_row) => {

        if (err) {
            console.error("Student DB Error:", err.message);
            return res.status(500).json({ message: "伺服器錯誤" });
        }

        if (student_row) {
            const token = jwt.sign({ student_id: student_row.id, role:"student" }, "SECRET_KEY");
            return res.json({
                success: true,
                token,
                message: "學生登入成功" });

        }
        
    
        db.get("SELECT * FROM teacher_login WHERE teacher_name = ? AND teacher_password= ?", [teacher_name, teacher_password], (err, teacher_row) => {
            
            if (err) {
                console.error("Teacher DB Error:", err.message);
                return res.status(500).json({ message: "伺服器錯誤" });
            }

            if (teacher_row) {
                const token = jwt.sign({ teacher_id: teacher_row.id, role:"teacher" }, "SECRET_KEY");
                return res.json({ 
                    success: true, 
                    token,
                    message: "老師登入成功" });
            }
            
        
            res.json({ success: false, message: "帳號或密碼錯誤" });
        });
    });
});

/*Student part*/
app.get("/scores", authenticateToken, (req, res) => {
    if (req.user.role === "teacher") {
        
        db.all("SELECT students.student_id, students.student_name, students.class, scores.course_name, scores.course_id, scores.score FROM scores JOIN students ON scores.student_id = students.student_id", (err, rows) => {
            if (err) return res.status(500).json({ message: "查詢失敗" });
            res.json(rows);
        });
    } else {
        
        db.all("SELECT * FROM scores WHERE student_id = ?", [req.user.student_id], (err, rows) => {
            if (err) return res.status(500).json({ message: "伺服器錯誤" });
            res.json(rows);
        });
    }
});

app.get("/rank", authenticateToken, (req, res) => {
    const student_id = req.user.student_id;

    db.all(
        "SELECT * FROM scores_ranks WHERE student_id = ?",
        [student_id],
        (err, rows) => {
            if (err) return res.status(500).json({ message: "伺服器錯誤" });
            res.json(rows);
        }
    )
});

/*Teacher part*/ 

app.post("/scores", authenticateToken, authorizeTeacher, (req, res) => {
    const { student_id, course_name, course_id, score } = req.body;

    db.run(
        "INSERT INTO scores (student_id, course_name, course_id, score) VALUES (?, ?, ?, ?)",
        [student_id, course_name, course_id, score],
        function (err) {
            if (err) {
                return res.status(400).json({ message: "該科目成績已存在或資料錯誤" });
            }
            res.json({ success: true, id: this.lastID });
        }
    );
});

app.put("/scores/:student_id/:course_id", authenticateToken, authorizeTeacher, (req, res) => {
    const { course_id, score } = req.body;
    const { student_id } = req.params;

    db.run(
        "UPDATE scores SET score = ? WHERE student_id = ? AND course_id = ?",
        [score, student_id, course_id],
        function (err) {
            if (err) return res.status(500).json({ message: "更新失敗" });
            res.json({ success: this.changes > 0, message: this.changes > 0 ? "更新成功" : "找不到資料" });
        }
    );
});

app.delete("/scores/:student_id/:course_id", authenticateToken, authorizeTeacher, (req, res) => {
    const { student_id, course_id } = req.params;
    db.run(
        "DELETE FROM scores WHERE student_id = ? AND course_id = ?",
        [student_id, course_id],
        function (err) {
            if (err) return res.status(500).json({ message: "刪除失敗" });
            res.json({ success: this.changes > 0 });
        }
    );
});

app.listen(5004,()=>{console.log("Running")})


