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
          notes={this.state.notes}></SidebarComponent>
        <EditorComponent></EditorComponent>
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
}

export default App;
