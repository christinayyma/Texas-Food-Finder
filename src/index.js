import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Router, Route, IndexRoute,browserHistory} from "react-router-dom";

// import {Root} from "./components/Root";
// import {Home} from "./components/Home";
// import {Location} from "./components/Location";


ReactDOM.render(<App/>, document.getElementById('root'));

// class App extends React.Component {
//     render() {
//         return(
//             <Router history = {browserHistory}>
//             <Route path ={"/"} component = {Root}>
//                 <IndexRoute component={Home} />
//                 <Route path = {"Home"} component = {Home} />
//                 <Route path = {"Location"} component = {Location} />
//             </Route>
//             <Route path = {"home-single"} component= {Home}/>
//             </Router>

//         );
//     }
// }

// render(<App />, window.document.getElementById('app'));


