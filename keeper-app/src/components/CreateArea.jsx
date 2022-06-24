import React from "react";

function CreateArea(props) {
  const {
    addNote,
    newNoteTitle,
    newNoteContent,
    handleTitleChange,
    handleContentChange,
  } = props;

  return (
    <div>
      <form>
        <input
          name="title"
          placeholder="Title"
          value={newNoteTitle}
          onChange={handleTitleChange}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={newNoteContent}
          onChange={handleContentChange}
        />
        <button onClick={addNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
