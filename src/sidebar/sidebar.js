import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebarItem/sidebarItem';


class SidebarComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            addingNote: false,
            title: null
        }
    }

    render () {
        const { classes, notes, selectedNoteIndex } = this.props;

        if (notes) {
            return (
                <div className={classes.sidebarContainer}>
                    <Button
                        className={classes.newNoteBtn}
                        onClick={this.newNoteBtnClick}>
                        {this.state.addingNote ? 'Cancel' : 'New Note'}
                    </Button>
                    { this.state.addingNote && (
                        <div>
                            <input type="text"
                                className={classes.newNoteInput}
                                placeholder='Enter note title'
                                onKeyUp={ e => this.updateTitle(e.target.value) } />
                            <Button
                                className={classes.newNoteSubmitBtn}
                                onClick={this.addNote}>
                                Submit Note
                            </Button>
                        </div>
                    )}
                    <List>
                        {
                            notes.map((note, index) => {
                                return (
                                    <div key={index}>
                                        <SidebarItemComponent
                                            note={note}
                                            index={index}
                                            selectedNoteIndex={selectedNoteIndex}
                                            selectNote={this.selectNote}
                                            deleteNote={this.deleteNote} />
                                        <Divider />
                                    </div>
                                )
                            })
                        }
                    </List>
                </div>
            );
        }
        else {
            return (<div></div>)
        }
        
    }

    newNoteBtnClick = () => {
        this.setState({
            title: null,
            addingNote: !this.state.addingNote,
        })
    }

    updateTitle = (txt) => {
        this.setState({ title: txt })
    }

    addNote = () => {
        this.props.addNote(this.state.title)
        this.setState({ addingNote: false })
    }

    selectNote = (note, index) => this.props.selectNote(note, index);

    deleteNote = (note) => this.props.deleteNote(note);
}

export default withStyles(styles)(SidebarComponent);