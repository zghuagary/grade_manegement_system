const studentLists = document.querySelector("div#grade_div");

const queryForm = document.querySelector("#queryScoreForm");



const yearSelect = document.querySelector("#school-year");
const classSelect = document.querySelector("#school-class");
queryForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const year = yearSelect.value;
    const s_class = classSelect.value;

    const className = year+"-"+s_class;

    displayScoreList(className);

});

const addForm = document.querySelector("#addScoreForm");
const addStudentName = document.querySelector("select#add_student_id");
const addCourse = document.querySelector("#add_course_name");
const addScores = document.querySelector("#add_score");

addForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const student = addStudentName.value;
    const course = addCourse.value;
    const score = addScores.value;
    if(course === "01"){addScore(student,"國文",course,score)}
    else if(course === "02"){addScore(student,"英文",course,score)}
    else if(course === "03"){addScore(student,"數學",course,score)}
    else if(course === "04"){addScore(student,"物理",course,score)}
    else if(course === "05"){addScore(student,"化學",course,score)}
    else if(course === "06"){addScore(student,"生物",course,score)};
});

const updateForm = document.querySelector("#updateScoreForm");
const updateStudentName = document.querySelector("select#update_student_id");
const updateCourse = document.querySelector("#update_course_name");
const updateScores = document.querySelector("#update_score");
updateForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const student = updateStudentName.value;
    const course = updateCourse.value;
    const score = updateScores.value;
updateScore(student,course,score);

});

const deleteForm = document.querySelector("#deleteScoreForm");
const deleteStudentName = document.querySelector("select#delete_student_id");
const deleteCourse = document.querySelector("#delete_course_name");
deleteForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const student = deleteStudentName.value;
    const course = deleteCourse.value;
   
deleteScore(student,course);

});



function groupByStudent(data) {
    return data.reduce((groups, item) => {
        if (!groups[item.student_id]) {
            groups[item.student_id] = {
                student_name: item.student_name,
                class_number: item.class_number,
                scores: []
            };
        }

        groups[item.student_id].scores.push({
            course_name: item.course_name,
            score: item.score
        });

        return groups;
    }, {});
}

async function displayScoreList(class_name) {
    console.log(class_name);
    const token = localStorage.getItem("token");

    const res = await fetch("https://www.gradesquery2.x10.mx/scores", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const data = await res.json();
    console.log(data);

    const tbody = document.querySelector("#score-table tbody");
    tbody.innerHTML = "";

    const students = {};

    data.forEach(item => {
        if (!students[item.student_id]) {
            students[item.student_id] = {
                student_class: item.class,
                student_id: item.student_id,
                student_number: item.class_number,
                student_name: item.student_name,
                avg_score: item.average_score,
                class_rank: item.class_rank,
                school_rank: item.school_rank,
                scores: {}
            };
        }
        students[item.student_id].scores[item.course_name] = item.score;
    });

    Object.values(students).forEach(stu => {
        const tr = document.createElement("tr");
        if(stu.student_class === class_name){

        tr.innerHTML = `
        <td>${stu.student_class}</td>

            <td>${stu.student_id}</td>
            <td>${stu.student_number}</td>
            <td>${stu.student_name}</td>
            <td>${stu.scores["國文"] ?? ""}</td>
            <td>${stu.scores["英文"] ?? ""}</td>
            <td>${stu.scores["數學"] ?? ""}</td>
            <td>${stu.scores["物理"] ?? ""}</td>
            <td>${stu.scores["化學"] ?? ""}</td>
            <td>${stu.scores["生物"] ?? ""}</td>
            <td>${stu.avg_score}</td>
            <td>${stu.class_rank}</td>
            <td>${stu.school_rank}</td>
        `;

        tbody.appendChild(tr);}
        else{
            tr.innerHTML = "";
        };
    });
}

async function addScore(student_id,course_name,course_id,score) {
    const token = localStorage.getItem("token");

    const res = await fetch("https://www.gradesquery2.x10.mx/scores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            student_id,
            course_name,
            course_id,
            score
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