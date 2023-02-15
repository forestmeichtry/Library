const library = document.getElementById('library');
let bookArray = [];
let centerIndex = 1;

library.addEventListener('wheel', (event) => {
    event.preventDefault;
    if (event.deltaY < 0 && centerIndex > 1) {
        bookArray[centerIndex - 2].card.dataset.position = 'left';
        bookArray[centerIndex - 1].card.dataset.position = 'middle';
        bookArray[centerIndex].card.dataset.position = 'right';
        bookArray[centerIndex + 1].card.dataset.position = 'offscreenRight';
        centerIndex -= 1;
    } else if (event.deltaY > 0 && centerIndex + 2 < bookArray.length) {
        bookArray[centerIndex + 2].card.dataset.position = 'right';
        bookArray[centerIndex + 1].card.dataset.position = 'middle';
        bookArray[centerIndex].card.dataset.position = 'left';
        bookArray[centerIndex - 1].card.dataset.position = 'offscreenLeft';
        centerIndex += 1;
    }
});

const buttonArea = document.getElementById('buttonArea');
const formArea = document.getElementById('formArea');
const newBookButton = document.getElementById('newBookButton');
const hideFormButton = document.getElementById('hideFormButton');
newBookButton.addEventListener('click', displayForm);
hideFormButton.addEventListener('click', hideForm);

function displayForm() {
    buttonArea.classList.add('shiftUp');
    formArea.classList.add('shiftUp');
}

function hideForm(event) {
    if (event) {
        event.preventDefault();
    }

    buttonArea.classList.remove('shiftUp');
    formArea.classList.remove('shiftUp');
}

const titleField = document.getElementById('title');
const authorField = document.getElementById('author');
const pagesField = document.getElementById('pages');
const summaryField = document.getElementById('summary');
const submitButton = document.getElementById('submitBookButton');
submitButton.addEventListener('click', submitNewBook);

function submitNewBook(event) {
    event.preventDefault();
    addToLibrary(
        titleField.value,
        authorField.value,
        pagesField.value,
        summaryField.value
    );

    titleField.value = '';
    authorField.value = '';
    pagesField.value = '';
    summaryField.value = '';

    hideForm();
}

// Book object constructor
function Book(title, author, pages, summary) {
    this.title = title;
    this.author = author;
    this.pageCount = pages;
    this.summary = summary;
    this.card;
}

// Creates a book and adds it to the book array
function addToLibrary(title, author, pageCount, summary) {
    let newBook = new Book(title, author, pageCount, summary);
    bookArray.push(newBook);
    let bookIndex = bookArray.length - 1;

    // Add bookCard to DOM
    let card = document.createElement('div');
    card.classList.add('bookCard');
    newBook.card = card;
    library.appendChild(card);

    card.addEventListener('click', toggleInfo);

    function toggleInfo() {
        if (!card.classList.contains('expandedInfo')) {
            card.classList.add('expandedInfo');
        } else {
            card.classList.remove('expandedInfo');
        }
    }

    let closeButton = document.createElement('div');
    closeButton.classList.add('close');
    closeButton.dataset.index = bookIndex;
    newBook.closeButton = closeButton;
    card.appendChild(closeButton);
    closeButton.addEventListener('click', deleteFromLibrary);

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

    for (let i = 1; i < 4; i++) {
        let upChevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        upChevron.setAttribute("aria-hidden","true");
        upChevron.setAttribute('viewbox', '0 0 24 24');

        path.setAttribute('d', "M 12,9.33 17.295,14.705 18,14 12,8 l -6,5.9995 0.705,0.705 z");

        upChevron.appendChild(path);
        upChevron.classList.add('upChevron', `chev${i}`);
        bookInfo.appendChild(upChevron);
    }

    let infoTitle = document.createElement('span');
    infoTitle.classList.add('infoTitle');
    infoTitle.innerHTML = newBook.title;
    bookInfo.appendChild(infoTitle);

    let infoAuthor = document.createElement('span');
    infoAuthor.classList.add('infoAuthor');
    infoAuthor.innerHTML = 'by ' + newBook.author;
    bookInfo.appendChild(infoAuthor);

    let infoSummary = document.createElement('span');
    infoSummary.classList.add('infoSummary');
    infoSummary.innerHTML = newBook.summary;
    bookInfo.appendChild(infoSummary);

    switch (bookIndex) {
        case 0:
            card.dataset.position = 'left';
            break;
        case 1:
            card.dataset.position = 'middle';
            break;
        case 2:
            card.dataset.position = 'right';
            break;
        default:
            card.dataset.position = 'offscreenRight';
    }
}

function deleteFromLibrary() {
    let index = parseInt(this.dataset.index);
    let card = bookArray[index].card;
    let position = card.dataset.position;
    let displayStart;

    switch (position) {
        case 'left':
            displayStart = index;
            break;
        case 'middle':
            displayStart = index - 1;
            break;
        case 'right':
            displayStart = index - 2;
            break;
    }
    displayStart = parseInt(displayStart);

    while (card.hasChildNodes()) {
        card.removeChild(card.firstChild);
    }
    card.remove();

    bookArray.splice(index, 1);
    
    for (let i = index; i < bookArray.length; i++) {
        bookArray[i].closeButton.dataset.index = i;

        if (i === displayStart) {
            bookArray[i].card.dataset.position = 'left';
        } else if (i === displayStart + 1) {
            bookArray[i].card.dataset.position = 'middle';
        } else if (i === displayStart + 2) {
            bookArray[i].card.dataset.position = 'right';
        }
    }
}

addToLibrary('Lord of the Rings', 'J.R.R. Tolkien', 1137, "The Lord of the Rings is the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil. Its many worlds and creatures were drawn from Tolkien's extensive knowledge of philology and folklore.");
addToLibrary('Lord of the Flies', 'William Golding', 224, "William Golding's 1954 novel 'Lord of the Flies' tells the story of a group of young boys who find themselves alone on a deserted island. They develop rules and a system of organization, but without any adults to serve as a civilizing impulse, the children eventually become violent and brutal.");
addToLibrary('Lord of the Rings', 'J.R.R. Tolkien', 1137, "The Lord of the Rings is the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil. Its many worlds and creatures were drawn from Tolkien's extensive knowledge of philology and folklore.");
addToLibrary('Lord of the Flies', 'William Golding', 224, "William Golding's 1954 novel 'Lord of the Flies' tells the story of a group of young boys who find themselves alone on a deserted island. They develop rules and a system of organization, but without any adults to serve as a civilizing impulse, the children eventually become violent and brutal.");
addToLibrary('Lord of the Rings', 'J.R.R. Tolkien', 1137, "The Lord of the Rings is the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil. Its many worlds and creatures were drawn from Tolkien's extensive knowledge of philology and folklore.");
addToLibrary('Lord of the Flies', 'William Golding', 224, "William Golding's 1954 novel 'Lord of the Flies' tells the story of a group of young boys who find themselves alone on a deserted island. They develop rules and a system of organization, but without any adults to serve as a civilizing impulse, the children eventually become violent and brutal.");

centerView('middle');