let elForm = document.querySelector(".form");
let elInput = document.querySelector(".input");
let elInputName = document.querySelector(".input--name");
let elResult = document.querySelector(".todo__list");
let elAllItemInfo = document.querySelector(".btn--all-info");
let elSuccessInfo = document.querySelector(".btn--success-info");
let elFailInfo = document.querySelector(".btn--fail-info");
let elBtnSuccess = document.querySelector(".btn--success");
let elBtnFail = document.querySelector(".btn--fail");
let elAllBtn = document.querySelector(".btn--all");

let todos = [];
let calcId = [];

elResult.addEventListener("click", (evt) => {
  if (evt.target.matches(".delete-btn")) {
    let toDoBtnId = evt.target.dataset.todoId * 1;
    const foundTodoIndex = todos.findIndex((todo) => todo.id === toDoBtnId);
    todos.splice(foundTodoIndex, 1);
    elResult.innerHTML = null;
    renderTodos(todos, elResult);
  } else if (evt.target.matches(".input--work")) {
    let toDoCheckboxId = evt.target.dataset.checkboxId * 1;
    const foundCheckbox = todos.find((todo) => todo.id === toDoCheckboxId);
    foundCheckbox.isCompleted = !foundCheckbox.isCompleted;
    elResult.innerHTML = null;
    renderTodos(todos, elResult);
    if (foundCheckbox.isCompleted === true) {
      calcId.push(toDoCheckboxId);
    }

    elSuccessInfo.textContent = calcId.length;
  }
});

let renderTodos = (arr, element) => {
  for (let item of arr) {
    let newItem = document.createElement("li");
    let newLabel = document.createElement("label");
    let newCheckbox = document.createElement("input");
    let newForm = document.createElement("form");
    let newBtn = document.createElement("button");
    newItem.setAttribute("class", "list-group-item d-flex align-items-center");
    newLabel.setAttribute("class", "form-check-label label--work");
    newLabel.setAttribute("for", "user__work");
    newCheckbox.setAttribute("class", "form-check-input ms-1 me-3 input--work");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("id", "user__work");
    newBtn.setAttribute("class", "btn btn-danger ms-auto delete-btn");
    newBtn.setAttribute("type", "button");
    element.appendChild(newItem);
    newItem.appendChild(newForm);
    newItem.appendChild(newBtn);
    newForm.appendChild(newCheckbox);
    newForm.appendChild(newLabel);
    newLabel.textContent = `Vazifa: ${item.work},       Qo'shgan foydalanuvchi: ${item.name}`;
    newBtn.textContent = "o`chirish";
    if (item.isCompleted) {
      newCheckbox.checked = true;
      newLabel.style.textDecoration = "line-through";
    }
    newBtn.dataset.todoId = item.id;
    newCheckbox.dataset.checkboxId = item.id;
  }
};

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let inputValue = elInput.value;
  let inputNameValue = elInputName.value;

  let todo = {
    id: todos[todos.length - 1]?.id + 1 || 0,
    work: inputValue,
    name: inputNameValue,
    isCompleted: false,
  };

  todos.push(todo);
  elInput.value = null;

  elResult.innerHTML = null;
  renderTodos(todos, elResult);
  elAllItemInfo.textContent = todos.length;
});

elBtnSuccess.addEventListener("click", () => {
  let filterSuccessInfo = todos.filter((todo) => {
    return todo.isCompleted == true;
  });
  elResult.innerHTML = null;
  renderTodos(filterSuccessInfo, elResult);
});
elBtnFail.addEventListener("click", () => {
  let filterFailInfo = todos.filter((todo) => {
    return todo.isCompleted == false;
  });
  elFailInfo.textContent = filterFailInfo.length;
  elResult.innerHTML = null;
  renderTodos(filterFailInfo, elResult);
});
elAllBtn.addEventListener("click", () => {
  let todosCopy = todos.slice();

  elAllItemInfo.textContent = todosCopy.length;
  elResult.innerHTML = null;
  renderTodos(todosCopy, elResult);
});
