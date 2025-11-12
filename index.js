const express = require("express")();
const bodyParase = require("body-parser");
const sqlite3 = require("sqlite3").verbose;
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParase.json());

const db = new sqlite3.Database("/sql/index.db");

app.post("/login", (req,res)=>{

const {student_name,student_password} = req.body;

db.get("SELECT * FROM student_login WHERE student_name = ? AND student_password= ?", [student_name, student_password], (err,row)=>{

if(err){

res.status(500).json({message:"伺服器錯誤"});

}

else if(row){

res.json({success: true, message: "登入成功"});

}

else{

res.json({success: true, message: "帳號或密碼錯誤"});

}


})

})

app.listen(5004,()=>{console.log("Running")})


