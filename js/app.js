let libraryForm = document.getElementById('form');
class Book {
    //constructor
    constructor(title, author, genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
    }
    addBook() {
        let tableBody = document.getElementById('tableBody');
        let html = `  <tr>    
                <td>${this.title}</td>
                <td>${this.author}</td>
                <td>${this.genre}</td>
                </tr>`;
        tableBody.innerHTML += html;

    }
    //validate Book object
    validate() {
        if (this.title.length < 1 || this.author.length < 1) {
            return false;
        }
        return true;
    }
    static clear() {
        libraryForm.reset()
    }

    static show(type,message) {
        let divAlert = document.getElementById('alertMessage');
        divAlert.innerHTML = `  <div class="alert alert-${type} alert-dismissible fade show" role="alert">
       <strong>Message !</strong> ${message}.
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>`;


     //fade away message from 2 sec
     setTimeout(() => {
        divAlert.innerHTML=``;
     }, 2000);

    }


};


libraryForm.addEventListener('submit', libraryFormSubmit);

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
        Book.show('success','Book added successfully');
    } else {
        Book.show('danger','Sorry enter a valid book');
    }
    Book.clear();
    event.preventDefault();
}