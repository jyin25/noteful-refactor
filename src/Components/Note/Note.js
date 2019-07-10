import React from 'react';
import Notecontext from '../NoteContext/NoteContext';
import './Note.css';
import {Link} from 'react-router-dom'

class Note extends React.Component {
  static contextType = Notecontext;

  // displayGoBack() {

  // }


  deleteFunction = (id, deleteComplete, deleteNote, history) => {
    console.log(deleteNote)
    // deleteNote(id)
    // return (deleteComplete && history.push('/'))
  }

  displayNoteInfo(notes, noteId, deleteNote, deleteComplete, history) {
    const filterNotes = notes.find(data => data.id === noteId);
    return (
      <>
        <div className='notes'>
          <p>{filterNotes.name}</p>
          <div className='note-date'>
            <p>{filterNotes.modified}</p>
            {/* <button onClick={() => this.deleteFunction(filterNotes.id, deleteComplete, deleteNote, history)}>Delete Note</button> */}
            <Link to='/'><button onClick={() => deleteNote(filterNotes.id)}>Delete Note</button></Link>
          </div>
        </div>
        <p>{filterNotes.content}</p>
      </>
    )
  }

  goBack(history) {
    return <button onClick={() => history.goBack()} className='go-back'>Go Back </button>
  }

  render() {
    const {notes, noteId, deleteNote, deleteComplete} = this.context
    const {history} = this.props
    return (
      <>
        <div className='folder-container'>
          {this.goBack(history)}
        </div>
        <div className='note-container'>
          {this.displayNoteInfo(notes, noteId, deleteNote, deleteComplete, history)}
        </div>
      </>
    )
  }
}

export default Note;