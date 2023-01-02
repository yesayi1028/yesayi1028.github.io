let countTasks = 0; complTasks = 0;

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addTask);

const inp = document.getElementById('inputarea')

function addTask(){
    let inputValue = document.getElementById('inputarea').value;
    if (!inputValue) {
        inp.placeholder = 'Please fill in this field';
        return;
    } 
    
    inp.placeholder = 'Task name';
    let tasks = document.getElementById('tasks');
    let createNewTask = document.createElement('div');
    createNewTask.className = 'taskItems'
    // createNewTask.innerHTML = inputValue;
    tasks.appendChild(createNewTask);

    let textArea = document.createElement('input');
    textArea.type = 'text';
    textArea.className = 'textArea';
    textArea.value = inputValue;
    // textArea.readOnly = true;
    textArea.setAttribute('readonly', true);
    
    //buttons
    let spans = document.createElement('div');
    spans.id = 'spans'

    let completeButton = document.createElement('span');
    completeButton.innerHTML = "Complete";
    completeButton.className = "complete";
    completeButton.style.color = "green";
    completeButton.addEventListener('click', completeFunc);

    let editButton = document.createElement('span');
    editButton.innerHTML = "Edit";
    editButton.className = "edit";
    editButton.style.color = "black";
    editButton.addEventListener('click', editFunc)

    let deleteButton = document.createElement('span');
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "delete";
    deleteButton.style.color = "red";
    deleteButton.addEventListener('click', deleteFunc)

    createNewTask.appendChild(spans);
    createNewTask.appendChild(textArea);
    spans.appendChild(completeButton);
    spans.appendChild(editButton);
    spans.appendChild(deleteButton);

    document.getElementById('inputarea').value = '';

    countTasks++;
    complCount();
}

function completeFunc(e){
    //create complete text
    let completeText = document.createElement('span');
    completeText.innerHTML = 'Complete';
    completeText.style.fontSize = '16px';
    completeText.style.color = 'green';
    completeText.style.float = 'right';
    completeText.style.marginRight = '20px';
    completeText.style.display = 'block';
    completeText.style.cursor = 'default';
    //remove buttons(spans) and insert new text
    e.target.parentElement.style.display = 'none';
    let dv = e.target.parentElement;
    dv.parentElement.appendChild(completeText);

    complTasks++;
    complCount();
}

function editFunc(e) {

    let input = e.target.parentElement.nextElementSibling;
    // console.log(input);
    input.removeAttribute('readonly');

    //save
    let sv = document.createElement('span');
    sv.innerHTML = 'Save';
    sv.style.color = 'white';
    sv.style.cursor = 'pointer';
    sv.fontSize = '18px';
    sv.style.float = 'right';
    sv.style.margin = '5px 20px 0';
    sv.style.display = 'block';
    sv.addEventListener('click', saveFunc);

    let findSpanElement = e.target.parentElement.nextElementSibling.nextElementSibling;
    if(!findSpanElement) {
        e.target.parentElement.style.display = 'none';
        e.target.parentElement.parentElement.appendChild(sv);
    } else {
        e.target.parentElement.style.display = 'none';
        findSpanElement.style.display = 'block';
    }
}

function deleteFunc(e){
    e.target.parentElement.parentElement.style.display = 'none';

    countTasks--;
    complCount();
}

function saveFunc(e){
    
    let spansDiv = e.target.previousElementSibling.previousElementSibling;
    spansDiv.style.display = 'flex'
    
    e.target.style.display = 'none';

    let input =  e.target.previousElementSibling;
    input.setAttribute('readonly', true);

}

function enterFunc(e) {
    if(e.which === 13) {
        return addTask();
    }
}

function complCount(){
    let text = `${complTasks}/${countTasks} completed`;
    let completeP = document.getElementById('completed');

    if(countTasks !== 0) {
    completeP.innerText = text;
    } else {
        completeP.innerText = '';
    }
}