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

addBookToLibrary('Lord of the Rings', 'J.R.R. Tolkien');
addBookToLibrary('Lord of the Flies', 'William Golding');

// Adds card to screen for each book in array
for (book of bookArray) {
    let newItem = document.createElement('div');
    newItem.innerHTML = `Title: ${book.title}, Author: ${book.author}`
    newItem.classList.add('bookCard');
    library.appendChild(newItem);
}