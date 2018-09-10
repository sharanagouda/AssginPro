import React, { Component } from "react";
import ProductListItem from "../components/ProductListItem";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as productActionCreators from "../actionCreators/ProductActionCreator";
import Toolbar from '../components/Toolbar';
let URI = "http://10.110.60.166:4000";
class ProductList extends Component {
    static navigationOptions = {
        tabBarLabel: 'Products',
        tabBarIcon: ({ tintcolor }) => (
        <Ionicons name="md-home" size={20} color="white" />
        )
        }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.getProducts(this.props.page, this.props.limit);
  }

  onWishTapped = id => {
    alert("Hi");
  };

  _getProducts = (page = 1, limit = 8) => {
    this.props.actions.getProducts(page, limit);
  };

  /*  flat list supporting methods */

  _getMore = () => {
    this._getProducts(++this.props.page, this.props.limit);
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
        wish={item.wish || false}
        onWishTapped={this.onWishTapped}
      />
    );
  };

  _keyExtractor = (item, index) => {
    return `${index}`;
  };

  _onRefresh = () => {
    //this.setState({ isRefreshing: true });
    this._getProducts();
  };

  _renderRefreshControl() {
    return (
      <RefreshControl
        onRefresh={this._onRefresh}
        refreshing={this.props.isRefreshing}
        tintColor={"#00ff80"}
        title={"Refreshing..."}
        titleColor={"#00ff80"}
      />
    );
  }

  /*  flat list supporting methods - END */

  render() {
       // const { products, isLoading } = this.state;
        this.props.products.sort(function (low, high) {
            return high.price - low.price
        })
    return (
      <View style={{flex:1,backgroundColor:'#70c4bc'}}>
      <Toolbar toolBarName="Product List"/>
        {this.props.isLoading ? (
          <ActivityIndicator size="large" color="#00ff80" />
        ) : (
          <FlatList
            data={this.props.products}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            onEndReachedThreshold={0.5}
            onEndReached={this._getMore}
            refreshControl={this._renderRefreshControl()}
          />
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.productState.products,
    isLoading: state.productState.isLoading,
    isRefreshing: state.productState.isRefreshing,
    page: state.productState.page,
    limit: state.productState.limit
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ProductList
);
