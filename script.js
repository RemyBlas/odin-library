"use strict";

// 1. Repasar cómo se hacía para vincular el proyecto a GitHub
// 7. Agregar opciones para ordenar libros por nombre, fecha agregado, leídos/no leídos, etc
// 8. Agregar a cada libro un botón para eliminar. Pedir confirmación antes de borrarlos del array y actualizar estanterías

const myLibrary = [];

// SELECTORS
const container = document.querySelector(".container");
const addBookBtn = document.querySelector(".add-book-btn");
const modalContainer = document.querySelector(".modal_container");
const closeModalBtn = document.querySelector(".close_modal");
const form = document.querySelector(".new_book_form");
const submitBtn = document.querySelector(".submitBtn");
const removeBtn = document.querySelector(".remove_btn");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const tableCells = document.querySelector(".table_cells");

// FUNCTIONS

// Constructor:
const Book = function (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

// Test data:
const redRising = new Book("Red Rising", "Pierce Brown", 340, true);
const goldenSon = new Book("Golden Son", "Pierce Brown", 350, true);
const morningStar = new Book("Morning Star", "Pierce Brown", 400, true);
const lotr = new Book("Lord of the Rings", "J.R.R. Tolkien", 1000, true);
myLibrary.push(redRising, goldenSon, morningStar, lotr);

const displayBook = (book) => {
  tableCells.insertAdjacentHTML(
    "afterbegin",
    `<tr>
        <td class="book-title">${book.title}</td>
        <td class="author">${book.author}</td>
        <td class="pages">${book.pages} pages</td>
        <td class="status">
            <button class="read_btn ${book.read ? "read" : "unread"}" value="${
      book.read ? "Read" : "Not Read"
    }">${book.read ? "Read" : "Not Read"} </button>
            <button class="remove_btn">Delete</button>
        </td>
    </tr>
`
  );
};

const closeModal = function () {
  modalContainer.classList.add("hidden");
};

const toggleReadStatus = (btn) => {
  if (btn.classList.contains("read")) {
    btn.classList.remove("read");
    btn.classList.add("unread");
    btn.innerHTML = "Not read";
  } else {
    btn.classList.remove("unread");
    btn.classList.add("read");
    btn.innerHTML = "Read";
  }
};

const updateDisplay = () => {
  tableCells.innerHTML = "";
  myLibrary.forEach((e) => {
    displayBook(e);
  });
};

const removeBook = function (book) {
  if (confirm(`Are you sure you want to delete ${myLibrary[book].title}?`)) {
    myLibrary.splice(book, 1);
    updateDisplay();
  } else return;
};

// EVENT LISTENERS
addBookBtn.addEventListener("click", () => {
  modalContainer.classList.remove("hidden");
});

modalContainer.addEventListener("click", (e) => {
  const clickInside = document.querySelector(".modal").contains(e.target);
  if (!clickInside) {
    closeModal();
  }
});

closeModalBtn.addEventListener("click", (e) => {
  closeModal();
});

submitBtn.addEventListener("click", () => {
  if (
    title.value.length === 0 ||
    author.value.length === 0 ||
    pages.value.length === 0
  ) {
    alert("Please, fill all the fields");
    return;
  }

  const newBook = new Book(
    title.value,
    author.value,
    pages.value,
    read.checked
  );

  myLibrary.push(newBook);
  displayBook(newBook);

  closeModal();
  form.reset();
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".read_btn")) {
    toggleReadStatus(e.target);
  } else if (e.target.closest(".remove_btn")) {
    const currentBookTitle =
      e.target.parentNode.parentNode.childNodes[1].innerHTML;
    const index = myLibrary
      .map((e) => e.title)
      .indexOf(String(currentBookTitle));
    removeBook(index);
  }
});

updateDisplay();
