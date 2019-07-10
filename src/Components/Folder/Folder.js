import React from 'react';
import NoteContext from '../NoteContext/NoteContext';
import {Link} from 'react-router-dom';

class Folder extends React.Component {
  static contextType = NoteContext;
  
  displayFolder = (folder,cb) => {
    const listFolder = folder.map(data => {
      return (
        <Link 
          to={`/folder/${data.id}`}
          onClick = {(e) => cb(data.id)}><p className='folder-name'>{data.name}</p></Link>
      )
    })
    return listFolder;
  }

  displayNotes = (notes, folderId, cb, deleteNote) => {
    console.log(folderId)
    const searchNotes = notes.filter(data => data.folderId === folderId);
    const listNotes = searchNotes.map(data => {
      return (
        <li className='notes'>
            <Link to={`/note/${data.id}`} onClick={(e) => cb(data.id)}> <p>{data.name}</p></Link>
          <div className='note-date'>
            <p>{data.modified}</p>
            <button onClick={() => deleteNote(data.id)}>Delete Note</button>
          </div>
        </li>
      )
    })
    return listNotes;
  }
  
  
  render() {
    const {folder, clickFolder, folderId, notes, clickNote, deleteNote} = this.context;
    console.log(notes)
    return (
      <>
        <div className='folder-container'>
          <ul>{this.displayFolder(folder, clickFolder)}</ul>
        </div>
        <div className='note-container'>
          <ul>
            {this.displayNotes(notes, folderId, clickNote, deleteNote)}
          </ul>
        </div>
      </>
    )
  }
}

export default Folder;