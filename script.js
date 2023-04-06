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

const submitBtn = document.querySelector("#submit-btn");
const healthyBtn = document.querySelector("#healthy-btn");
const allPetBtn = document.getElementById("allPet-btn");

let data = {};
let petArr = [];
let breedArr = [];

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
  if (idInput.value.length === 0) {
    alert("Please input ID!");
    return false;
  }
  for (let i = 0; i < tbodyEl.rows.length; i++) {
    if (idInput.value === tbodyEl.rows[i].cells[0].textContent) {
      alert("Please enter a unique ID");
      return false;
    }
  }

  if (nameInput.value.length === 0) {
    alert("Please input Name!");
    return false;
  }

  if (ageInput.value.length === 0) {
    alert("Please input Age!");
    return false;
  } else if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }

  if (weightInput.value.length === 0) {
    alert("Please input Weight!");
    return false;
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }

  if (lengthInput.value.length === 0) {
    alert("Please input Length!");
    return false;
  } else if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }

  if (data.type === "Select Type") {
    alert("Please select Type!");
    return false;
  }

  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    return false;
  }

  // đúng dữ liệu --> chèn dữ liệu vào array
  petArr.push(data);
  resetData();
};

// Hàm đặt lại dữ liệu
const resetData = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Hàm hiển thị dữ liệu
const renderTableData = function (x) {
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
        <button type="button" class="btn btn-danger delete-row" id="${x[i].id}" onclick="deleteRow()">Delete</button>
      </td>`;
    tbodyEl.appendChild(row);
  }
};

// Hàm Xoá pet
function deleteRow() {
  document.getElementById("tbody").onclick = function (e) {
    const deleteButton = e.target.closest(".delete-row");
    if (deleteButton) {
      const answer = confirm("Are you sure?");
      if (answer) {
        const index = petArr.findIndex(
          (pet) => pet.id === deleteButton.getAttribute("id")
        );
        if (index >= 0) {
          petArr.splice(index, 1);
          renderTableData(petArr);
          saveToStorage("petArr", petArr);
        }
      }
    }
  };
}

// Hàm lọc pet khỏe mạnh
function healthyPet() {
  let healthyPetArr = [];
  tbodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    if (
      petArr[i].vaccinated === true &&
      petArr[i].dewormed === true &&
      petArr[i].sterilized === true
    ) {
      healthyPetArr.push(petArr[i]);
      renderTableData(healthyPetArr);
    }
  }
}

// Submit button click event
submitBtn.addEventListener("click", function () {
  inputData();
  validate();
  renderTableData(petArr);
  saveToStorage("petArr", petArr);
});

// Healthy button click event
healthyBtn.addEventListener("click", function () {
  healthyPet();
  healthyBtn.classList.toggle("non-display");
  allPetBtn.classList.toggle("non-display");
});

//Show All Pet button click event
document.getElementById("allPet-btn").addEventListener("click", function () {
  renderTableData(petArr);
  allPetBtn.classList.toggle("non-display");
  healthyBtn.classList.toggle("non-display");
});

// Bắt đầu load trang
// Lấy dữ liệu pet từ local storage
getPetFromStorage("petArr");
renderTableData(petArr);

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

// Hiển thị breed khi người dùng chọn type
typeInput.addEventListener("click", function () {
  filterBreed();
});
