import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Grid, TextField, Typography, FormControl, Radio, 
         FormControlLabel, RadioGroup, FormLabel, Switch } from '@material-ui/core';

class App extends Component {
    constructor(props) {
        super(props);
            this.state = {
                city: '',
                zip: '',
                rating: '5',
                alcohol: false,
                errorMessage: '',
        }
    }

    handleCityChange = (event) => {
        this.setState({
            city: event.target.value
        });
    }

    handleZipChange = (event) => {
        this.setState({
            zip: event.target.value
        });
    }

    handleRatingChange = (event) => {
       this.setState({
           rating: event.target.value
       })
    }

    handleAlcoholChange = (event) => {
        this.setState({
            alcohol: !this.state.alcohol
        })
    }

    handleSubmit = () => {
        const { city } = this.state;
        if (city !== '') {
            this.setState({
                errorMessage: ''
            });
            console.log(this.state);
        } else {
            this.setState({
                errorMessage: 'Please type in a city!'
            });
        }
    }

    render() {
        return ( 
            <div className="App App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Typography 
                    component="h2" 
                    variant="h2" 
                    gutterBottom
                >
                    {'Texas Food Finder'}
                </Typography>

                <Grid container justify={'center'} spacing={16}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            color="secondary"
                            label="City"
                            value={this.state.searchValue}
                            onChange={(event) => this.handleCityChange(event)}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            color={''}
                            label="Zip Code"
                            value={this.state.searchValue}
                            onChange={(event) => this.handleZipChange(event)}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <br/>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Rating</FormLabel>
                    <RadioGroup
                        row
                        aria-label="Gender"
                        name="gender1"
                        value={this.state.rating}
                        onChange={this.handleRatingChange}
                    >
                        <FormControlLabel value="5" labelPlacement={'bottom'} control={<Radio />} label="5 Stars" />
                        <FormControlLabel value="4" labelPlacement={'bottom'} control={<Radio />} label="4 Stars" />
                        <FormControlLabel value="3" labelPlacement={'bottom'} control={<Radio />} label="3 Stars" />
                        <FormControlLabel value="2" labelPlacement={'bottom'} control={<Radio />} label="2 Stars" />
                        <FormControlLabel value="1" labelPlacement={'bottom'} control={<Radio />} label="1 Stars" />
                    </RadioGroup>
                </FormControl>

                <br />

                <FormControl component="fieldset">
                    <FormLabel component="legend">Alcohol</FormLabel>
                    <Switch
                            checked={this.state.alcohol}
                            onChange={this.handleAlcoholChange}
                            value={this.state.alcohol}
                        />
                </FormControl>

                <br/>

                <Grid container justify={'center'}>
                    <Grid item xs={1}>
                        <Button
                            fullWidth
                            variant={'contained'}
                            color={'secondary'}
                            onClick={this.handleSubmit}
                        >
                            {'Search'}
                        </Button>
                    </Grid>
                </Grid>

                {this.state.errorMessage ? 
                    <Typography 
                        component="h6" 
                        variant="h6" 
                        gutterBottom
                    >
                        {this.state.errorMessage}
                    </Typography> : null}
            </div>
        );
    }
}

export default App;
