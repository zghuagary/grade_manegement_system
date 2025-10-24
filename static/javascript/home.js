const studentLogIn = document.querySelector("button#student-log-in");
const teacherLogIn = document.querySelector("button#teacher-log-in");

studentLogIn.addEventListener("click",turnStudentPage);
teacherLogIn.addEventListener("click",turnTeacherPage);

function turnStudentPage(){

window.location.href="/studentLoginPage.html"

}

function turnTeacherPage(){

window.location.href="/teacherLoginPage.html"

}