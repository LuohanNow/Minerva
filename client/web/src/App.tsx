import { Button, Grid } from '@material-ui/core';
import React from 'react';

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
      </Grid>
      </div>
    </div>
  );
}

export default App;
