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
  connect('GET', 'users', renderNames, null);
});

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

console.log(':)');
