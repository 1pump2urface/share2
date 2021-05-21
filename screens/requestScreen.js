
import React,{Component} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput , TouchableOpacity, Alert } from 'react-native';
import db from '../config'
import MyHeader from '../components/appHeader'
import firebase from "firebase"
export default class RequestScreen extends Component {
    constructor(){
        super();
        this.state = {
            userid:firebase.auth().currentUser.email,
            bookName:"",
            reason:"",

        }

    }
    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }
    addRequest = (bookName,reason)=>{
        var userid = this.state.userid
        var randomRequestId = this.createUniqueId()
        db.collection("Requested_Books").add({
            userid:userid,
            bookName:bookName,
            reason:reason,
            requestid:randomRequestId
        })
        this.setState({
            bookName:"",
            reason:"",
        })
        return Alert.alert("Book requested successfully")
    }
    render(){
  return (
  <View style = {{flex:1}}>
      <MyHeader title = "request book"/>
      <KeyboardAvoidingView style = {styles.keyBoardStyle}>
          <TextInput style = {styles.formTextInput}
          placeholder = {"Enter Book Name"}
          onChangeText = {(text)=>{
              this.setState({bookName:text})
          }}
          value = {this.state.bookName}/>
           <TextInput style = {[styles.formTextInput,{height:300}]}
          placeholder = {"Why do you need the book?"}
          multiline
          numberOfLines = {10}
          onChangeText = {(text)=>{
              this.setState({reason:text})

          }}
          value = {this.state.reason}/>
          <TouchableOpacity style = {styles.button} onPress = {()=>{this.addRequest(this.state.bookName,this.state.reason)}}>
              <Text>Request</Text>
          </TouchableOpacity>



      </KeyboardAvoidingView>
     
  </View>
  );
}}
const styles = StyleSheet.create({ keyBoardStyle : { flex:1, alignItems:'center', justifyContent:'center' },
 formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, },
  button:{ width:"75%", height:50, justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor: "#000", 
shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop:20 }, } )