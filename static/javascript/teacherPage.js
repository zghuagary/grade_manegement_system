const teacherUserName = document.querySelector("input#teacher_user_name");
const teacherPassword = document.querySelector("input#teacher_password");
const submitButton = document.querySelector("button#submit_btn");

submitButton.addEventListener("click",distinguishInfo);

function distinguishInfo(){
    
if(teacherUserName.value === "1" && teacherPassword.value === "2"){

alert("Login Successfully!");

}

else{

alert("Wrong Password or username, Please enter again.");

};
};