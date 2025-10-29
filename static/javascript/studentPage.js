const queryGradeBtn = document.querySelector("button#query_grade_btn");
const queryRankingBtn = document.querySelector("button#query_ranking_btn")

queryGradeBtn.addEventListener("click",display);

const studentData = {

dataExists: true,

};

function display(){

if(studentData.dataExists === true){
alert("Hello World!");

}

}