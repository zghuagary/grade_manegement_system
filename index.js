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

app.get("/scores", authenticateToken, (req, res) => {
    const student_id = req.user.student_id;

    db.all(
        "SELECT * FROM scores WHERE student_id = ?",
        [student_id],
        (err, rows) => {
            if (err) return res.status(500).json({ message: "伺服器錯誤" });
            res.json(rows);
        }
    )
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

app.post("/scores", authenticateToken, authorizeTeacher, (req, res) => {
    const { student_id, course_name, score } = req.body;

    db.run(
        "INSERT INTO scores (student_id, course_name, score) VALUES (?, ?, ?)",
        [student_id, course_name, score],
        function (err) {
            if (err) {
                return res.status(400).json({ message: "該科目成績已存在或資料錯誤" });
            }
            res.json({ success: true, id: this.lastID });
        }
    );
});

app.put("/scores/:id", authenticateToken, authorizeTeacher, (req, res) => {
    db.run(
        "UPDATE scores SET score = ? WHERE id = ?",
        [req.body.score, req.params.id],
        function (err) {
            res.json({ success: this.changes > 0 });
        }
    );
});

app.delete("/scores/:id", authenticateToken, authorizeTeacher, (req, res) => {
    db.run(
        "DELETE FROM scores WHERE id = ?",
        [req.params.id],
        function (err) {
            res.json({ success: this.changes > 0 });
        }
    );
});







app.listen(5004,()=>{console.log("Running")})


