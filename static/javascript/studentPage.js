async function displayStudentInfo(){
    const token = localStorage.getItem("token");

    const res = await fetch("https://www.gradesquery2.x10.mx/scores", {
        headers: { 
            "Authorization": "Bearer " + token
        }
    });
    const tbody = document.querySelector("#score-table tbody");
    const data = await res.json();
    console.log(data);

    const students = {};

    data.forEach(item => {
        if (!students[item.student_id]) {
            students[item.student_id] = {
                class: item.class,
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

        tr.innerHTML = `
            <td>${stu.class}</td>
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

        tbody.appendChild(tr);
    });

}

displayStudentInfo();