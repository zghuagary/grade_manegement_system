const queryGradeBtn = document.querySelector("button#query_grade_btn");
const queryRankingBtn = document.querySelector("button#query_ranking_btn")
const displayGrades = document.querySelector("p#grade_display");
const gradeDiv = document.querySelector("div#grade_div");



queryGradeBtn.addEventListener("click",displayGrade);
queryRankingBtn.addEventListener("click", displayRanking)

async function displayGrade(){
    const token = localStorage.getItem("token");

    const res = await fetch("https://www.gradesquery2.x10.mx/scores", {
        headers: { 
            "Authorization": "Bearer " + token
        }
    });

    const data = await res.json();
    console.log(data)
gradeDiv.innerHTML = "";

    data.forEach(items => {

        const infoText = document.createElement("h4");
        infoText.innerHTML = items.course_name + ": " + items.score;
        gradeDiv.appendChild(infoText);
        

    });
    
}

function displayRanking(){
}
