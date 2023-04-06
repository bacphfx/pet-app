"use strict";

// Khai báo biến
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const tbodyEl = document.getElementById("tbody");

const submitBtn = document.querySelector("#submit-btn");

let breedArr = [];
let data = {};

// Tạo animation cho sidebar
const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

// Lấy dữ liệu người dùng nhập vào
const inputData = function () {
  data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
};

// Hàm Validate dữ liệu
const validate = function () {
  for (let i = 0; i < breedArr.length; i++) {
    if (
      breedInput.value === breedArr[i].breed &&
      typeInput.value === breedArr[i].type
    ) {
      alert("This breed has been existed");

      return false;
    }
  }
  if (data.type === "Select Type") {
    alert("Please select Type");
    return false;
  }
  breedArr.push(data);
};

// Hàm xóa dữ liệu
function deleteRow(i) {
  const answer = confirm("Are you sure?");
  if (answer) {
    breedArr.splice(i, 1);
    renderBreed(breedArr);
    saveToStorage("breedArr", breedArr);
  }
}

// Hàm hiển thị dữ liệu
const renderBreed = function (x) {
  tbodyEl.innerHTML = "";
  for (let i = 0; i < x.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${i + 1}</td>
    <td>${x[i].breed}</td>
    <td>${x[i].type}</td>
    <td>
        <button type="button" class="btn btn-danger delete-row" onclick="deleteRow('${i}')">Delete</button>
    </td>`;
    tbodyEl.appendChild(row);
  }
};

// Submit button click
submitBtn.addEventListener("click", function () {
  inputData();
  validate();
  renderBreed(breedArr);
  saveToStorage("breedArr", breedArr);
});

// Bắt đầu load trang
// get data from storage
getBreedFromStorage("breedArr");
renderBreed(breedArr);
