import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Grid, TextField } from '@material-ui/core';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  handleIncrement = () => {
    var oldCount = this.state.count;
    this.setState({ count: oldCount + 1 });
    axios.get('http://localhost:8983/solr/texas_restaurants/select?indent=on&q=zipcode:78750').then(response => console.log(response))
  }

  handleDecrement = () => {
    var oldCount = this.state.count;
    this.setState({ count: oldCount - 1 });
  }

  render() {
    return ( 
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>


          <Grid container justify={'center'} spacing={16}>
            <Grid item xs={3}>
              <Button
                fullWidth={true}
                variant={'contained'}
                color={'secondary'}
                onClick={this.handleIncrement}
              >
                {"Increment"}
              </Button>
            </Grid>
            <Grid item xs={2}>
              <TextField 
                value={this.state.count}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth={true}
                variant={'contained'}
                color={'secondary'}
                onClick={this.handleDecrement}
              >
                {"Decrement"}
              </Button>
            </Grid>
          </Grid>
        </header>
      </div>
    );
  }
}

export default App;
