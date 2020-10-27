const uri = '/api/Employees';
let employees = [];

function getEmployees() 
{
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayEmployees(data))
        .catch(error => console.error('Unable to get employees.', error));
}

function addEmployee() 
{
    let firstName = document.getElementById('inputFirstName');
    let lastName = document.getElementById('inputLastName');
    let position = document.getElementById('inputPosition');
    let salary = document.getElementById('inputSalary');

    const employee = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        position: position.value.trim(),
        salary: salary.value.trim(),
    };
    
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
        })
        .then(response => response.json())
        .then(() => {
            getEmployees();
            firstName.value = '';
            lastName.value = '';
            position.value = '';
            salary.value = '';
        })
        .catch(error => console.error('Unable to add employee.', error));
}

function _displayEmployees(data) 
{
    const tEmployees = document.getElementById('employee-table');
    tEmployees.innerHTML = '';
    
    let tr1 = tEmployees.insertRow();
    
    let rh1 = tr1.insertCell();
    let rh1Textbox = document.createTextNode('First Name');
    rh1.appendChild(rh1Textbox);

    let rh2 = tr1.insertCell();
    let rh2Textbox = document.createTextNode('Last Name');
    rh2.appendChild(rh2Textbox);

    let rh3 = tr1.insertCell();
    let rh3Textbox = document.createTextNode('Position');
    rh3.appendChild(rh3Textbox);

    let rh4 = tr1.insertCell();
    let rh4Textbox = document.createTextNode('');
    rh4.appendChild(rh4Textbox);

    let rh5 = tr1.insertCell();
    let rh5Textbox = document.createTextNode('');
    rh5.appendChild(rh5Textbox); 

    const button = document.createElement('button');

    data.forEach(employee => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute("class", "btn btn-outline-secondary");
        editButton.setAttribute('onclick', `displayEditForm(${employee.id})`);
    
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute("class", "btn btn-outline-danger");
        deleteButton.setAttribute('onclick', `deleteItem(${employee.id})`);
        
        let tr2 = tEmployees.insertRow();

        let td1 = tr2.insertCell();
        let firstNameTextNode = document.createTextNode(employee.firstName);
        td1.appendChild(firstNameTextNode);

        let td2 = tr2.insertCell();
        let lastNameTextNode = document.createTextNode(employee.lastName);
        td2.appendChild(lastNameTextNode);

        let td3 = tr2.insertCell();
        let positionTextNode = document.createTextNode(employee.position);
        td3.appendChild(positionTextNode);
        
        let td4 = tr2.insertCell();
        td4.appendChild(editButton);
    
        let td5 = tr2.insertCell();
        td5.appendChild(deleteButton);
    });
  
    employees = data;
}

function deleteEmployee(id) 
{
    fetch(`${uri}/${id}`, {
      method: 'DELETE'
    })
    .then(() => getEmployees())
    .catch(error => console.error('Unable to delete employee.', error));
}













/*
const uri = 'api/TodoItems';
let todos = [];

function getItems() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
  const addNameTextbox = document.getElementById('add-name');

  const item = {
    isComplete: false,
    name: addNameTextbox.value.trim()
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

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

function _displayItems(data) {
  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {
    let isCompleteCheckbox = document.createElement('input');
    isCompleteCheckbox.type = 'checkbox';
    isCompleteCheckbox.disabled = true;
    isCompleteCheckbox.checked = item.isComplete;

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    td1.appendChild(isCompleteCheckbox);

    let td2 = tr.insertCell(1);
    let textNode = document.createTextNode(item.name);
    td2.appendChild(textNode);

    let td3 = tr.insertCell(2);
    td3.appendChild(editButton);

    let td4 = tr.insertCell(3);
    td4.appendChild(deleteButton);
  });

  todos = data;
}
*/