'use strict';// eslint-disable-line

/* eslint linebreak-style: ['error', 'windows'] */

function connect(method, query, callback, send) {
  const xhr = new XMLHttpRequest();
  // const url = `http://localhost:8080${query}`;
  const url = `http://localhost:8080/${query}`;
  // console.log('MyURL', url);
  xhr.open(method, url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      callback(data);
    }
  };
  xhr.send(JSON.stringify(send));
}

window.addEventListener('load', () => {
  connect('GET', 'tickets', renderTable, null);
});

function renderTable(data) {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML= '';
  data.rows.forEach((element) => {
    const row = document.createElement('tr');
    const id = document.createElement('td');
    id.textContent = element.id;
    row.appendChild(id);
    const reporter = document.createElement('td');
    reporter.textContent = element.reporter;
    row.appendChild(reporter);
    const manufacturer = document.createElement('td');
    manufacturer.textContent = element.manufacturer;
    row.appendChild(manufacturer);
    const serialNumber = document.createElement('td');
    serialNumber.textContent = element.serialNumber;
    row.appendChild(serialNumber);
    const description = document.createElement('td');
    description.textContent = element.description;
    row.appendChild(description);
    const reportedAt = document.createElement('td');
    reportedAt.textContent = element.reported_at;
    row.appendChild(reportedAt);
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'DELETE';
    deleteButton.dataset.id = element.id;
    deleteButton.addEventListener('click', () => {
      deleteTicket(element.id);
    });
    row.appendChild(deleteButton);
    tableBody.appendChild(row);
  });
}

function deleteTicket(id) {
  connect('DELETE', `tickets/${id}`, null, []);
  connect('GET', 'tickets', renderTable, null);
}

console.log(':)');