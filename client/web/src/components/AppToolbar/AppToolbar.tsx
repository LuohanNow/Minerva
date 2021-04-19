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
            <AppBar color="primary" position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit">
                <Menu />
              </IconButton>
              <Typography variant="h5" >
                {"Minerva"}
              </Typography>
              <IconButton 
                  onClick={() => props.onUserIconClick()}
                  className="user-btn" edge = "end"
                  color="inherit"
              >
                <AccountCircle />
                <Typography>
                  {props.userName}
                </Typography>
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
  );
}
