import React from 'react';
import './App.css';
import {Link, Route, Switch} from 'react-router-dom';
import Main from './Components/Main-page/Main';
import NoteContext from './Components/NoteContext/NoteContext';
import Folder from './Components/Folder/Folder'
import Note from './Components/Note/Note'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      folder: [],
      folderId: '',
      notes: [],
      deleteComplete: false
    }
  }

  fetchFolderData() {
    fetch('http://localhost:9090/folders')
      .then(res => {
        if(!res.ok) {
          alert('error')
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({folder: data})

      })
      .catch(err => alert(err))
  }

  fetchNoteData() {
    fetch('http://localhost:9090/notes')
      .then(res => {
        if(!res.ok) {
          alert('error')
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({notes: data})

      })
      .catch(err => alert(err))
  }

  componentDidMount() {
    this.fetchFolderData()
    this.fetchNoteData()
  }
  
  clickFolder = (e) => {
    this.setState({
      folderId: e
    })
  }

  clickNote = (e) => {
    this.setState({
      noteId: e
    })
  }
  
  deleteNote = (e) => {
    const newNote =this.state.notes.filter(data => data.id !== e)
    this.setState({
      notes: newNote,
      deleteComplete: true
    })
  }
  
  render() {
    
    const contextValue = {
      folder: this.state.folder,
      clickFolder: this.clickFolder,
      notes: this.state.notes,
      folderId: this.state.folderId,
      clickNote: this.clickNote,
      noteId: this.state.noteId,
      deleteNote: this.deleteNote,
      deleteComplete: this.state.deleteComplete
    }
    console.log(this.state.notes);
    return (
      <div className="App">
        <header>
          <h1>
            <Link to='/'>Noteful</Link>
          </h1>
        </header>
        <main>
          <NoteContext.Provider value={contextValue}>
            <Route 
              exact path='/'
              component={Main}>
            </Route>
            <Route
              path='/folder/:folderId'
              component={Folder}></Route>
            <Route
              path='/note/:noteId'
              component={Note}></Route>
          </NoteContext.Provider>
        </main>

      </div>
    )}
}

export default App;
