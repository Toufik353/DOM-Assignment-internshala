const studentForm = document.getElementById("student-form");
    const studentTableBody = document.getElementById("student-table-body");

    let editStudentIndex = null

    // Retrieve existing student list from localStorage
    let studentList = JSON.parse(localStorage.getItem("registeredStudents")) || [];

    // Display students on page load
    function displayStudents() {
        studentTableBody.innerHTML = ""; // Clear existing rows
        studentList.forEach((student, index) => {
            const tableRow = document.createElement("tr");
            tableRow.innerHTML = `
                <td>${student.studentName}</td>
                <td>${student.studentId}</td>
                <td>${student.studentEmail}</td>
                <td>${student.studentContact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentTableBody.appendChild(tableRow);
        });
    }

  // Add new student to the list
  function addStudent(studentName, studentEmail, studentId, studentContact) {

    if(editStudentIndex === null){
        studentList.push({ studentName, studentEmail, studentId, studentContact });

    }else{
        document.querySelector('button').innerHTML = 'REGISTER'

        studentList[editStudentIndex] = { studentName, studentEmail, studentId, studentContact }
        editStudentIndex = null
        
    }

    localStorage.setItem("registeredStudents", JSON.stringify(studentList));
    displayStudents();
}

// Delete the student from the list

function deleteStudent(index){
console.log(index)
studentList.splice(index,1)
localStorage.setItem("registeredStudents", JSON.stringify(studentList));
displayStudents()
}

// Edit the Student
function editStudent(index){
editStudentIndex = index
document.querySelector('button').innerHTML = 'SAVE'

    document.getElementById("student-name").value = studentList[index].studentName;
    document.getElementById("student-id").value = studentList[index].studentId;
     document.getElementById("student-email").value = studentList[index].studentEmail;
    document.getElementById("student-contact").value = studentList[index].studentContact;
    
}



studentForm.addEventListener("submit", (e) => {
    e.preventDefault();
   
  
    const studentName = document.getElementById("student-name").value;
    const studetnId = document.getElementById("student-id").value;
    const studentEmail = document.getElementById("student-email").value;
    const studetnContact = document.getElementById("student-contact").value;
  
    console.log(studentName,studentEmail,studetnId,studetnContact)
    if( studentName && studentEmail && studetnId && studetnContact){
      addStudent(studentName,studentEmail,studetnId,studetnContact)
    }
    studentForm.reset()
  });

  displayStudents()
