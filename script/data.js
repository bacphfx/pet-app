"use strict";

// Khai báo biến
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");

let petArr = [];

// Tạo animation cho sidebar khi người dùng click vào
const sideBar = document.getElementById("sidebar");
const toggleSideBar = function () {
  sideBar.classList.toggle("active");
};
sideBar.addEventListener("click", toggleSideBar);

// Load dữ liệu Pet đang có
getPetFromStorage("petArr");

// Export dữ liệu
exportBtn.addEventListener("click", saveStaticDataToFile);
let a = JSON.stringify(petArr);
// Tạo hàm lưu dữ liệu xuống máy người dùng thông qua thư viện FileSaver
function saveStaticDataToFile() {
  var blob = new Blob([a], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "petArr.json");
}

// Import dữ liệu
importBtn.addEventListener("click", importDataFromFile);
// Hàm import
function importDataFromFile() {
  let json = document.getElementById("input-file").files[0];
  let reader = new FileReader();
  reader.addEventListener("load", function () {
    let load = JSON.parse(reader.result);
    saveToStorage("petArr", load);
  }),
    reader.readAsText(json);
}
