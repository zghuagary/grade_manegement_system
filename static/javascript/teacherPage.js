const teacherUserName = document.querySelector("input#teacher_user_name");
const teacherPassword = document.querySelector("input#teacher_password");
const submitButton = document.querySelector("button#submit_btn");

submitButton.addEventListener("click",distinguishInfo);

function distinguishInfo(){
    
if(teacherUserName.value === "教師1" && teacherPassword.value === "12345"){

alert("登入成功!");

}

else{

alert("錯誤的密碼或學號，請再輸入一次!");

};
};