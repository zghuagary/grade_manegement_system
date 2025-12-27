const form = document.querySelector("form#input-block")
const submitButton = document.querySelector("button#submit_btn");

form.addEventListener("submit",login);

async function login(e){
e.preventDefault();
const studentUserName = document.querySelector("input#student_user_name").value;
const studentPassword = document.querySelector("input#student_password").value;

try{

const res = await fetch("https://www.gradesquery2.x10.mx/login",{
method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify({student_name: studentUserName, student_password: studentPassword})

});

const data = await res.json();

if(data.success){

alert("登入成功!");
localStorage.setItem("token", data.token);
window.location.href = "/studentPage.html"
}
else{
alert(data.message || "帳號或密碼錯誤");
}

} catch(err){
    console.error(err);
    alert("伺服器連線失敗");
}

};