import React from 'react';
import "./AppToolbar.scss"
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle, Menu } from '@material-ui/icons';

type AppToolbarProps = {
  userName?: string;
  onUserIconClick(): void;
}
export function AppToolbar(props: AppToolbarProps) {
  return (
          <div className="main-appbar">
            <AppBar position="static" className="appbar">
            <Toolbar>
              <IconButton edge="start" className="iconButton">
                <Menu className="menu" />
              </IconButton>
              <Typography variant="h5" className="typography">
                {"Minerva"}
              </Typography>
              <IconButton 
                  onClick={() => props.onUserIconClick()}
                  className="user-btn" edge = "end"
                  color="inherit"
              >
                <AccountCircle className="accountCircle" />
                <Typography className="typography">
                  {props.userName}
                </Typography>
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
  );
}
