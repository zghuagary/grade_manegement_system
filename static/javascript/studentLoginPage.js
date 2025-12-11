const form = document.querySelector("form#input-block")
const submitButton = document.querySelector("button#submit_btn");

form.addEventListener("submit",login);

async function login(e){
e.preventDefault();
const studentUserName = document.querySelector("input#student_user_name").value;
const studentPassword = document.querySelector("input#student_password").value;

try{

fetch("https://www.gradesquery.x10.mx/login",{
method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify({student_name: studentUserName, student_password: studentPassword})

}).then(res => res.json())
.then(data => {
    if (data.success) {
        localStorage.setItem("token", data.token); 
        window.location.href = "/studentPage.html";
    } else {
        alert("登入失敗: " + data.message);
    }
});;

} catch(err){
    console.error(err);
    alert("伺服器連線失敗");
}

};