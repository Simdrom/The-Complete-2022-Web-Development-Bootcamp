import React, { useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
// import notes from "../notes";
import CreateArea from "./CreateArea";

const App = () => {
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [notes, setNotes] = useState([]);

  function addNote(event) {
    event.preventDefault();
    const newNote = {
      title: newNoteTitle,
      content: newNoteContent,
    };

    console.log(`New note: ${JSON.stringify(newNote)}`);

    setNotes((prevValue) => [...prevValue, newNote]);
    console.log(`note array : ${JSON.stringify(notes)}`);
  }

  function handleTitleChange(event) {
    const newValue = event.target.value;
    setNewNoteTitle(newValue);
    console.log(newValue);
  }

  function handleContentChange(event) {
    const newValue = event.target.value;
    setNewNoteContent(newValue);
    console.log(newValue);
  }

  function deleteItem(id) {
    setNotes((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }
  return (
    <div>
      <Header />
      <CreateArea
        addNote={addNote}
        title={newNoteTitle}
        content={newNoteContent}
        handleTitleChange={handleTitleChange}
        handleContentChange={handleContentChange}
      />
      {notes.map((note, index) => (
        <Note
          key={index}
          title={note.title}
          content={note.content}
          deleteItem={deleteItem}
          id={index}
        />
      ))}
      <Footer />
    </div>
  );
};

export default App;
