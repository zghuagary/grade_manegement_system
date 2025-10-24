const studentUserName = document.querySelector("input#student_user_name");
const studentPassword = document.querySelector("input#student_password");
const submitButton = document.querySelector("button#submit_btn");

submitButton.addEventListener("click",distinguishInfo);

function distinguishInfo(){
    
if(studentUserName.value === "1" && studentPassword.value === "2"){

alert("登入成功!");
window.location.href = "/studentPage.html";

}

else{

alert("錯誤的密碼或名稱，請再輸入一次!");

};
};