const queryGradeBtn = document.querySelector("button#query_grade_btn");
const queryRankingBtn = document.querySelector("button#query_ranking_btn")

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
    console.log("你的成績：", data);
    alert("已取得成績！請查看 console。");
}

function displayRanking(){
}
