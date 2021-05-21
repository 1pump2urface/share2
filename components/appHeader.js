import React , {Component} from "react"
import {Header,Icon} from 'react-native-elements'
import {View,Text,StyleSheet}from 'react-native'
const MyHeader = props => {
    return(
        <Header centerComponent = {{text:props.title, style:{color:"white", fontSize:20,fontWeight:"bold"}}}
        backgroundColor = "black"/>
    )
}
export default MyHeader;