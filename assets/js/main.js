const inputElement = document.querySelector('#input-todo')
const buttonElement = document.querySelector('.btn-add-todo')
const todoSection = document.querySelector('.todos')

const createTodoCard = () => {
    const card = document.createElement('div')
    card.classList.add('todo-card')
    return card
}

const createDeleteButton = () => {
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Apagar'
    deleteButton.setAttribute('class', 'delete-button')
    deleteButton.setAttribute('title', 'Apagar tarefa')
    return deleteButton
}

const createTodo = (inputText) => {
    const todoCard = createTodoCard();
    const text = document.createElement('p')
    text.innerHTML = inputText

    todoCard.appendChild(text)
    todoCard.appendChild(createDeleteButton())
    todoSection.appendChild(todoCard)

    cleanInput();
    saveTodo();
}

const cleanInput = () => {
    inputElement.value = '';
    inputElement.focus();
}

const saveTodo = () => {
    const todos = todoSection.querySelectorAll('.todo-card');
    const todoList = [];

    for (let todo of todos) {
        let todoText = todo.innerText;
        todoText = todoText.replace('Apagar', '').trim();
        todoList.push(todoText);
    }

    const todosJson = JSON.stringify(todoList);
    localStorage.setItem('todos', todosJson);
}

const addSavedTodos = () => {
    const todos = localStorage.getItem('todos');
    const todoList = JSON.parse(todos);
    
    if (todoList)
        for (let todo of todoList) {
            createTodo(todo);
        }
}

inputElement.addEventListener('keypress', (e) => { 
    if (e.keyCode === 13) {
        if (!inputElement.value) return;
        createTodo(inputElement.value);
    }
})

buttonElement.addEventListener('click', () => { 
    if (!inputElement.value) return;
    createTodo(inputElement.value);
})

document.addEventListener('click',  (e) => { 
    const el = e.target;

    if (el.classList.contains('delete-button')) {
        el.parentElement.remove();
        saveTodo();
    }
})

addSavedTodos();
