let currentRow = 0;

let startRoll = 0;

let endRoll = 0;

let absentList = [];

function generateTable() {

  startRoll = Number(document.getElementById("startRoll").value);

  endRoll = Number(document.getElementById("endRoll").value);

  if (startRoll == 0 || endRoll == 0 || startRoll > endRoll) {

    alert("Enter valid roll number");

    return;

  }

  // Hide Input Page
  document.getElementById("inputPage").style.display = "none";

  // Show Attendance Page
  document.getElementById("attendancePage").style.display = "block";

  // Hide Summary Page
  document.getElementById("summaryPage").style.display = "none";

  let table = "";

  for (let i = startRoll; i <= endRoll; i++) {

    table += `
      <tr id="row${i}">

        <td>${i}</td>

        <td>
          <span id="status${i}" class="status pending">
            Pending
          </span>
        </td>

        <td>

          <button class="presentBtn btn btn-success btn-sm me-2 fw-medium" onclick="present(${i})">
            Present
          </button>

          <button class="absentBtn btn btn-danger btn-sm fw-medium" onclick="absent(${i})">
            Absent
          </button>

        </td>

      </tr>
    `;

  }

  document.getElementById("tableBody").innerHTML = table;

  currentRow = 0;

  updateSummary();

  highlight();

}

// Present Student

function present(roll) {

  let status = document.getElementById("status" + roll);

  status.innerHTML = "Present";

  status.className = "status present";

  updateSummary();

}



// Absent Student

function absent(roll) {

  let status = document.getElementById("status" + roll);

  status.innerHTML = "Absent";

  status.className = "status absent";

  updateSummary();

}

// All Present

function allPresent() {

  for (let i = startRoll; i <= endRoll; i++) {

    present(i);

  }

  updateSummary();

}



// All Absent

function allAbsent() {

  for (let i = startRoll; i <= endRoll; i++) {

    absent(i);

  }

  updateSummary();

}

// Reset Attendance

function resetAttendance() {

  for (let i = startRoll; i <= endRoll; i++) {

    let status = document.getElementById("status" + i);

    status.innerHTML = "Pending";

    status.className = "status pending";

  }

  updateSummary();

}

// Update Summary

function updateSummary() {

  if (startRoll == 0) {

    return;

  }

  let present = [];

  absentList = [];

  for (let i = startRoll; i <= endRoll; i++) {

    let status = document.getElementById("status" + i).innerHTML;

    if (status == "Present") {

      present[present.length] = i;

    }
    else if (status == "Absent") {

      absentList[absentList.length] = i;

    }

  }

  document.getElementById("totalStudent").innerHTML =
    endRoll - startRoll + 1;

  document.getElementById("totalPresent").innerHTML =
    present.length;

  document.getElementById("totalAbsent").innerHTML =
    absentList.length;

  if (present.length == 0) {

    document.getElementById("presentList").innerHTML =
      "No Present Student";

  }
  else {

    document.getElementById("presentList").innerHTML =
      present.join(", ");

  }

  if (absentList.length == 0) {

    document.getElementById("absentList").innerHTML =
      "No Absent Student";

  }
  else {

    document.getElementById("absentList").innerHTML =
      absentList.join(", ");

  }

  // Summary Page Cards

  document.getElementById("finalTotal").innerHTML =
    document.getElementById("totalStudent").innerHTML;

  document.getElementById("finalPresent").innerHTML =
    document.getElementById("totalPresent").innerHTML;

  document.getElementById("finalAbsent").innerHTML =
    document.getElementById("totalAbsent").innerHTML;

}

// Save Attendance

function saveAttendance() {

  updateSummary();

  // Hide Attendance Page
  document.getElementById("attendancePage").style.display = "none";

  // Show Summary Page
  document.getElementById("summaryPage").style.display = "flex";

  // Show Download Button
  document.getElementById("downloadBtn").style.display = "inline-block";

  alert("Attendance Saved Successfully");

}

// Download TXT File

function download() {

  let text = "Absent Student List\n\n";

  if (absentList.length == 0) {

    text += "No Absent Student";

  }
  else {

    text += "Roll Numbers : " + absentList.join(", ");

  }

  let file = new Blob([text], {
    type: "text/plain"
  });

  let link = document.createElement("a");

  link.href = URL.createObjectURL(file);

  link.download = "Absent_Student_List.txt";

  link.click();

  URL.revokeObjectURL(link.href);

}

// Highlight Selected Row

function highlight() {

  for (let i = startRoll; i <= endRoll; i++) {

    document.getElementById("row" + i).className = "";

  }

  let activeRow = document.getElementById("row" + (startRoll + currentRow));
 
  activeRow.className = "active";
 
  activeRow.scrollIntoView({ behavior: "smooth", block: "center" });


}



// Keyboard Events

document.addEventListener("keydown", keyEvents);

function keyEvents(event) {

  // Only work on Attendance Page
  if (document.getElementById("attendancePage").style.display == "none") {

    return;

  }

  if (startRoll == 0) {

    return;

  }

  if (event.key == "ArrowDown") {

    if (currentRow < endRoll - startRoll) {

      currentRow++;

    }

    highlight();

  }

  else if (event.key == "ArrowUp") {

    if (currentRow > 0) {

      currentRow--;

    }

    highlight();

  }

  else if (event.key == "ArrowLeft") {

    absent(startRoll + currentRow);

  }

  else if (event.key == "ArrowRight") {

    present(startRoll + currentRow);

  }

}

// Back to Attendance Page

function backToAttendance() {

  document.getElementById("summaryPage").style.display = "none";

  document.getElementById("attendancePage").style.display = "block";

}



// Back to Input Page

function backToInput() {

  document.getElementById("attendancePage").style.display = "none";

  document.getElementById("summaryPage").style.display = "none";

  document.getElementById("inputPage").style.display = "flex";



  startRoll = 0;
  endRoll = 0;
  currentRow = 0;

  document.getElementById("startRoll").value = "";
  document.getElementById("endRoll").value = "";

}