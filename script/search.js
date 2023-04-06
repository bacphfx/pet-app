"use strict";

// Khai báo biến
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tbodyEl = document.getElementById("tbody");

let petArr = [];
let breedArr = [];

// Tạo animation cho sidebar khi người dùng click vào
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

// Hàm hiển thị toàn bộ breed
const displayBreed = function () {
  breedInput.innerHTML = "<option>Select Breed</option>";
  for (let i = 0; i < breedArr.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${breedArr[i].breed}</option>`;
    breedInput.appendChild(option);
  }
};

// Hàm tìm kiếm pet thỏa mãn điều kiện
function findPet() {
  let id = idInput.value;
  let name = nameInput.value;
  let type = typeInput.value;
  let breed = breedInput.value;
  let vaccinated = vaccinatedInput.checked;
  let dewormed = dewormedInput.checked;
  let sterilized = sterilizedInput.checked;

  if (id !== "") {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id.indexOf(id) < 0) {
        petArr.splice(i, 1);
        i--;
      }
    }
  }
  if (name !== "") {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].name.indexOf(name) < 0) {
        petArr.splice(i, 1);
        i--;
      }
    }
  }
  if (type !== "Select Type") {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].type !== type) {
        petArr.splice(i, 1);
        i--;
      }
    }
  }
  if (breed !== "Select Breed") {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].breed !== breed) {
        petArr.splice(i, 1);
        i--;
      }
    }
  }
  if (vaccinated) {
    for (let i = 0; i < petArr.length; i++) {
      if (!petArr[i].vaccinated) {
        petArr.splice(i, 1);
        i--;
      }
    }
  }
  if (dewormed) {
    for (let i = 0; i < petArr.length; i++) {
      if (!petArr[i].dewormed) {
        petArr.splice(i, 1);
        i--;
      }
    }
  }
  if (sterilized) {
    for (let i = 0; i < petArr.length; i++) {
      if (!petArr[i].sterilized) {
        petArr.splice(i, 1);
        i--;
      }
    }
  }
  renderTableData(petArr);
}

// Hàm hiển thị pet
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
      <td>${x[i].date}</td>`;
    tbodyEl.appendChild(row);
  }
};

// Find button click event
const findBtn = document.getElementById("find-btn");
findBtn.addEventListener("click", findPet);

// Bắt đầu load trang
getPetFromStorage("petArr");
getBreedFromStorage("breedArr");
displayBreed();
