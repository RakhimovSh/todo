let elForm = document.querySelector(".form");
let elInput = document.querySelector(".input");
let elInputName = document.querySelector(".input--name");
let elResult = document.querySelector(".todo__list");

let todos = [];

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let inputValue = elInput.value;
  let inputNameValue = elInputName.value;

  let todo = {
    work: inputValue,
    name: inputNameValue,
  };

  todos.push(todo);
  elInput.value = null;

  elResult.innerHTML = null;
  for (let item of todos) {
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
    newBtn.setAttribute("class", "btn btn-danger ms-auto");
    newBtn.setAttribute("type", "button");
    elResult.appendChild(newItem);
    newItem.appendChild(newForm);
    newItem.appendChild(newBtn);
    newForm.appendChild(newCheckbox);
    newForm.appendChild(newLabel);
    newLabel.textContent = `Vazifa: ${item.work},       Qo'shgan foydalanuvchi: ${item.name}`;
    newBtn.textContent = "o`chirish";
    newBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      newItem.classList.add("forDisplay");
    });
  }
});
