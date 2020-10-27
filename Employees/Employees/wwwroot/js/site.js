const uri = '/api/Employees';

let employees = [];

//                                      //
//            CRUD FUNCTIONS            //
//                                      //


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


function getEmployees() 
{
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayEmployees(data))
        .catch(error => console.error('Unable to get employees.', error));
}


function updateEmployee() 
{
    const employeeId = document.getElementById('editId').value;

    const employee = {
        id: parseInt(employeeId, 10),
        firstName: document.getElementById('editFirstName').value.trim(),
        lastName: document.getElementById('editLastName').value.trim(),
        position: document.getElementById('editPosition').value.trim()
    };
  
    fetch(`${uri}/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    })
    .then(() => getEmployees())
    .catch(error => console.error('Unable to update employee.', error));
  
    closeInput();
  
    return false;
}


function deleteEmployee(id) 
{
    fetch(`${uri}/${id}`, {
      method: 'DELETE'
    })
    .then(() => getEmployees())
    .catch(error => console.error('Unable to delete employee.', error));
}


//                                      //
//          DISPLAY FUNCTIONS           //
//                                      //


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
        editButton.setAttribute('class', 'btn btn-outline-secondary');
        editButton.setAttribute('onclick', `displayEditForm(${employee.id})`);
    
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('class', 'btn btn-outline-danger');
        deleteButton.setAttribute('onclick', `deleteEmployee(${employee.id})`);
        
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


function displayEditForm(id) 
{
    const employee = employees.find(employee => employee.id === id);

    document.getElementById('editId').value = employee.id;
    document.getElementById('editFirstName').value = employee.firstName;
    document.getElementById('editLastName').value = employee.lastName;
    document.getElementById('editPosition').value = employee.position;

    document.getElementById('edit-employee-container').style.display = 'block';
    document.getElementById('employee-container').style.display = 'none';
}
  
 
function closeInput() 
{
    document.getElementById('edit-employee-container').style.display = 'none';
    document.getElementById('employee-container').style.display = 'block';
}


document.getElementById('edit-employee-container').style.display = 'none';