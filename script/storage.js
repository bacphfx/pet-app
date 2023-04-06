"use strict";

// Lưu vào storage
const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

let getPetFromStorage = function (key) {
  petArr = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : [];
};

let getBreedFromStorage = function (key) {
  breedArr = localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : [];
};

// localStorage.clear();
