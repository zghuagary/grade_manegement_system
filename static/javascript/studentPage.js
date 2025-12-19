const queryGradeBtn = document.querySelector("button#query_grade_btn");
const queryRankingBtn = document.querySelector("button#query_ranking_btn")
const displayGrades = document.querySelector("p#grade_display");

queryGradeBtn.addEventListener("click",displayGrade);
queryRankingBtn.addEventListener("click", displayRanking)

async function displayGrade(){
    const token = localStorage.getItem("token");

    const res = await fetch("https://www.gradesquery.x10.mx/scores", {
        headers: { 
            "Authorization": "Bearer " + token
        }
    });

    const data = await res.json();
    data.forEach(items => {
        console.log(items.course_name+items.score)
    });
    
}

function displayRanking(){
}
