const addBook = document.getElementById('add-book');
const closeDialog = document.getElementById('close-dialog');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');

const bookDialog = document.getElementById('book-dialog');

const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const pageCount = document.getElementById('pages');
const bookStatus = document.getElementById('status');
const inputs = document.querySelectorAll('input:not([type="checkbox"])');

const bookList = document.querySelector('.book-list');
const count = document.querySelector('.count');
const readBooks = document.querySelector('.read-books');
const notReadBooks = document.querySelector('.notread-books');

addBook.addEventListener('click', () => {
  bookDialog.showModal();
});

closeDialog.addEventListener('click', () => {
  bookDialog.close();
});

const myLibrary = [];

class Book {
  constructor(title, author, pages, status, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = id;
  }
}

function addBookToLibrary(title, author, pages, status, id) {
  const newBook = new Book(title, author, pages, status, id);
  myLibrary.push(newBook);
}

function renderLibrary() {
  bookList.innerHTML = '';

  myLibrary.forEach(({ title, pages, author, status, id }) => {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('data-id', id);
    bookItem.classList.add('book-card');

    // Book Card
    bookItem.innerHTML = `
      <h2>${title}</h2>
      <p>Author: ${author}</p>
      <p>Pages: ${pages}</p>
      <button id="remove-btn">Remove</button>
      <button id="toggle-status">${status ? 'Read' : 'Not read'}</button>
    `;

    bookList.appendChild(bookItem);
  });
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary(
    bookTitle.value,
    bookAuthor.value,
    Number(pageCount.value),
    bookStatus.checked,
    crypto.randomUUID(),
  );
  renderLibrary();
  toggleStatus();
  removeBook();
  clearInput();
  // Update count
  count.textContent = myLibrary.length;
  readBooks.textContent = calculateReadBooks();
  notReadBooks.textContent = calculateNotReadBooks();
});

function removeBook() {
  const removeBtns = document.querySelectorAll('#remove-btn');
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const bookToRemove = btn.parentElement;
      const bookIndex = myLibrary.findIndex(
        ({ id }) => id === bookToRemove.dataset.id,
      );
      // Remove book from arr
      myLibrary.splice(bookIndex, 1);
      // Remove book from the DOM
      bookToRemove.remove();
      // Update the book count
      count.textContent = myLibrary.length;
    });
  });
}

function toggleStatus() {
  const toggleBtns = document.querySelectorAll('#toggle-status');
  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const book = myLibrary.find(({ id }) => {
        return btn.parentElement.dataset.id === id;
      });
      // console.log(book);
      if (book.status) {
        book.status = false;
        btn.textContent = 'Nor read';
      } else {
        book.status = true;
        btn.textContent = 'Read';
      }
      // Update read count
      notReadBooks.textContent = calculateNotReadBooks();
      readBooks.textContent = calculateReadBooks();
      // console.log(myLibrary)
    });
  });
}

// Reset book list

resetBtn.addEventListener('click', () => {
  bookList.innerHTML = '';
  myLibrary.length = 0;
  count.textContent = '0';
  readBooks.textContent = '0';
  notReadBooks.textContent = '0';
  // console.log(myLibrary);
});


function calculateReadBooks() {
  return myLibrary.filter(({status}) => status === true).length;
}

function calculateNotReadBooks() {
  return myLibrary.filter(({status}) => status === false).length;
}

function clearInput() {
  inputs.forEach(input => input.value = '');
  bookTitle.focus();
}


