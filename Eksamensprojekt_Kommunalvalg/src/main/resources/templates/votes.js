fetch("http://localhost:8080/parties")
.then(response => response.json())
.then(result =>{
    console.log(result)
    result.map(constructPartyTableRow)
})
function constructPartyTableRow(parties){
    const tableRow = document.createElement("tr");
    tableRow.id = parties.id;
    const tableBody = document.getElementById("votes-table")
    tableBody.appendChild(tableRow);

    createTableRow(parties,tableRow);
}

function createTableRow(parties,tableRow){
    tableRow.innerHTML=`
    <td>${parties.initial}</td>
        <td>${parties.partyName}</td>             
        <td>${parties.votes}%</td>             

    `;
}
