//global form object
var libraryForm = document.getElementById('form');
class Book {
    //constructor
    constructor(title, author, genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
    }

    //add Book data
    addBook() {
        addDataToLocalStorage(this);
    }

    //remove book data
    removeBook() {

    }
    //validate Book object
    validate() {
        if (this.title.length < 1 || this.author.length < 1) {
            return false;
        }
        return true;
    }



};

//add the data to local storage
function addDataToLocalStorage(_bookObject) {
    let books = localStorage.getItem('books');
    let oldBooks;
    if (books) {
        oldBooks = JSON.parse(books); //parse data from local storage
    } else {
        oldBooks = [];
    }
    oldBooks.push(_bookObject);

    localStorage.setItem('books', JSON.stringify(oldBooks));
    Display.loadDataCards(oldBooks);

};

//Display function for window screen
class Display {

    //clear out the form
    static clear() {
        libraryForm.reset()
    }

    //send alerts to the user if form submitted succesffuly or with error
    static show(type, message) {
        let divAlert = document.getElementById('alertMessage');
        divAlert.innerHTML = `  <div class="alert alert-${type} alert-dismissible fade show" role="alert">
       <strong>Message !</strong> ${message}.
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>`;


        //fade away message from 2 sec
        setTimeout(() => {
            divAlert.innerHTML = ``;
        }, 2000);

    }

    //load the table with data from storage
    static loadDataCards(_bookArray) {
        let tableBody = document.getElementById('tableBody');
        let html='';
        if(_bookArray.length>0){
        _bookArray.forEach((book,index) => {
             html+=` <tr>    
             <td>${book.title}</td>
             <td>${book.author}</td>
             <td>${book.genre}</td>
             <td><button  type="button" class="btn-close btn-close-red" aria-label="Close" id="${index}" onclick="deleteBook(this.id)"></button></td>
             </tr>`;
        });
    }
    else{
        html+='';
    }
        tableBody.innerHTML = html;
    }
};

function deleteBook(_bookID){
    console.log('deleting')
    let books = localStorage.getItem('books');
    let oldBooks;
    if (books) {
        oldBooks = JSON.parse(books); //parse data from local storage
    } else {
        oldBooks = [];
    }
     
    oldBooks.splice(_bookID,1);
    localStorage.setItem('books', JSON.stringify(oldBooks));
    Display.loadDataCards(oldBooks);
}
//Add new book and show alerts
function libraryFormSubmit(event) {

    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let getGenres = document.getElementsByName('genre');
    let genre
    Array.from(getGenres).forEach(element => {
        if (element.checked) {
            genre = element.value;
        }
    });
    let newBook = new Book(title, author, genre);

    if (newBook.validate()) {
        newBook.addBook();
        Display.show('success', 'Book added successfully');
    } else {
        Display.show('danger', 'Sorry enter a valid book');
    }
    Display.clear();
    event.preventDefault();
}


//add listener to Library form
libraryForm.addEventListener('submit', libraryFormSubmit);

//on window load display  items if any

window.onload=(event)=>{
    let books = localStorage.getItem('books');
    let oldBooks;
    if (books) {
        oldBooks = JSON.parse(books); //parse data from local storage
    } else {
        oldBooks = [];
    }
    Display.loadDataCards(oldBooks);
}