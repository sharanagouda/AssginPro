import React, {Component} from "react";
import {StyleSheet,View, Text, TouchableNativeFeedback, Image} from "react-native";

class Toolbar extends Component {



    render() {
        return (
          <View style={styles.toolbarContainer}>
            <TouchableNativeFeedback >
                 <Text style={styles.headerText}>{this.props.toolBarName}</Text>
              </TouchableNativeFeedback>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    toolbarContainer: {
        height: 56,
        backgroundColor: "#f44336",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignContent:"center",
        elevation: 4,
        //marginTop:24
    },
    headerText:{
         fontSize:16,
         paddingTop:16,
         color:"#fff",
         fontWeight:"bold"
    }
  
});
export default Toolbar;