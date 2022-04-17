let addNote = document.getElementById("add-btn");
let addTitle = document.getElementById("note-heading");
let addText = document.getElementById("note-text");
let delAll = document.getElementById("add-btn2");
addNote.addEventListener("click", function (e) {
  console.log("hello");
  if (addText.value == "" || addTitle.value == "") {
    return alert("field cannot be empty");
  }
  //   to get item from the local storage
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    //   to convert to an object,so as to push myObj
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addText.value,
  };
  notesObj.push(myObj);
  // to save the item to local storage
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addText.value = "";
  addTitle.value = "";
  // function to refresh
  showNotes();
});
// to show notes

function showNotes() {
  let notes = localStorage.getItem("notes");
  //   let notesObj;
  if (notes == null) {
    notesObj = [];
  } else {
    //   to convert to an object
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
       <div id="note">
            <p class="note-counter">Note ${index + 1}</p>
            <h3 class="note-title">${element.title}</h3>
            <p class="note-text">${element.text}</p>
            <button id ="${index}" onclick="deleteNote(this.id)" class="note-btn">Delete Note</button>
            <button  id ="${index}" onclick="editNote(this.id)" class="note-btn edit-btn">Edit Note</button>
           </div><hr />
       
       `;
  });
  let noteEl = document.querySelector("#notes");
  if (notesObj.length != 0) {
    noteEl.innerHTML = html;
  } else {
    noteEl.innerHTML = "no notes yet";
  }
}
// delete note
function deleteNote(index) {
  let confirmDel = confirm("You are deleting this note");
  if (confirmDel == true) {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
      notesObj = [];
    } else {
      // to convert to an object
      notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }
}
// edit note
function editNote(index) {
  let notes = localStorage.getItem("notes");
  if (addText.value !== "" || addTitle.value !== "") {
    return alert("Please clear the form before editing the note");
  }
  if (notes == null) {
    notesObj = [];
  } else {
    //   to convert to an object
    notesObj = JSON.parse(notes);
  }
  notesObj.findIndex(function (element, index) {
    addTitle.value = element.title;
    addText.value = element.text;
  });
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
// delete all note
delAll.addEventListener("click", function (e) {
  let notes = localStorage.getItem("notes")
  if (notes == null) {
    notesObj = [];
  } else {
    //   to convert to an object
    notesObj = JSON.parse(notes);
  }
  localStorage.removeItem("notes", JSON.stringify(notesObj));
  showNotes();
});

showNotes();
