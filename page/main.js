'use strict';// eslint-disable-line

/* eslint linebreak-style: ['error', 'windows'] */

function connect(method, query, callback, send) {
  const xhr = new XMLHttpRequest();
  const url = `http://localhost:8080/${query}`;
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

function renderNames(data) {
  const nameSelect = document.getElementById('names');
  names.innerHTML= '';
  data.rows.forEach((element) => {
    const nameOption = document.createElement('option');
    nameOption.textContent = element.name;
    nameOption.dataset.id = element.id;
    nameSelect.appendChild(nameOption);
  });
}

window.addEventListener('load', () => {
  connect('GET', 'users', renderNames, null);
});

function createTciket() {
  const reporter = document.getElementById('names').value;
  let optionList = document.querySelectorAll('option');
  let id = '';
  optionList.forEach((e) => {
    if (e.text === reporter) {
      id = e.attributes[0].nodeValue;
    }
  });
  const manufacturer = document.getElementById('manufacturer').value;
  const serialNumber = document.getElementById('serial-number').value;
  const description = document.getElementById('description').value;
  const newTicket = {
    reporter: id,
    manufacturer,
    serial_number: serialNumber,
    description,
  };
  console.log(newTicket);
  return newTicket;
}

const reportButton = document.getElementById('report');
reportButton.addEventListener('click', (e) => {
  e.preventDefault();
  const newTicket = createTciket();
  connect('POST', 'tickets', null, newTicket);
});

