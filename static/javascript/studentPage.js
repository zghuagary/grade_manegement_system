const queryGradeBtn = document.querySelector("button#query_grade_btn");
const queryRankingBtn = document.querySelector("button#query_ranking_btn")

queryGradeBtn.addEventListener("click",displayGrade);
queryRankingBtn.addEventListener("click", displayRanking)

const studentData = {

gradeDataExists: true,
rankingDataExists: true

};

function displayGrade(){
i = 0
while(i < 1){

if(studentData.gradeDataExists === true){
alert("六十分!");
i++;
console.log(i);

};}
}
function displayRanking(){
if(studentData.rankingDataExists === true){

alert("第八名!");
i++;

};


}