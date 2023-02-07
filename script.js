const library = document.getElementById('library');
let bookArray = [];
let startIndex = 0;
let displayLength = 3;

// Book object constructor
function Book(title, author, pages, summary) {
    this.title = title;
    this.author = author;
    this.pageCount = pages;
    this.summary = summary;
}

function submitNewBook(event) {
    event.preventDefault();
    addBookToLibrary(
        titleField.value,
        authorField.value,
        pagesField.value,
        summaryField.value
    );
}

// Creates a book and adds it to the book array
function addBookToLibrary(title, author, pageCount, summary) {
    let newBook = new Book(title, author);
    bookArray.push(newBook);

    // Automatically adds book to display if there is space
    if (bookArray.length <= displayLength) {
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
        titleField.innerHTML = newBook.title;
        bookTop.appendChild(titleField);

        let authorField = document.createElement('span');
        authorField.innerHTML = newBook.author;
        bookTop.appendChild(authorField);
        
        let bookSide = document.createElement('div');
        bookSide.classList.add('bookSide');
        bookCover.appendChild(bookSide);

        let bookInfo = document.createElement('div');
        bookInfo.classList.add('bookInfo');
        card.appendChild(bookInfo);

        let infoTitle = document.createElement('span');
        infoTitle.classList.add('infoTitle');
        infoTitle.innerHTML = newBook.title;
        bookInfo.appendChild(infoTitle);

        let infoAuthor = document.createElement('span');
        infoAuthor.classList.add('infoAuthor');
        infoAuthor.innerHTML = 'by ' + newBook.author;
        bookInfo.appendChild(infoAuthor);
    }
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

addBookToLibrary('Lord of the Rings', 'J.R.R. Tolkien', 1137, "The Lord of the Rings is the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil. Its many worlds and creatures were drawn from Tolkien's extensive knowledge of philology and folklore.");
addBookToLibrary('Lord of the Flies', 'William Golding', 224, "William Golding's 1954 novel 'Lord of the Flies' tells the story of a group of young boys who find themselves alone on a deserted island. They develop rules and a system of organization, but without any adults to serve as a civilizing impulse, the children eventually become violent and brutal.");

const buttonArea = document.getElementById('buttonArea');
const formArea = document.getElementById('formArea');
const newBookButton = document.getElementById('newBookButton');
const hideFormButton = document.getElementById('hideFormButton');
newBookButton.addEventListener('click', displayForm);
hideFormButton.addEventListener('click', hideForm);

const titleField = document.getElementById('title');
const authorField = document.getElementById('author');
const pagesField = document.getElementById('pages');
const summaryField = document.getElementById('summary');
const submitButton = document.getElementById('submitBookButton');
submitButton.addEventListener('click', submitNewBook);