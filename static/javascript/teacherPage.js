const addGrade = document.querySelector("button#add_grade");
const deleteGrade = document.querySelector("button#delete_grade");
const updateGrade = document.querySelector("button#update_grade");

addGrade.addEventListener("click",addScore);
deleteGrade.addEventListener("click", () => deleteScore(1, "02"));

updateGrade.addEventListener("click",() => updateScore(1, "01", 0));

async function displayScoreList(){
    const token = localStorage.getItem("token");

    const res = await fetch("https://www.gradesquery2.x10.mx/scores", {
        headers: { 
            "Authorization": "Bearer " + token
        }
    });

    const data = await res.json();
    console.log(data)

};

async function addScore() {
    const token = localStorage.getItem("token");

    const res = await fetch("https://www.gradesquery2.x10.mx/scores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            student_id: 1,
            course_name: "英文",
            course_id: "02",
            score: 88
        })
    });

    const data = await res.json();
    console.log(data);
}

async function updateScore(student_id, course_id, score) {
    const token = localStorage.getItem("token");

    const res = await fetch(
        `https://www.gradesquery2.x10.mx/scores/${student_id}/${course_id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                course_id,
                score
            })
        }
    );

    const data = await res.json();
    console.log(data);
}

async function deleteScore(student_id, course_id) {
    const token = localStorage.getItem("token");

    const res = await fetch(
        `https://www.gradesquery2.x10.mx/scores/${student_id}/${course_id}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    );

    const text = await res.text();
    console.log(text);
}

displayScoreList();


