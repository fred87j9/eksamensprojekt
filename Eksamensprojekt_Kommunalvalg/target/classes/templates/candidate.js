fetch("http://localhost:8080/candidates")
    .then(response => response.json())
    .then(result =>{
        console.log(result)
        result.map(constructCandidateTableRow)
    })
function constructCandidateTableRow(candidate){
    const tableRow = document.createElement("tr");
    tableRow.id = candidate.id;
    const tableBody = document.getElementById("candidates-table")
    tableBody.appendChild(tableRow);

    createTableRow(candidate,tableRow);
}

function createTableRow(candidate,tableRow){
    tableRow.innerHTML=`
    <td>${candidate.firstName}</td>
        <td>${candidate.lastName}</td>
        <td>${candidate.commune}</td>
        <td>${candidate.party.initial}</td>
        <td>${candidate.party.partyName}</td>
        
        <button id="update-candidate-${candidate.id}">🥯</button>
</td>
    `;
    document.getElementById(`update-candidate-${candidate.id}`).addEventListener("click",()=>updateCandidate(candidate));

}
document.getElementById("submit").addEventListener("click", ()  => {
    const getDataFromInput = {
        "firstName": document.getElementById("firstName").value,
        "lastName": document.getElementById("lastName").value,
        "commune": document.getElementById("communes").value,
        "id": document.getElementById("id").value

    }
    console.log(getDataFromInput)

    fetch(`http://localhost:8080/candidates/${getDataFromInput.id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;"
        },
        body: JSON.stringify(getDataFromInput)
    }).then(response => response.json())
        .then(result => {
            constructCandidateTableRow(result)
        })
});

function updateCandidate(candidate) {
    const tableRowToUpdate = document.getElementById(candidate.id);

    tableRowToUpdate.innerHTML = `
    <td>
        <input id="update-candidate-firstName-${candidate.id}" value="${candidate.firstName}">
    </td>
    <td>
        <input id="update-candidate-lastName-${candidate.id}" value="${candidate.lastName}">
    </td>
    <td>
        <input id="update-candidate-commune-${candidate.id}" value="${candidate.commune}">
    </td>
    <td>
    
       <button onclick="updateCandidateInBackend(${candidate.id})">✅</button>
</td>
<td>
<button onclick="deleteExercise(${candidate.id})">❌</button>
</td>
}
   `;


}

function updateCandidateInBackend(candidateId) {
    const tableRowToUpdate = document.getElementById(candidateId);
console.log()
const candidateToUpdate = {
    id:candidateId,
    firstName: document.getElementById(`update-candidate-firstName-${candidateId}`).value,
    lastName: document.getElementById(`update-candidate-lastName-${candidateId}`).value,
    commune: document.getElementById(`update-candidate-commune-${candidateId}`).value,

};
    fetch("http://localhost:8080/candidates/" + candidateId, {
        method: "PATCH",
        headers: { "Content-type": "application/json;" },
        body: JSON.stringify(candidateToUpdate)
    }).then(response => {
        if (response.status === 200) {
            createTableRow(candidateToUpdate,tableRowToUpdate)
        }
    });
}

function deleteExercise(candidateId) {
    fetch("http://localhost:8080/candidates/" + candidateId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(candidateId).remove();
        } else {
            console.log(response.status);
        }
    });

}
//Lav 6 knapper som sender data ind i functionens parameter.
//Check hvad data der er sendt ind i tabellen
//hvis SF knap sender sort table (if part === "SF"){



function orderTable() {

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("candidates-table");
    tr = table.getElementsByTagName("tr");


    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}






