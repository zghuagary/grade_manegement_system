const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
const dbPath = path.join(__dirname, "sql", "index.db");
console.log("Database path being used:", dbPath); // Check this in the server console
const db = new sqlite3.Database(dbPath)

app.post("/login", (req,res)=>{

const { student_name, student_password, teacher_name, teacher_password } = req.body;

db.get("SELECT * FROM student_login WHERE student_name = ? AND student_password= ?", [student_name, student_password], (err, student_row) => {

        if (err) {
            console.error("Student DB Error:", err.message);
            return res.status(500).json({ message: "伺服器錯誤" }); // Send and EXIT
        }

        if (student_row) {
            return res.json({ success: true, message: "學生登入成功" }); // Send and EXIT
        }
        
    
        db.get("SELECT * FROM teacher_login WHERE teacher_name = ? AND teacher_password= ?", [teacher_name, teacher_password], (err, teacher_row) => {
            
            if (err) {
                console.error("Teacher DB Error:", err.message);
                return res.status(500).json({ message: "伺服器錯誤" });
            }

            if (teacher_row) {
                return res.json({ success: true, message: "老師登入成功" });
            }
            
            // 3. If BOTH fail
            res.json({ success: false, message: "帳號或密碼錯誤" });
        });
    });
});

app.get("/", (req,res)=> res.send("Server is running!"));


app.listen(5004,()=>{console.log("Running")})


