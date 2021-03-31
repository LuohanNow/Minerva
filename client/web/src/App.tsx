import { Button, Grid } from '@material-ui/core';
import React from 'react';
import Vditor from 'vditor'
import "vditor/src/assets/scss/index.scss"

const e = React.createElement
class MarkdownEditor extends React.Component {

  componentDidMount () {
    const vditor = new Vditor('vditor', {
      height: 360,
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
      after () {
        vditor.setValue('Hello, Vditor + React!')
      },
    })
  }

  render () {
    return e(
      'div',
      {id: 'vditor'},
    )
  }
}

function App() {
  return (
    <div className="App">
      <div> 
      <Grid container>
        <Grid item xs={1}>
          {"Happy coding :)"}
        </Grid>
        <Grid item xs={1}>
          <Button 
              variant="contained" 
              color="secondary">
              {"Let`s go!"}
          </Button>
        </Grid>
        <Grid item xs={6}>
        <MarkdownEditor />
        </Grid>
      </Grid>
      </div>
    </div>
  );
}

export default App;
