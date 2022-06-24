import React from "react";

const Note = (props) => {
  const { deleteItem } = props;
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={() => {
          deleteItem(props.id);
        }}
      >
        DELETE
      </button>
    </div>
  );
};

export default Note;
