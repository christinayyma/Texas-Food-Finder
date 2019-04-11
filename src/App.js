import React, {Component} from "react";


import axios from 'axios';
import logo from './cartoon-man.png';
import cactus from './cactus.png';
import flag from './texas-state-flag.png';
import sun from './sun.png';

import './App.css';
import { Button, Grid, TextField, Typography, FormControl, Radio,
         FormControlLabel, RadioGroup, FormLabel, Switch,
         ListItemText, Paper, GridList, GridListTile, FormGroup} from '@material-ui/core';
import {BrowserRouter as Router, Route, Link } from "react-router-dom";

class FoodFinder extends Component{

    constructor(props) {
        super(props);
            this.state = {
                city: '',
                zip: '',
                rating: '*',
                alcohol: false,
                categories: '',
                errorMessage: '',
                data: [],
                hasSearched: false,
                resultsLoading: false,
        }
    }

    handleCityChange = (event) => {
        this.setState({ city: event.target.value });
    }

    handleZipChange = (event) => {
        this.setState({ zip: event.target.value });
    }

    handleLocationBack = (event) => {
        this.setState({ zip: "" });
        this.setState({ city: ""});
    }

    handleRatingChange = (event) => {
       this.setState({ rating: event.target.value });
    }

    handleRatingBack = () => {
        this.setState({ rating: ""});
    }

    handleAlcoholChange = (event) => {
        this.setState({ alcohol: !this.state.alcohol });
    }

    handleAlcoholBack = () => {
        this.setState({ alcohol: ""});
    }

    handleCategoriesChange = (event) => {
        this.setState({ categories: event.target.value });
    }

    handleSubmit = () => {
        const { city, zip, rating, alcohol, categories } = this.state;
        this.setState({ hasSearched: true });
        if (city !== '') {
            this.setState({ errorMessage: '' });

            var params = new URLSearchParams();
            params.append('q', 'address:' + city);
            params.append('rows', '1000');

            if (zip !== '') {
                params.append('fq', 'zipcode:' + zip);
            }

            if (rating !== '*'){
                params.append('fq', 'rating:' + rating);
            }

            if (alcohol) {
                params.append('fq', 'categories:( Beer OR Wine OR Bar OR Bars)');
            }

            if (categories) {
                params.append('fq', 'categories: ' + categories);
            }

            this.setState({ resultsLoading: true });
            axios.get('http://localhost:8983/solr/texas_restaurants/select', { params })
                .then((response) => {
                  this.setState({ data: response.data.response.docs })
                })
                .catch(function (error) {
                  console.error(error);
                });
            this.setState({ resultsLoading: false });

        } else {
            this.setState({ data: [], errorMessage: 'Please type in a city!' });
        }
    }

    render() {
        const { Home, Location1, Location2, Category, Rating, Alcohol, Final1, Final2 } = "";

        return (
            <Router>
                <div>
                    <Route exact path="/" render={()=>{
                        return (
                            <div>
                                <img src={sun} className="App-sun" alt="sun" />
                                <div class = "Title">
                                    Texas Food Finder
                                </div>
                                <img src={cactus} className="App-cactus1" alt="cactus" />
                                <img src={cactus} className="App-cactus2" alt="cactus" />
                                <img src={cactus} className="App-cactus3" alt="cactus" />
                                <img src={flag} className="App-flag" alt="flag" />
                                <img src={logo} className="App-logo" alt="logo" />

                                <br>
                                </br>

                                <div class = "wrapper">
                                    <Link to="/location1" style = {{ textDecoration:'none'}}><Button class = "button" type = "solid" variant = "contained" color = "primary" >Quiz</Button></Link>
                                <br>
                                </br>
                                    <Link to="/location2" style = {{ textDecoration:'none'}}><Button class = "button" type = "solid" variant = "contained" color = "primary" >Random</Button></Link>
                                </div>
                            </div>
                        );
                    }}/>

                    <Route exact path="/location1" render={()=>{
                        return (
                            <div>
                                <img src={sun} className="App-sun" alt="sun" />
                                <div class = "Title">
                                    Location Preference
                                </div>
                                <img src={cactus} className="App-cactus1" alt="cactus" />
                                <img src={cactus} className="App-cactus2" alt="cactus" />
                                <img src={cactus} className="App-cactus3" alt="cactus" />
                                <img src={flag} className="App-flag" alt="flag" />
                                <img src={logo} className="App-logo" alt="logo" />

                                <Grid container justify={'center'} spacing={16} class="LocationBox">
                                  <Grid item xs={4} class="City">
                                     <TextField
                                        fullWidth
                                        color="secondary"
                                        label="City"
                                        value={this.state.city}
                                        onChange={(event) => this.handleCityChange(event)}
                                        margin-="normal"
                                        variant="outlined"
                                     />
                                  </Grid>
                                  <Grid item xs={2} class="Zipcode">
                                      <TextField
                                          fullWidth
                                          type={'number'}
                                          label="Zip Code"
                                          value={this.state.zip}
                                          onChange={(event) => this.handleZipChange(event)}
                                          margin="normal"
                                          variant="outlined"
                                      />
                                  </Grid>
                                </Grid>
                                <Link to="/" style = {{ textDecoration:'none'}}><Button class = "backbutton" Button type = "solid" variant = "contained" color = "primary" >Back</Button></Link>
                                <Link to="/category" style = {{ textDecoration:'none'}}>
                                    <Grid container justify={'center'}>
                                        <Grid item xs={1}>
                                            <Button class="nextbutton">
                                            {'Next'}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Link>

                            </div>
                        );
                    }}/>

                    <Route exact path="/location2" render={()=>{
                      return (
                        <div>
                            <img src={sun} className="App-sun" alt="sun" />
                            <div class = "Title">
                                Location Preference
                            </div>
                            <img src={cactus} className="App-cactus1" alt="cactus" />
                            <img src={cactus} className="App-cactus2" alt="cactus" />
                            <img src={cactus} className="App-cactus3" alt="cactus" />
                            <img src={flag} className="App-flag" alt="flag" />
                            <img src={logo} className="App-logo" alt="logo" />

                            <Grid container justify={'center'} spacing={16} class="LocationBox">
                              <Grid item xs={4} class="City">
                                 <TextField
                                    fullWidth
                                    color="secondary"
                                    label="City"
                                    value={this.state.city}
                                    onChange={(event) => this.handleCityChange(event)}
                                    margin-="normal"
                                    variant="outlined"
                                 />
                              </Grid>
                              <Grid item xs={2} class="Zipcode">
                                  <TextField
                                      fullWidth
                                      type={'number'}
                                      label="Zip Code"
                                      value={this.state.zip}
                                      onChange={(event) => this.handleZipChange(event)}
                                      margin="normal"
                                      variant="outlined"
                                  />
                              </Grid>
                            </Grid>
                            <Link to="/" style = {{ textDecoration:'none'}}><Button class = "backbutton" Button type = "solid" variant = "contained" color = "primary" >Back</Button></Link>
                            <Link to="/category" style = {{ textDecoration:'none'}}>
                                <Grid container justify={'center'}>
                                    <Grid item xs={1}>
                                        <Button class="nextbutton">
                                        {'Next'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Link>

                        </div>
                      );
                    }}/>

                    <Route exact path="/category" render={()=>{
                        return (
                          <div>
                              <img src={sun} className="App-sun" alt="sun" />
                              <div class = "Title">
                                  Food Category
                              </div>
                              <img src={cactus} className="App-cactus1" alt="cactus" />
                              <img src={cactus} className="App-cactus2" alt="cactus" />
                              <img src={cactus} className="App-cactus3" alt="cactus" />
                              <img src={flag} className="App-flag" alt="flag" />
                              <img src={logo} className="App-logo" alt="logo" />

                              <Grid container justify={'center'} spacing={16} class="CategoryBox">
                                  <Grid item xs={2} class="Category">
                                      <TextField
                                          fullWidth
                                          label="Categories"
                                          value={this.state.categories}
                                          onChange={(event) => this.handleCategoriesChange(event)}
                                          margin="normal"
                                          variant="outlined"
                                      />
                                  </Grid>
                              </Grid>

                              <Link to="/location1" style = {{ textDecoration:'none'}}><Button class = "backbutton" Button type = "solid" variant = "contained" color = "primary" >Back</Button></Link>
                              <Link to="/rating" style = {{ textDecoration:'none'}}>
                                  <Grid container justify={'center'}>
                                      <Grid item xs={1}>
                                          <Button class="nextbutton">
                                          {'Next'}
                                          </Button>
                                      </Grid>
                                  </Grid>
                              </Link>

                          </div>
                        );
                    }}/>

                    <Route exact path="/rating" render={()=>{
                        return (
                          <div>
                              <img src={sun} className="App-sun" alt="sun" />
                              <div class = "Title">
                                  Rating Preference
                              </div>
                              <img src={cactus} className="App-cactus1" alt="cactus" />
                              <img src={cactus} className="App-cactus2" alt="cactus" />
                              <img src={cactus} className="App-cactus3" alt="cactus" />
                              <img src={flag} className="App-flag" alt="flag" />
                              <img src={logo} className="App-logo" alt="logo" />

                              <div className="RatingBox">
                                <FormControl component="fieldset">
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
                                        <FormControlLabel value="*" labelPlacement={'bottom'} control={<Radio />} label="Any" />
                                    </RadioGroup>
                                </FormControl>
                              </div>

                              <Link to="/category" style = {{ textDecoration:'none'}}><Button class = "backbutton" Button type = "solid" variant = "contained" color = "primary" >Back</Button></Link>
                              <Link to="/alcohol" style = {{ textDecoration:'none'}}>
                                  <Grid container justify={'center'}>
                                      <Grid item xs={1}>
                                          <Button class="nextbutton">
                                          {'Next'}
                                          </Button>
                                      </Grid>
                                  </Grid>
                              </Link>

                          </div>
                        );
                    }}/>

                    <Route exact path="/alcohol" render={()=>{
                        return (
                          <div>
                              <img src={sun} className="App-sun" alt="sun" />
                              <div class = "Title">
                                  Alcohol Preference
                              </div>
                              <img src={cactus} className="App-cactus1" alt="cactus" />
                              <img src={cactus} className="App-cactus2" alt="cactus" />
                              <img src={cactus} className="App-cactus3" alt="cactus" />
                              <img src={flag} className="App-flag" alt="flag" />
                              <img src={logo} className="App-logo" alt="logo" />

                              <div className="AlcoholBox">
                                <FormControl component="fieldset">
                                    <Switch
                                            checked={this.state.alcohol}
                                            onChange={this.handleAlcoholChange}
                                            value={this.state.alcohol}
                                    />
                                </FormControl>
                              </div>

                              <Link to="/rating" style = {{ textDecoration:'none'}}><Button class = "backbutton" Button type = "solid" variant = "contained" color = "primary" >Back</Button></Link>
                              <Link to="/final1" style = {{ textDecoration:'none'}}>
                                  <Grid container justify={'center'}>
                                      <Grid item xs={1}>
                                          <Button class="nextbutton" onClick={this.handleSubmit}>
                                          {'Next'}
                                          </Button>
                                      </Grid>
                                  </Grid>
                              </Link>
                          </div>
                        );
                    }}/>

                    <Route exact path="/final1" render={()=>{
                        return (
                            <div>
                                <img src={sun} className="App-sun" alt="sun" />
                                <div class = "Title">
                                    TX Restaurants:
                                </div>
                                <img src={cactus} className="App-cactus1" alt="cactus" />
                                <img src={cactus} className="App-cactus4" alt="cactus" />
                                <img src={cactus} className="App-cactus5" alt="cactus" />
                                <img src={flag} className="App-flag" alt="flag" />
                                <Link to="/" style = {{ textDecoration:'none'}}><Button type = "solid" class = "home" variant = "contained" color = "primary" >Home</Button></Link>
                                <Link to="/alcohol" style = {{ textDecoration:'none'}}><Button class = "backbuttonresults" Button type = "solid" variant = "contained" color = "primary" >Back</Button></Link>
                                { this.renderData() }
                            </div>

                        );
                    }}/>

                    <Route exact path="/final2" render={()=>{
                      return (
                          <div>
                              <ul>
                                  <Link to="/" style = {{ textDecoration:'none'}}><Button type = "solid" variant = "contained" color = "primary" >Home</Button></Link>
                                  <br>
                                  </br>
                              </ul>
                              <h2>Random Results</h2>
                              { this.renderData() }

                              <div class = "Title">
                                  Random Results
                              </div>
                              <Link to="/location2" style = {{ textDecoration:'none'}}><Button class = "backbutton" Button type = "solid" variant = "contained" color = "primary" >Back</Button></Link>
                          </div>
                      );
                    }}/>
                </div>
            </Router>
        );
    }

    renderData = () => {
        const { data, hasSearched, resultsLoading } = this.state;
        if (data.length !== 0) {
            return (
                <Grid container justify={'center'} class="data">
                    <Grid item xs={8}>
                        <GridList cols={3} spacing={50}>
                            {data.map((value) => (
                                <GridListTile key={value.id}>
                                    <Paper>
                                        <ListItemText
                                            primary={value.name}
                                            secondary={
                                                <React.Fragment>
                                                    Address: {value.address}
                                                    <br/>
                                                    Categories: {value.categories.join(', ')}
                                                    <br/>
                                                    Rating: {value.rating}
                                                </React.Fragment>
                                            }
                                        />
                                    </Paper>
                                </GridListTile>
                            ))}
                        </GridList>
                    </Grid>
                </Grid>
            );
        } else if (hasSearched && !resultsLoading) {
            return (
                <div>
                    <br/>
                    <Typography
                        component="h6"
                        variant="h6"
                        gutterBottom
                    >
                        {'No Results'}
                    </Typography>
                </div>
            );
        }
    }
}


export default FoodFinder;


class App extends Component {

    renderData = () => {
        const { data, hasSearched, resultsLoading } = this.state;

        if (data.length !== 0) {
            return (
                <Grid container justify={'center'}>
                    <Grid item xs={8}>
                        <GridList cols={3} spacing={50}>
                            {data.map((value) => (
                                <GridListTile key={value.id}>
                                    <Paper>
                                        <ListItemText
                                            primary={value.name}
                                            secondary={
                                                <React.Fragment>
                                                    Address: {value.address}
                                                    <br/>
                                                    Categories: {value.categories.join(', ')}
                                                    <br/>
                                                    Rating: {value.rating}
                                                </React.Fragment>
                                            }
                                        />
                                    </Paper>
                                </GridListTile>
                            ))}
                        </GridList>
                    </Grid>
                </Grid>
            );
        } else if (hasSearched && !resultsLoading) {
            return (
                <div>
                    <br/>
                    <Typography
                        component="h6"
                        variant="h6"
                        gutterBottom
                    >
                        {'No Results'}
                    </Typography>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="App App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <br>
                </br>
                <Typography
                    component="h2"
                    variant="h2"
                    gutterBottom
                >
                    {'Texas Food Finder'}
                </Typography>

                <br>
                </br>







                </div>



    //         //     <Grid container justify={'center'} spacing={16}>
    //         //         <Grid item xs={4}>
    //         //             <TextField
    //         //                 fullWidth
    //         //                 color="secondary"
    //         //                 label="City"
    //         //                 value={this.state.city}
    //         //                 onChange={(event) => this.handleCityChange(event)}
    //         //                 margin="normal"
    //         //                 variant="outlined"
    //         //             />
    //         //         </Grid>
    //         //         <Grid item xs={2}>
    //         //             <TextField
    //         //                 fullWidth
    //         //                 type={'number'}
    //         //                 label="Zip Code"
            //                 value={this.state.zip}
            //                 onChange={(event) => this.handleZipChange(event)}
            //                 margin="normal"
            //                 variant="outlined"
            //             />
            //         </Grid>
            //     </Grid>

            //     <br/>

            //     <Grid container justify={'center'} spacing={16}>
            //         <Grid item xs={2}>
            //             <TextField
            //                 fullWidth
            //                 label="Categories"
            //                 value={this.state.categories}
            //                 onChange={(event) => this.handleCategoriesChange(event)}
            //                 margin="normal"
            //                 variant="outlined"
            //             />
            //         </Grid>
            //     </Grid>

            //     <br/>

            //     <FormControl component="fieldset">
            //         <FormLabel component="legend">Rating</FormLabel>
            //         <RadioGroup
            //             row
            //             aria-label="Gender"
            //             name="gender1"
            //             value={this.state.rating}
            //             onChange={this.handleRatingChange}
            //         >
            //             <FormControlLabel value="5" labelPlacement={'bottom'} control={<Radio />} label="5 Stars" />
            //             <FormControlLabel value="4" labelPlacement={'bottom'} control={<Radio />} label="4 Stars" />
            //             <FormControlLabel value="3" labelPlacement={'bottom'} control={<Radio />} label="3 Stars" />
            //             <FormControlLabel value="2" labelPlacement={'bottom'} control={<Radio />} label="2 Stars" />
            //             <FormControlLabel value="1" labelPlacement={'bottom'} control={<Radio />} label="1 Stars" />
            //             <FormControlLabel value="*" labelPlacement={'bottom'} control={<Radio />} label="Any" />
            //         </RadioGroup>
            //     </FormControl>

            //     <br />

            //     <FormControl component="fieldset">
            //         <FormLabel component="legend">Alcohol</FormLabel>
            //         <Switch
            //                 checked={this.state.alcohol}
            //                 onChange={this.handleAlcoholChange}
            //                 value={this.state.alcohol}
            //             />
            //     </FormControl>

            //     <br/>

            //     <Grid container justify={'center'}>
            //         <Grid item xs={1}>
            //             <Button
            //                 fullWidth
            //                 variant={'contained'}
            //                 color={'secondary'}
            //                 onClick={this.handleSubmit}
            //             >
            //                 {'Search'}
            //             </Button>
            //         </Grid>
            //     </Grid>

            //     <br />

            //     {this.state.errorMessage ?
            //         <Typography
            //             component="h6"
            //             variant="h6"
            //             gutterBottom
            //         >
            //             {this.state.errorMessage}
            //         </Typography> : null}

            //     <br/>

            //     { this.state.data.length !== 0 ? (
            //         <Typography
            //             component="h6"
            //             variant="h6"
            //             gutterBottom
            //         >
            //             {'Number of Results: ' + this.state.data.length}
            //         </Typography>

            //     ) : null }

            //     <br/>

            //     { this.renderData() }

            // </div>


        );
   }
}

//export default BasicExample;
