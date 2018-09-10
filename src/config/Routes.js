import React,{Component} from 'react';
import {Router, Scene} from "react-native-router-flux";

import Home from "./../screens/Home";
import Products from './../screens/Products';

export default class Routes extends Component {
  render() {
    return (
        <Router>
                <Scene key="home" component={Home} title="Home"/>
                <Scene key="products" component={Products} title="Products"/>
        </Router>
    );
  }
}