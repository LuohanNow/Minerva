import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Paper, PaperProps } from '@material-ui/core';
import React from 'react';
import Draggable from 'react-draggable';
import {Person} from '@material-ui/icons';
import "./AuthModal.scss"
import { User } from '../../models/User';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

type AuthModalProps = {
  users: Array<User>;
  onUserItemClick(user: User): void;
  isOpen: boolean;
}

export function AuthModal(props: AuthModalProps) {
  return (
    <div className="auth-modal">
       <Dialog
        className="dialog"
        open={props.isOpen}
        PaperComponent={PaperComponent}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {"Выполнение входа в систему"}
        </DialogTitle>
        <DialogContent>
          <List>
            {props.users.map((user) => (
              <ListItem button onClick={() => props.onUserItemClick(user)} key={user.id}>
                <ListItemAvatar>
                  <Avatar >
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
        </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}
