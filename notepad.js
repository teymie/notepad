let addNote = document.getElementById("add-btn");
let addTitle = document.getElementById("note-heading");
let addText = document.getElementById("note-text");
let delAll = document.getElementById("add-btn2");
const noteEl = document.getElementById("notes");
// getting item in the local storage and converting to object
const notes = JSON.parse(localStorage.getItem('notes') || '[]')
// fixes creating another note rather than editing the note
let isUpdate = false, updateId
addNote.addEventListener("click", function (e) {
  e.preventDefault()
  console.log("hello");
  if (addText.value == "" || addTitle.value == "") {
    return alert("field cannot be empty");
  }
 else {
    let myObj = {
      title: addTitle.value.trim(),
      text: addText.value.trim(),
    };
  if (!isUpdate) {
    
    notes.push(myObj);
  }
  else{
    // PREVENTS A NEW NOTE FROM REPLACING THE EDITED NODE
    isUpdate = false
    notes[updateId]= myObj
  }
    // to save the item to local storage and convert back to string
    localStorage.setItem("notes", JSON.stringify(notes));
    addText.value = "";
    addTitle.value = "";
    // function to refresh
    showNotes();
  }
});


function showNotes() {
  //fix duplicate notes 
  document.querySelectorAll('.note').forEach(note => note.remove())
  notes.forEach(function (element, index) {
   let html = `
       <div class="note">
            <p class="note-counter">Note ${index + 1}</p>
            <h3 class="note-title">${element.title}</h3>
            <p class="note-text">${element.text}</p>
            <button   onclick="deleteNote(${index})" class="note-btn">Delete Note</button>
            <button  class="note-btn edit-btn"  onclick="editNote(${index},'${element.title}','${element.text}')"> Edit Note</button>
            <hr/>
           </div>
       
       `;
       noteEl.insertAdjacentHTML('afterend', html)
  });

  
}
showNotes()
// delete note
function deleteNote(index) {
  let confirmDel = confirm("You are deleting this note");
  if (confirmDel == true) {
   

    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
  }
}
// edit note
function editNote(index , title , text) {
  if (addText.value !== "" || addTitle.value !== "") {
    return alert("Please clear the form before editing the note");
  }
  
  else{
    isUpdate = true
    updateId = index
    addTitle.value = title;
    addText.value = text;
    console.log(index , title , text);
  }
 
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
