const uri = 'https://localhost:44319/api/Employees';
let employees = [];


function getEmployees() {
  fetch(uri)
    .then(response => response.json())
    .then(data => console.log(data)) //_displayEmployee(data))
    .catch(error => console.error('Unable to get employees.', error));
}


function addEmployee() {
  const firstName = document.getElementById('first-name');
  const lastName = document.getElementById('last-name');
  const post = document.getElementById('post');
  const salary = document.getElementById('salary');

  const employee = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    post: post.value.trim(),
    salary: salary.value.trim(),
  };

  console.log(employee);

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  })
    .then(response => response.json())
    /*
    .then(() => {
      getEmployees();
      addFirstNameTextbox.value = '';
      addLastNameTextbox.value = '';
      addPostTextbox.value = '';
      addSalaryTextbox.value = '';
    })
    */
    .catch(error => console.error('Unable to add employee.', error));
}


//-----------------------------------------------------------------------

/*

function deleteItem(id) {
  fetch(`${uri}/${id}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
  const item = todos.find(item => item.id === id);
  
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-isComplete').checked = item.isComplete;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    isComplete: document.getElementById('edit-isComplete').checked,
    name: document.getElementById('edit-name').value.trim()
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'to-do' : 'to-dos';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}


//-------------------------------------------------------------------

function _displayEmployees(data) {
  const tBody = document.getElementById('employees');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(employee => {
    
    let isCompleteCheckbox = document.createElement('input');
    isCompleteCheckbox.type = 'checkbox';
    isCompleteCheckbox.disabled = true;
    isCompleteCheckbox.checked = item.isComplete;
    
    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${employee.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteItem(${employee.id})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    let textNode1 = document.createTextNode(employee.firstName);
    td1.appendChild(textNode1);

    let td2 = tr.insertCell(1);
    let textNode2 = document.createTextNode(employee.lastName);
    td2.appendChild(textNode2);

    let td3 = tr.insertCell(1);
    let textNode3 = document.createTextNode(employee.post);
    td3.appendChild(textNode3);

    let td4 = tr.insertCell(2);
    td4.appendChild(editButton);

    let td5 = tr.insertCell(3);
    td5.appendChild(deleteButton);
  });

  employees = data;
}
*/