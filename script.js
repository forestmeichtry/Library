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
}