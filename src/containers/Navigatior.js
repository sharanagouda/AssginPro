 import {createBottomTabNavigator } from "react-navigation";
import { connect } from "react-redux";
import React from "react";
import ProductList from "./ProductContainer";
import SearchPage from "./SearchProductContainer";
import Searchnow from "./SearchAutoContainer";


export const AppNavigator = createBottomTabNavigator({
            Products: {screen: ProductList },
            Searchnow:{screen:Searchnow},
            SearchAnother: {screen:SearchPage }
           
        },
        {
            tabBarPosition: 'bottom',
            swipeEnabled: true, 
            animationEnabled: true,
            tabBarOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: "#ff5722",
            inactiveTintColor: 'black',
            inactiveBackgroundColor:'#ff784e',
            elevation:6,
            labelStyle: {
            fontSize: 16,
            paddingBottom: 4
        }
        }
    })
    
    AppNavigator.navigationOptions={
        title:'product list'
        };

      class App extends React.Component {
        render() {
          return (
            <AppNavigator
            />
          );
        }
      }

const mapStateToProps = state => ({
  navState: state.navState
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
