import React, { Component } from "react";
import {StyleSheet,View, Button,TextInput, Text,TouchableOpacity,FlatList,ActivityIndicator,RefreshControl} from "react-native";
import ProductListItem from './../components/ProductListItem';
import * as actionCreators from '../actionCreators/ProductActionCreator';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {searchEnteredProduct} from './../services/api'

let URI = "http://10.110.60.166:4000";

class SearchPage extends Component {
        static navigationOptions = {
            tabBarLabel: 'Search Submit',
            tabBarIcon: ({ tintcolor }) => (
            <Ionicons name="md-search" size={20} color="white" />
            )
        }
        constructor(props){
            super(props);
          this.state={
              products:[]
          }
        }
        
            
    enteredData = (data)=> {
        this.setState({ searchProduct: data })
     }
     onSearchProduct = (data)=> {
       // console.log(this.state.searchProduct,this.props.page, this.props.limit);
           //   this.props.actions.searchedProducts(this.state.searchProduct,this.props.page, this.props.limit);
        //    searchEnteredProduct(this.state.searchProduct,this.props.page,this.props.limit)
        //    .then(products =>{
        //     console.log("works or not "+products);
        //      });
             const URL = `http://10.110.60.166:4000/products?price=${this.state.searchProduct}&_page=${this.props.page}&_limit=${this.props.limit}`      //&page=1&per_page=10
  
             return fetch(URL)
             .then(response => {
               return response.json();
               
             })
             .then(result => {
                this.setState({
                    products: result
                });
               console.log(products.id);

               return result;
             });
     };
   


    // onWishTapped=id=>{
    //     this.props.actions.addProdtoWish(id);
    // }

    _getProducts = (page = 1, limit = 8) => {
        this.props.actions.searchEnteredProduct(this.state.searchProduct,page, limit);
    };

    /*  flat list supporting methods */

    _getMore = () => {
        this._getProducts(this.state.searchProduct,++this.props.page, this.props.limit);
    };
    
    _renderItem = ({ index, item }) => {
        
        return (
        <ProductListItem
            {...this.products}
            id={item.id}
            title={`${item.id} -${item.title}`}
            image={item.image ? `${URI}/images/${item.image}` : null}
            rating={item.rating}
            price={item.price}
            wish={item.wish || false}
          //  onWishTapped={this.onWishTapped}
        />
        );
    };

    _keyExtractor = (item, index) => {
        return `${index}`;
    };

    clearProductSearch(){
        this.setState({ products: [] });
    }
        
    
      render() {

         this.props.products.sort(function (low, high) {
                 return low.rating - high.rating
             })
        return (
          <View style={{flex:1,backgroundColor:'#70c4bc'}}>
                <View style={styles.row}>
                            <TextInput style = {styles.textArea}
                                    underlineColorAndroid = "transparent"
                                    placeholder = " Enter Product price"
                                    placeholderTextColor = "#9a73ef"
                                    autoCapitalize = "none"
                                   
                                    onChangeText = {(text)=>this.enteredData(text)}/>
                        
                            <TouchableOpacity style = {styles.submitButton}>
                                <Button title="search" color="#244584" onPress = {()=>{
                                    const {searchProduct}=this.state;
                                    if(!searchProduct){
                                       alert("you must enter Product Price");
                                   //    const searchProduct='Lenovo Ideapad Core i7 7th Gen - (32 GB/1 TB SSD/Windows 10 Home/2 GB Graphics) IP 820 Laptop'
                                        return;
                                    }
                                    this.onSearchProduct({name:searchProduct})
                                    }}/>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.clearButton}>
                                <Button title="clear" color="#244584" onPress = {()=>{
                                    this.setState({ products: [] });
                                   
                                    }}/>
                            </TouchableOpacity>
                        </View>
                  
            {this.props.isLoading ? (
              <ActivityIndicator size="large" color="#00ff80" />
            ) : this.state.products.length > 0 ? (
              <FlatList
                data={this.state.products}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                onEndReachedThreshold={0.5}
               // onEndReached={this._getMore}
                
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
                           No Products found{"\n "}
                  Searh products by price ex:65990,41990{"\n "} 
                    its displays different products check id's
                  </Text>
                </View>
              )}
          </View>
        );
      }
    }
 
 function mapDispatchToProps(dispatch){
    return{
        actions:bindActionCreators(actionCreators,dispatch),
    //    onSearchProduct:(searchProduct)=>{
    //        console.log("product price "+searchProduct);
    //        dispatch(searchedProducts(searchProduct))
    //     }
    }
 }
 
 
 function mapStateToProps(state)
 {
    return{
        products: state.productState.products,
       isLoading: state.productState.isLoading,
        isRefreshing: state.productState.isRefreshing,
        page: state.productState.page,
        limit: state.productState.limit,
        searchProduct:state.productState.searchProduct 
    }
 }
 
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        height: 56,
        backgroundColor:"#f44336",
        elevation: 4,
    },
    submitButton:{
        justifyContent: 'flex-end',
        width:100,
        margin: 8,
        borderRadius:25
    },
    textArea: {
        justifyContent: 'flex-start',
        margin: 8,
        height: 40,
        width:180,
        borderColor: '#7a42f4',
        backgroundColor:'#70c4bc',
        borderWidth: 1,
        borderRadius:35,
        paddingLeft:20
     },
     clearButton:{
        justifyContent: 'flex-end',
        width:100,
        margin: 8,
        borderRadius:25,
        marginLeft:-6
     }
    
});
 export default connect(mapStateToProps,mapDispatchToProps)(SearchPage);