import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Draggable } from "react-beautiful-dnd";

function Note(props) {
  function handleClick() {
    props.onDelete(props.index,props.section);
  }
  const { id ,index } = props;
  // var check = id%2;
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div className="note"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}>

          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={handleClick}>
            <DeleteIcon />
          </button>
        </div>
      )}

    </Draggable>


  );
}

export default Note;
