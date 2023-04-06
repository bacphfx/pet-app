"use strict";

// Khai báo biến
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tbodyEl = document.getElementById("tbody");
const editForm = document.getElementById("container-form");

const submitBtn = document.querySelector("#submit-btn");

let petArr = [];
let breedArr = [];
let data = {};
let inputProgress = true;

// Tạo animation cho sidebar
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

// định dạng ngày
const d = new Date();
let day = d.getDate(),
  month = d.getMonth() + 1,
  year = d.getFullYear();
let nowDate = `${day}/${month}/${year}`;

// lấy dữ liệu người dùng nhập vào
const inputData = function () {
  data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: nowDate,
  };
};

// Hàm Validate dữ liệu
const validate = function () {
  if (nameInput.value.length === 0) {
    alert("Please input Name!");
    inputProgress = false;
    return false;
  } else inputProgress = true;

  if (ageInput.value.length === 0) {
    alert("Please input Age!");
    inputProgress = false;
    return false;
  } else if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    inputProgress = false;
    return false;
  } else inputProgress = true;

  if (weightInput.value.length === 0) {
    alert("Please input Weight!");
    inputProgress = false;
    return false;
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    inputProgress = false;
    return false;
  } else inputProgress = true;

  if (lengthInput.value.length === 0) {
    alert("Please input Length!");
    inputProgress = false;
    return false;
  } else if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    inputProgress = false;
    return false;
  } else inputProgress = true;

  if (data.type === "Select Type") {
    alert("Please select Type!");
    inputProgress = false;
    return false;
  } else inputProgress = true;

  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    inputProgress = false;
    return false;
  } else inputProgress = true;
};

// Hàm hiển thị dữ liệu
const renderEditedPet = function (x) {
  tbodyEl.innerHTML = "";

  for (let i = 0; i < x.length; i++) {
    let vaccinCheck = x[i].vaccinated
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";

    let dewormCheck = x[i].dewormed
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";

    let sterilizeCheck = x[i].sterilized
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";

    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${x[i].id}</th>
        <td>${x[i].name}</td>
        <td>${x[i].age}</td>
        <td>${x[i].type}</td>
        <td>${x[i].weight} kg</td>
        <td>${x[i].length} cm</td>
        <td>${x[i].breed}</td>
        <td>
          <i class="bi bi-square-fill" style="color: ${x[i].color}"></i>
        </td>
        <td><i class="${vaccinCheck}"></i></td>
        <td><i class="${dewormCheck}"></i></td>
        <td><i class="${sterilizeCheck}"></i></td>
        <td>${x[i].date}</td>
        <td>
          <button type="button" class="btn btn-warning edit-pet" onclick="editPet('${x[i].id}')">Edit</button>
        </td>`;
    tbodyEl.appendChild(row);
  }
};

// Hàm edit pet
function editPet(x) {
  editForm.classList.remove("hide");
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id == x) {
      idInput.value = `${petArr[i].id}`;
      nameInput.value = `${petArr[i].name}`;
      ageInput.value = `${petArr[i].age}`;
      weightInput.value = `${petArr[i].weight}`;
      lengthInput.value = `${petArr[i].length}`;
      typeInput.value = `${petArr[i].type}`;
      filterBreed();
      breedInput.value = `${petArr[i].breed}`;
      colorInput.value = `${petArr[i].color}`;
      vaccinatedInput.checked = petArr[i].vaccinated;
      sterilizedInput.checked = petArr[i].sterilized;
      dewormedInput.checked = petArr[i].dewormed;

      typeInput.addEventListener("click", function () {
        filterBreed();
      });
    }
  }
}

// submit button onclick
submitBtn.addEventListener("click", function () {
  inputData();
  validate();
  let id = document.getElementById("input-id").value;
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].id == id && inputProgress) {
      petArr[i] = data;
    }
  }
  renderEditedPet(petArr);
  saveToStorage("petArr", petArr);
});

// Bắt đầu load trang
// Lấy dữ liệu pet từ local storage
getPetFromStorage("petArr");
renderEditedPet(petArr);

// Hiển thị breed
// Lấy dữ liệu breed từ storage
getBreedFromStorage("breedArr");

// Tạo breedArr theo type
const breedDog = breedArr.filter(chooseDog);
function chooseDog(arr) {
  return arr.type === "Dog";
}
const breedCat = breedArr.filter(chooseCat);
function chooseCat(arr) {
  return arr.type === "Cat";
}
// Hàm lọc breed
const filterBreed = function () {
  const displayBreed = function (breedPet) {
    breedInput.innerHTML = "<option>Select Breed</option>";
    for (let i = 0; i < breedPet.length; i++) {
      const option = document.createElement("option");
      option.innerHTML = `<option>${breedPet[i].breed}</option>`;
      breedInput.appendChild(option);
    }
  };
  if (typeInput.value === "Dog") displayBreed(breedDog);
  if (typeInput.value === "Cat") displayBreed(breedCat);
};
