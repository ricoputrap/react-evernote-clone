import React from 'react';
import './App.css';
import firebase from 'firebase';
import SidebarComponent from './sidebar/sidebar.js';
import EditorComponent from './editor/editor.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  render() {
    return (
      <div className="app-container">
        <SidebarComponent 
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          addNote={this.addNote}
          deleteNote={this.deleteNote}></SidebarComponent>
        { 
          this.state.selectedNote &&
            <EditorComponent
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.state.notes}
              noteUpdate={this.noteUpdate}></EditorComponent>
        }
      </div>
    );
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      // the function that we pass into onSnapshot is going to automatically called 
      //whenever the document or something inside the `notes` collection is updated
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(doc => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        });
        console.log(notes)
        this.setState({ notes: notes });
      })
  }

  selectNote = (note, index) => {
    this.setState({ 
      selectedNoteIndex: index,
      selectedNote: note
    });
  }

  /**
   * Updates notes simultaneously to firestore
   * @param {Number} id 
   * @param {Object} note 
   */
  noteUpdate = (id, note) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  addNote = async (title) => {
    const newNote = {
      title: title,
      body: '',
    }
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        ...newNote,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    
    // adds the new note to be displayed in list of notes
    await this.setState({ notes: [...this.state.notes, newNote] });
    
    // updates the currently active editor with the new note
    const newIdFromDB = newFromDB.id;
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter(note => note.id === newIdFromDB)[0]
    );
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex
    });
  }

  deleteNote = (note) => {
    const noteId = this.state.notes.indexOf(note);

    // unselect the note to deactivate editor
    if (this.state.selectedNoteIndex === noteId) {
        this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    // re-select note to before this deleted note
    if (this.state.notes.length > 1) {
        this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1);
    }

    // delete the note in the firestore
    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
}
}

export default App;
