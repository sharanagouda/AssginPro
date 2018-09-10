import React, { Component } from "react";
import {StyleSheet,View, Button,TextInput, Text,TouchableOpacity,FlatList,ActivityIndicator,RefreshControl} from "react-native";
import ProductListItem from '../components/ProductListItem';
import { SearchBar } from "react-native-elements";
import {bindActionCreators} from 'redux';
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import {connect} from 'react-redux';
import * as ProductActionCreator from "../actionCreators/ProductActionCreator";
import {searchEnteredProduct} from '../services/api'

let URI = "http://10.110.60.166:4000";
const tintColor = 'white';

class Searchnow extends Component {
        static navigationOptions = {
            tabBarLabel: 'Auto search',
            tabBarIcon: ({ tintcolor }) => (
            <Ionicons name="md-search" size={20} color="white" />
            )
        }
        constructor(props){
            super(props);
                this.onSearchProducts = this.onSearchProducts.bind(this);
        }
        
        componentDidMount() {
          this.props.actions.getProducts(this.props.page, this.props.limit);
        }
            
    enteredData = (data)=> {
        this.setState({ searchProduct: data })
     }
     onSearchProduct = (data)=> {
       // console.log(this.state.searchProduct,this.props.page, this.props.limit);
           //   this.props.actions.searchedProducts(this.state.searchProduct,this.props.page, this.props.limit);
         
           searchEnteredProduct(this.state.searchProduct,this.props.page,this.props.limit)
           .then(products =>{
            console.log("works or not "+products);
             });
     };
   


    onWishTapped=id=>{
        this.props.actions.addProdtoWish(id);
    }
  
    getProducts = (page = 1, limit = 8) => {
        this.props.actions.getProducts(page, limit);
    };

    _getMore = () => {
        this.getProducts(++this.props.page, this.props.limit);
    };
    
    _renderItem = ({ index, item }) => {
        
        return (
        <ProductListItem
        {...this.props}
        id={item.id}
        title={`${item.title}`}
        image={item.image ? `${URI}/images/${item.image}` : null}
        rating={item.rating}
        price={item.price}
        />
        );
    };

    _keyExtractor = (item, i) => {
      return `${i}`;
    };
  
    onSearchProducts = productsName =>
      this.props.actions.searchedProducts(this.props.products, productsName);
  
    
      render() {

        this.props.filteredAllProducts.sort(function (low, high) {
          return low.rating - high.rating
        })
        return (
          <View style={{ flex: 1, backgroundColor: "#70c4bc" }}>
           <View style={styles.row}>
              <SearchBar
                placeholder=" Search by Product names"
                lightTheme
                placeholderTextColor={tintColor}
                inputStyle={styles.searchBarInput}
                icon={{ color: tintColor, size: '52' }}
                onChangeText={this.onSearchProducts}
                onClearText={this.onSearchProducts}
              />
            </View>
    
            {this.props.isLoading ? (
              <ActivityIndicator color="#406fb2" />
            ) : this.props.filteredAllProducts.length > 0 ? (
              <FlatList
                data={this.props.filteredAllProducts}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                onEndReachedThreshold={0.5}
                onEndReached={this._getMore}
                
              />
            ): (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  No Products found{" "}
                </Text>
              </View>
            )}
          </View>
        );
      }
    }
 
 function mapDispatchToProps(dispatch){
      return {
        actions: bindActionCreators(ProductActionCreator, dispatch)
      };
 }
 
 
 function mapStateToProps(state)
 {
    return{
        products: state.productState.products,
        isLoading: state.productState.isLoading,
        isRefreshing: state.productState.isRefreshing,
        page: state.productState.page,
        limit: state.productState.limit,
        filteredAllProducts: state.productState.filteredAllProducts
    }
 }
 
const styles = StyleSheet.create({
     searchBarInput: {
      backgroundColor: '#70c4bc',
      color:'blue'
    },
    row: {
      height: 56,
      backgroundColor:"#f44336",
      elevation: 4,
  },
    
});
 export default connect(mapStateToProps,mapDispatchToProps)(Searchnow);