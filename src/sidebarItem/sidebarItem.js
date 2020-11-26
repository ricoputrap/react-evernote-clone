import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete'
import { removeHTMLTags } from '../helpers';

class SidebarItemComponent extends React.Component {
    render() {
        const {note, index, selectedNoteIndex, classes} = this.props;
        return (
            <div key={index}>
                <ListItem 
                    className={classes.listItem}
                    selected={selectedNoteIndex === index}
                    alignItems='flex-start'>
                    <div 
                        className={classes.textSection}
                        onClick={() => this.selectNote(note, index)}>
                        <ListItemText 
                            primary={note.title}
                            secondary={removeHTMLTags(note.body.substring(0, 30)) + '...'}>
                        </ListItemText>
                    </div>
                    <DeleteIcon onClick={() => this.deleteNote(note)}
                        className={classes.deleteIcon} />
                </ListItem>
            </div>
        );
    }

    selectNote = (note, idx) => this.props.selectNote(note, idx);
    deleteNote = (note) => {
        if (window.confirm(`Are you sure ou want to delete: ${note.title}?`)) {
            this.props.deleteNote(note)
        }
    }
}

export default withStyles(styles)(SidebarItemComponent);