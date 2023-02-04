const library = document.getElementById('library');
let bookArray = [];

// Book object constructor
function Book(title, author) {
    this.title = title;
    this.author = author;
}

// Creates a book and adds it to the book array
function addBookToLibrary(title, author) {
    let newBook = new Book(title, author);
    bookArray.push(newBook);
}

function displayForm() {
    buttonArea.classList.add('shiftUp');
    formArea.classList.add('shiftUp');
}

function hideForm(event) {
    event.preventDefault();
    buttonArea.classList.remove('shiftUp');
    formArea.classList.remove('shiftUp');
}

addBookToLibrary('Lord of the Rings', 'J.R.R. Tolkien');
addBookToLibrary('Lord of the Flies', 'William Golding');

const buttonArea = document.getElementById('buttonArea');
const formArea = document.getElementById('formArea');
const newBookButton = document.getElementById('newBookButton');
const hideFormButton = document.getElementById('hideFormButton');
newBookButton.addEventListener('click', displayForm);
hideFormButton.addEventListener('click', hideForm);

// Adds card to screen for each book in array
for (book of bookArray) {
    let card = document.createElement('div');
    card.classList.add('bookCard');
    library.appendChild(card);

    let bookCover = document.createElement('div');
    bookCover.classList.add('bookCover');
    card.appendChild(bookCover);

    let bookTop = document.createElement('div');
    bookTop.classList.add('bookTop');
    bookCover.appendChild(bookTop);

    let titleField = document.createElement('span');
    titleField.innerHTML = book.title;
    bookTop.appendChild(titleField);

    let authorField = document.createElement('span');
    authorField.innerHTML = book.author;
    bookTop.appendChild(authorField);
    
    let bookSide = document.createElement('div');
    bookSide.classList.add('bookSide');
    bookCover.appendChild(bookSide);

    let bookInfo = document.createElement('div');
    bookInfo.classList.add('bookInfo');
    card.appendChild(bookInfo);

    let infoTitle = document.createElement('span');
    infoTitle.classList.add('infoTitle');
    infoTitle.innerHTML = book.title;
    bookInfo.appendChild(infoTitle);

    let infoAuthor = document.createElement('span');
    infoAuthor.classList.add('infoAuthor');
    infoAuthor.innerHTML = 'by ' + book.author;
    bookInfo.appendChild(infoAuthor);
}