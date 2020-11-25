import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebarItem/sidebarItem';


class SidebarComponent extends React.Component {
    constructor() {
        super();
    }

    render () {
        const { classes, notes, selectedNoteIndex } = this.props;

        return (
            <div className={classes.sidebarContainer}>
                <Button
                    className={classes.newNoteBtn}
                    onClick={this.newNoteBtnClick}>New Note</Button>
            </div>
        );
    }

    newNoteBtnClick = () => {
        console.log("CLICKED")
    }
}

export default withStyles(styles)(SidebarComponent);