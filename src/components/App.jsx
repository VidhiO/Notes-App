import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function App() {
  const [notes, setNotes] = useState([]);
  const [todo, setTodo] = useState([]);
  const [rem, setRem] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
    console.log(notes);
  }

  function deleteNote(id,sec) {
    if(sec==='notes'){
      setNotes(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });
    }

    else if(sec==='todo'){
      setTodo(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });
    }
    else if(sec==='reminder'){
      setRem(prevNotes => {
        return prevNotes.filter((noteItem, index) => {
          return index !== id;
        });
      });
    }
    
  }
const onDragEnd = (result) => {
  
  const{source , destination} = result;
  let add ,
  sec1 = notes ,
  sec2 = todo ,
  sec3 = rem 

  if (!destination) return;

  if(destination.droppableId===source.droppableId 
    &&
    destination.index===source.index ) 
    return;


  if(source.droppableId==='notes' && destination.droppableId==='todo'){
       add=sec1[source.index];
       add.section = destination.droppableId;
       sec1.splice(source.index, 1);
       sec2.splice(destination.index,0,add);
     }
  
  else if(source.droppableId==='notes' && destination.droppableId==='reminder'){
      add=sec1[source.index];
      add.section = destination.droppableId;
      sec1.splice(source.index, 1);
      sec3.splice(destination.index,0,add);
    }

  else if(source.droppableId==='todo' && destination.droppableId==='notes'){
      add=sec2[source.index];
      add.section = destination.droppableId;
      sec2.splice(source.index, 1);
      sec1.splice(destination.index,0,add);
    }

    else if(source.droppableId==='todo' && destination.droppableId==='reminder'){
      add=sec2[source.index];
      add.section = destination.droppableId;
      sec2.splice(source.index, 1);
      sec3.splice(destination.index,0,add);
    }

    else if(source.droppableId==='reminder' && destination.droppableId==='notes'){
      add=sec3[source.index];
      add.section = destination.droppableId;
      sec3.splice(source.index, 1);
      sec1.splice(destination.index,0,add);
    }

    else if(source.droppableId==='reminder' && destination.droppableId==='todo'){
      add=sec3[source.index];
      add.section = destination.droppableId;
      sec3.splice(source.index, 1);
      sec2.splice(destination.index,0,add);
    }

     //main functionality of drag and drop
  // add = active[source.index];
  // add.section = destination.droppableId;
  // active.splice(source.index,1);
  // active.splice(destination.index,0,add);
  
  setNotes(sec1);
  setTodo(sec2);
  setRem(sec3);

}
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="main-area">
          
            <Droppable droppableId="notes">
            {(provided) => (
              <div className="notes-section" 
              ref={provided.innerRef} 
              {...provided.droppableProps}>
                <h3>Notes Section</h3>
                
                {
                  notes
                    // .filter((noteItem, i) => noteItem.section === "notes")
                    .map((noteItem, index) => {
                      return (
                        <Note
                          key={noteItem.title}
                          id={noteItem.title}
                          index={index}
                          section={noteItem.section}
                          title={noteItem.title}
                          content={noteItem.content}
                          onDelete={deleteNote}
                        />
                      );
                    })}
                    {provided.placeholder}
              </div>
            )}

          </Droppable>

          <Droppable droppableId="todo">
            {(provided) => (
              <div className="todo-section" 
              ref={provided.innerRef} 
              {...provided.droppableProps}>
                <h3>To Do Section</h3>
                {
                  todo
                    // .filter((noteItem, i) => noteItem.section === "todo")
                    .map((noteItem, index) => {
                      return (
                        <Note
                          key={noteItem.title}
                          id={noteItem.title}
                          index={index}
                          section={noteItem.section}
                          title={noteItem.title}
                          content={noteItem.content}
                          onDelete={deleteNote}
                        />
                      );
                    })}
                    {provided.placeholder}
              </div>
            )}

          </Droppable>

          <Droppable droppableId="reminder">
            {(provided) => (
              <div className="reminder-section" 
              ref={provided.innerRef} 
              {...provided.droppableProps}>
                <h3>Reminder Section</h3>
                {
                  rem
                    // .filter((noteItem, i) => noteItem.section === "reminder")
                    .map((noteItem, index) => {
                      return (
                        <Note
                          key={noteItem.title}
                          id={noteItem.title}
                          index={index}
                          section={noteItem.section}
                          title={noteItem.title}
                          content={noteItem.content}
                          onDelete={deleteNote}
                        />
                      );
                    })}
                    {provided.placeholder}
              </div>
            )}

          </Droppable>
        </div>

      </DragDropContext>

      <Footer />
    </div >
  );
}

export default App;




  //console.log(active[source.index].section);

  // if(source.droppableId==='notes'){
  //   add=active[source.index];
  //   active.splice(source.index, 1);
  // }

  // else if(source.droppableId==='todo'){
  //   add=active[source.index];
  //   active.splice(source.index, 1);
  // }

  // else if(source.droppableId==='reminder'){
  //   add=active[source.index];
  //   active.splice(source.index, 1);
  // }
  
  // if(destination.droppableId==='todo'){
  //   active.splice(destination.source , 0 , add);
  // }
  // else if(destination.droppableId==='notes'){
  //   active.splice(destination.source , 0 , add);
  // }
  // else if(destination.droppableId==='reminder'){
  //   active.splice(destination.source , 0 , add);
  // }