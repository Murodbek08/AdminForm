let modal = document.querySelector(".modal");
let addDeveloperBtn = document.querySelector(".add-developer-btn");
let modalForm = document.querySelector("#modal-form");
let tbody = document.querySelector("tbody");
let saveDeveloperBtn = document.querySelector(".save-developer-btn");
let inputSearch = document.querySelector(".input-search input");
let headerForm = document.querySelector("#header-form");
let closeDeveloperBtn = document.querySelector(".close-developer-btn");
let localStorageData = localStorage.getItem("developerData");
let developerData = JSON.parse(localStorageData) || [];
let selected = null;
addDeveloperBtn.addEventListener("click", () => {
  modal.classList.add("active-modal");
  selected = null;
  let elmts = modalForm.elements;
  elmts.firstName.value = "";
  elmts.lastName.value = "";
  elmts.birthDay.value = "";
  elmts.salary.value = "";
  elmts.position.value = "";
  elmts.typePosition.value = "";
  elmts.married.checked = false;
});
saveDeveloperBtn.addEventListener("click", () => {
  let elmts = modalForm.elements;
  if (
    elmts.firstName.value == "" ||
    elmts.lastName.value == "" ||
    elmts.birthDay.value == "" ||
    elmts.salary.value == "" ||
    elmts.position.value == "" ||
    elmts.typePosition.value == ""
  ) {
    alert("Iltimos, bo'sh maydonlarni to‘ldiring!");
  } else {
    modal.classList.remove("active-modal");
  }
  saveDeveloperBtn.textContent = "Save Developer";
});
closeDeveloperBtn.addEventListener("click", function (e) {
  e.preventDefault();
  modal.classList.remove("active-modal");
});
modalForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let developer = {
    firstName: this.elements.firstName.value,
    lastName: this.elements.lastName.value,
    birthDay: this.elements.birthDay.value,
    salary: this.elements.salary.value,
    position: this.elements.position.value,
    typePosition: this.elements.typePosition.value,
    married: this.elements.married.checked,
  };
  if (selected == null) {
    developerData.push(developer);
  } else {
    developerData[selected] = developer;
  }
  localStorage.setItem("developerData", JSON.stringify(developerData));
  tbodyItem();
});
function developerInformation(el, i) {
  return `
    <tr>
    <td>${i + 1}</td>
    <td>${el.firstName}</td>
    <td>${el.lastName}</td>
    <td>${el.birthDay}</td>
    <td>${el.salary ? el.salary + " $" : "0 $"} </td>
    <td>${el.position}</td>
    <td>${el.typePosition}</td>
    <td>${el.married ? "Ha" : "Yo'q"}</td>
    <td>
      <div class="buttons">
        <button onclick="edit(${i})">Edit</button>
        <button onclick="deleted(${i})">Delete</button>
      </div>
    </td>
  </tr>
  `;
}
function tbodyItem(data = developerData) {
  tbody.innerHTML = "";
  data.map((el, i) => (tbody.innerHTML += developerInformation(el, i)));
}
tbodyItem();
function edit(i) {
  selected = i;
  saveDeveloperBtn.textContent = "Edit Developer";
  let { firstName, lastName, birthDay, salary, position, typePosition, married } = developerData[i];
  let elmts = modalForm.elements;
  elmts.firstName.value = firstName;
  elmts.lastName.value = lastName;
  elmts.birthDay.value = birthDay;
  elmts.salary.value = salary;
  elmts.position.value = position;
  elmts.typePosition.value = typePosition;
  elmts.married.checked = married;
  modal.classList.add("active-modal");
}
function deleted(i) {
  let isDelete = confirm("Are you sure you want to delete this developer");
  if (isDelete) {
    developerData.splice(i, 1);
  }
  localStorage.setItem("developerData", JSON.stringify(developerData));
  tbodyItem();
}
inputSearch.addEventListener("keyup", function () {
  search = this.value.trim().toLowerCase();
  let searchInput = developerData.filter(
    (el) =>
      el.firstName.toLowerCase().includes(search) || el.lastName.toLowerCase().includes(search)
  );
  tbodyItem(searchInput);
});
headerForm.addEventListener("change", function (e) {
  e.preventDefault();
  let filterPosition = this.elements.filterPosition.value.trim().toLowerCase();
  let filterTypePosition = this.elements.filterTypePosition.value.trim().toLowerCase();
  let searchInputPosition = developerData.filter(
    (el) =>
      el.position.toLowerCase().includes(filterPosition) &&
      el.typePosition.toLowerCase().includes(filterTypePosition)
  );
  tbodyItem(searchInputPosition);
});
