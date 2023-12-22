
// <!-****************** Assign Global variables *****************-!>

var bookNameInput = document.getElementById("bookNameInput");
var bookUrlInput = document.getElementById("bookUrlInput");
var messageName = document.getElementById("messageName");
var messageUrl = document.getElementById("messageUrl");
var errorMessage = document.getElementById("errorMessage");
var exit = document.getElementById("exit");
var bookList = [];

// <!-***************** Set date in localStorage *****************-!>

if (localStorage.getItem("books") != null) {
  bookList = JSON.parse(localStorage.getItem("books"));
  showData();
} else {
  bookList = [];
}

// <!-******************* Add the Book Function *****************-!>

function addBook() {
  if (validationBookName() == true && validationBookUrl() == true) {
    var books = {
      name: bookNameInput.value,
      url: bookUrlInput.value,
    };
    bookList.push(books);
    localStorage.setItem("books", JSON.stringify(bookList));
    showData();
    clearForm();
  } else {
    errorMessage.classList.remove("d-none");
  }
}

// <!-******************* display Data function *******************-!>
function showData() {
  var trs = "";
  for (var i = 0; i < bookList.length; i++) {
    trs += `
    <tr>
    <td>${i}</td>
    <td>${bookList[i].name}</td>
    <td>
    <button onclick="visitUrl(${i})" class="btn btn-visit">
     <span><i class="fa-solid fa-eye pe-2"></i></span> visit
     </button>
    </td>
    <td>
     <button onclick="deleteItem(${i})" class="btn btn-danger">
     <span><i class="fa-solid fa-trash-can"></i></span> Delete
      </button>
     </td>
    </tr>`;
  }
  document.getElementById("tablebody").innerHTML = trs;
}

// <!-******************* Clear Input Function ******************-!>
function clearForm() {
  bookNameInput.value = "";
  bookUrlInput.value = "";
  messageName.classList.add("d-none");
  bookNameInput.classList.remove("is-invalid");
  bookNameInput.classList.remove("is-valid");
  messageUrl.classList.add("d-none");
  bookUrlInput.classList.remove("is-invalid");
  bookUrlInput.classList.remove("is-valid");
}

// <!-********************* Delete Function *********************-!>
function deleteItem(index) {
  bookList.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(bookList));
  showData();
}

// <!-********************* Visit Functoin  *********************-!>
function visitUrl(index) {
  window.open(bookList[index].url, "_blank");
}
// <!-************** Validation of the Book Name Function *************-!>
function validationBookName() {
  var bookNameTxt = bookNameInput.value;
  var regexName = /^[A-Z][a-z]{4,10}$/;
  if (regexName.test(bookNameTxt) == true) {
    bookNameInput.classList.add("is-valid");
    bookNameInput.classList.remove("is-invalid");
    messageName.classList.add("d-none");
    return true;
  } else {
    bookNameInput.classList.add("is-invalid");
    bookNameInput.classList.remove("is-valid");
    messageName.classList.remove("d-none");
    return false;
  }
}
// <!-*************** Validation of the Book Url Function *************-!>

function validationBookUrl() {
  var urltxt = bookUrlInput.value;
  var urlregex =
    /^http(s?)(:\/\/)((www.)?)(([^.]+)\.)?([a-zA-z0-9\-_]+)(.com|.net|.gov|.org|.in)(\/[^\s]*)?$/;

  if (urlregex.test(urltxt) == true) {
    bookUrlInput.classList.add("is-valid");
    bookUrlInput.classList.remove("is-invalid");
    messageUrl.classList.add("d-none");
    return true;
  } else {
    bookUrlInput.classList.add("is-invalid");
    bookUrlInput.classList.remove("is-valid");
    messageUrl.classList.remove("d-none");
  }
}
// <!-************** the ways to close the Validation Message **************-!>

// 1 =======> click at close button
exit.addEventListener("click", function () {
  errorMessage.classList.add("d-none");
});

// 2 =======> click at Esc key
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    errorMessage.classList.add("d-none");
  }
});

// 3 =======> clicking outside modal
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("error-message")) {
    errorMessage.classList.add("d-none");
  }
});
