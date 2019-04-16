import React, {Component} from "react";


import axios from 'axios';
import logo from './cartoon-man.png';

import classNames from 'classnames';

import cactus from './cactus.png';
import flag from './texas-state-flag.png';
import sun from './sun.png';


import './App.css';
import { Button, Grid, TextField, Typography, FormControl, Radio,
         FormControlLabel, RadioGroup, FormLabel, Switch,
         ListItemText, Paper, GridList, GridListTile, FormGroup, Input,
         OutlinedInput, FilledInput, InputLabel, MenuItem, FormHelperText,
        Select, Chip, NoSsr } from '@material-ui/core';

import {BrowserRouter as Router, Route, Link } from "react-router-dom";





class FoodFinder extends Component{

  state = {
    single: null,
    multi: null,
  };

    constructor(props) {
        super(props);
            this.state = {
                city: '',
                zip: '',
                rating: '*',
                alcohol: '*',
                categories: '',
                errorMessage: '',
                data: [],
                hasSearched: false,
                resultsLoading: false,
                random: false,
        }
    }


    changeToRandom = () => {
      this.setState({ random: true })
      this.setState({ alcohol: "*", categories: '', rating: ''})
    }

    changeToQuiz = () => {
      this.setState({ random: false})
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
        this.setState({ alcohol: event.target.value});
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

            if (rating >= 1 && rating <= 5){
                var str = "";
                for (var i = 5; i > rating; i--){
                  str += "rating : " + i + " OR " ;
                }
                str = str + "rating : " + rating;
                params.append('fq', str);
            }

            if (alcohol == "alcohol") {
                params.append('fq', 'categories:( Beer OR Wine OR Bar OR Bars)');
            }

            if (categories ) {
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


        const { classes, theme } = this.props;

        const selectStyles = {
          input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
              font: 'inherit',
            },
          }),
        };

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
                                    <Link to="/location1" style = {{ textDecoration:'none'}}>
                                      <Button
                                        class = "button"
                                        type = "solid"
                                        variant = "contained"
                                        onClick = { this.changeToQuiz }
                                        color = "primary" >
                                          Quiz
                                      </Button>
                                    </Link>
                                <br>
                                </br>
                                    <Link to="/location2" style = {{ textDecoration:'none'}}>
                                      <Button
                                        class = "button"
                                        type = "solid"
                                        variant = "contained"
                                        onClick = { this.changeToRandom }
                                        color = "primary" >
                                          Random
                                      </Button>
                                    </Link>
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
                                        label="City - Required"
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
                                        label="City - Required"
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
                                <Link to="/final2" style = {{ textDecoration:'none'}}>
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


                              <div class = "catagoryOption">
                                    <h3 class= "catagoryheading3">Pick a Category</h3>
                                    <Grid container justify={'center'} spacing={16} width={100}>
                                        <Grid item xs={2}>
                                        <form className={this.root} autoComplete="on" id ="catadropdown">
                                        <FormControl className={this.formControl}>
                                        <InputLabel id="catagorylabel"></InputLabel>
                                        <Select
                                          value={this.state.categories}
                                          onChange={(event) => this.handleCategoriesChange(event)}
                                          inputProps={{
                                            name: 'Category',
                                            id: 'category-simple',
                                          }}
                                        >

                                          <MenuItem value={"None"}>None</MenuItem> <MenuItem value={"Afghan"}>Afghan</MenuItem> <MenuItem value={"African"}> African</MenuItem> <MenuItem value={"American"}>American </MenuItem> <MenuItem value={"Arabian"}>Arabian </MenuItem>
                                          <MenuItem value={"Argentine"}>Argentine</MenuItem> <MenuItem value={"Asian Fusion"}>Asian Fusion</MenuItem> <MenuItem value={"Austrian"}>Austrian</MenuItem><MenuItem value={"Bangladeshi"}>Bangladeshi</MenuItem> <MenuItem value={"Barbeque"}>Barbeque </MenuItem>
                                          <MenuItem value={"Belgian"}>Belgian</MenuItem> <MenuItem value={"Bistros"}>Bistros</MenuItem> <MenuItem value={"Brazilian"}>Brazilian</MenuItem><MenuItem value={"Breakfast & Brunch"}>Breakfast & Brunch</MenuItem> <MenuItem value={"British"}>British</MenuItem>
                                          <MenuItem value={"Buffets"}>Buffets</MenuItem> <MenuItem value={"Bulgarian"}>Bulgarian </MenuItem> <MenuItem value={"Cafes"}>Cafes</MenuItem> <MenuItem value={"Burgers"}>Burgers </MenuItem><MenuItem value={"Colombian"}>Colombian </MenuItem>
                                          <MenuItem value={"Cajun/Creole"}>Cajun/Creole </MenuItem><MenuItem value={"Cambodian"}>Cambodian </MenuItem><MenuItem value={"Canadian"}>Canadian </MenuItem> <MenuItem value={"Caribbean"}>Caribbean</MenuItem><MenuItem value={"Chilean"}>Chilean</MenuItem>
                                          <MenuItem value={"Chinese"}>Chinese </MenuItem> <MenuItem value={"Cantonese"}>Cantonese</MenuItem> <MenuItem value={"Comfort Food"}>Comfort Food </MenuItem><MenuItem value={"Cuban"}>Cuban</MenuItem><MenuItem value={"Dominican"}>Dominican</MenuItem>
                                          <MenuItem value={"Dim Sum"}>Dim Sum </MenuItem><MenuItem value={"Danish"}>Danish </MenuItem> <MenuItem value={"Delis"}>Delis</MenuItem><MenuItem value={"Diners"}>Diners</MenuItem><MenuItem value={"Ethiopian"}>Ethiopian</MenuItem>
                                          <MenuItem value={"Fast Food"}>Fast Food </MenuItem><MenuItem value={"French"}>French</MenuItem><MenuItem value={"Gastropubs"}>Gastropubs</MenuItem><MenuItem value={"German"}>German</MenuItem><MenuItem value={"Greek"}>Greek</MenuItem>
                                          <MenuItem value={"Gluten-Free"}>Gluten-Free</MenuItem><MenuItem value={"Haitian"}>Haitian</MenuItem><MenuItem value={"Halal"}>Halal </MenuItem><MenuItem value={"Hunan"}>Hunan</MenuItem><MenuItem value={"Hawaiian"}>Hawaiian</MenuItem>
                                          <MenuItem value={"Honduran"}>Honduran</MenuItem><MenuItem value={"Hungarian"}>Hungarian </MenuItem><MenuItem value={"Indonesian"}>Indonesian </MenuItem><MenuItem value={"Indian"}>Indian</MenuItem><MenuItem value={"Irish"}>Irish</MenuItem>
                                          <MenuItem value={"International"}>International</MenuItem><MenuItem value={"Italian"}>Italian</MenuItem><MenuItem value={"Japanese"}>Japanese</MenuItem><MenuItem value={"Indian"}>Indian</MenuItem><MenuItem value={"Korean"}>Korean</MenuItem>
                                          <MenuItem value={"Kosher"}>Kosher</MenuItem><MenuItem value={"Laos"}>Laos </MenuItem><MenuItem value={"Salvadoran"}>Salvadoran</MenuItem><MenuItem value={"Latin American"}>Latin American</MenuItem><MenuItem value={"Venezuelan"}>Venezuelan</MenuItem>
                                          <MenuItem value={"Malaysian"}>Malaysian</MenuItem><MenuItem value={"Mediterranean"}>Mediterranean</MenuItem><MenuItem value={"Egyptian"}>Egyptian </MenuItem><MenuItem value={"Lebanese"}>Lebanese </MenuItem><MenuItem value={"Mongolian"}>Mongolian </MenuItem>
                                          <MenuItem value={">Mexican"}>Mexican</MenuItem><MenuItem value={"Moroccan"}>Moroccan</MenuItem><MenuItem value={"Pan Asia"}>Pan Asia</MenuItem><MenuItem value={"Pakistani"}>Pakistani</MenuItem><MenuItem value={"Pancakes"}>Pancakes</MenuItem>
                                          <MenuItem value={"Peruvian"}>Peruvian</MenuItem><MenuItem value={"Pita"}>Pita </MenuItem><MenuItem value={"Pizza"}>Pizza </MenuItem><MenuItem value={"Polish"}>Polish </MenuItem><MenuItem value={"Polynesian"}>Polynesian</MenuItem>
                                          <MenuItem value={"Portuguese"}>Portuguese </MenuItem><MenuItem value={"Pub Food"}>Pub Food</MenuItem><MenuItem value={"Romanian"}>Romanian</MenuItem><MenuItem value={"Russian"}>Russian</MenuItem><MenuItem value={"Scottish"}>Scottish </MenuItem>
                                          <MenuItem value={"Seafood"}>Seafood</MenuItem><MenuItem value={"Somali"}>Somali</MenuItem><MenuItem value={"Southern"}>Southern </MenuItem><MenuItem value={"Soul Foo"}>Soul Food </MenuItem><MenuItem value={"Spanish"}>Spanish</MenuItem>
                                          <MenuItem value={"Sri Lankan"}>Sri Lankan</MenuItem><MenuItem value={"Steakhouse"}>Steakhouses</MenuItem><MenuItem value={"Sushi Bars"}>Sushi Bars </MenuItem><MenuItem value={"Swedish"}>Swedish</MenuItem><MenuItem value={"Syrian"}>Syrian</MenuItem>
                                          <MenuItem value={"Taiwanese"}>Taiwanese</MenuItem><MenuItem value={"Tapas Bar"}>Tapas Bar</MenuItem><MenuItem value={"Tex-Mex"}>Tex-Mex</MenuItem><MenuItem value={"Turkish"}>Turkish</MenuItem><MenuItem value={"Homemade Food"}>Homemade Food </MenuItem>
                                          <MenuItem value={"Vegan"}>Vegan </MenuItem><MenuItem value={"Vietnamese"}>Vietnamese </MenuItem>


                                        </Select>
                                      </FormControl>
                                      </form>
                                        </Grid>
                                    </Grid>

                                </div>

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
                                        <FormControlLabel value="1" labelPlacement={'bottom'} control={<Radio />} label="1+" />
                                        <FormControlLabel value="2" labelPlacement={'bottom'} control={<Radio />} label="2+" />
                                        <FormControlLabel value="3" labelPlacement={'bottom'} control={<Radio />} label="3+" />
                                        <FormControlLabel value="4" labelPlacement={'bottom'} control={<Radio />} label="4+" />
                                        <FormControlLabel value="5" labelPlacement={'bottom'} control={<Radio />} label="5" />
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

                              <div className = "AlcoholReq">
                              Requirement?
                              </div>
                              <div className="AlcoholBox">
                              <center><FormControl component="fieldset">
                                    <RadioGroup
                                        row
                                        aria-label="Gender"
                                        name="gender1"
                                        value={this.state.alcohol}
                                        onChange={this.handleAlcoholChange}
                                    >
                                        <FormControlLabel value="alcohol" labelPlacement={'bottom'} control={<Radio />} label="Yes" />
                                        <FormControlLabel value="!alcohol" labelPlacement={'bottom'} control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl></center>
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
                                <img src={sun} className="App-sun" alt="sun" />
                                <div class = "Title">
                                    TX Restaurants:
                                </div>
                                <img src={cactus} className="App-cactus1" alt="cactus" />
                                <img src={cactus} className="App-cactus4" alt="cactus" />
                                <img src={cactus} className="App-cactus5" alt="cactus" />
                                <img src={flag} className="App-flag" alt="flag" />
                                <Link to="/" style = {{ textDecoration:'none'}}><Button type = "solid" class = "home" variant = "contained" color = "primary" >Home</Button></Link>
                                <Link to="/location2" style = {{ textDecoration:'none'}}><Button class = "backbuttonresults" Button type = "solid" variant = "contained" color = "primary" >Back</Button></Link>
                                { this.renderData() }
                            </div>
                        );
                    }}/>
                </div>
            </Router>
        );
    }

    renderData = () => {
        const { data, hasSearched, resultsLoading, random } = this.state;
        var mySet = new Set(data);
        var size = data.length;
        for(var i = 0; i < size; i++){
          if(mySet.has(data[i].address[0])){
            data.splice(i, 1);
            i--;
            size--;
          }
          else{
            mySet.add(data[i].address[0]);
          }
        }

        if (data.length !== 0) {
          tempArray = data;
          if(random){
            var min = 0;
            var max = data.length - 4;
            var tempArray = data.splice(min + Math.random() * (max - min),4);
          }
            return (
                <Grid container justify={'center'} className="data">
                    <Grid item xs={8}>
                        <GridList cols={3} spacing={10}>
                            {tempArray.map((value) => (
                                <GridListTile key={value.id} class="paper">
                                    <Paper style={{height:'150px'}}>
                                      <div style={{margin:'20px'}}>
                                        <ListItemText
                                            className="listItem"
                                            primary={
                                                <React.Fragment>
                                                    <br/>
                                                    {value.name}
                                                </React.Fragment>
                                              }
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
                                      </div>
                                    </Paper>
                                </GridListTile>
                            ))}
                        </GridList>
                    </Grid>
                </Grid>
            );
        }
        else if (hasSearched && !resultsLoading) {
            return (
                <div className="Loading">
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
