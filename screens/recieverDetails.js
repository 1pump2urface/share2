import React,{Component} from 'react';
import db from '../config'
import firebase from 'firebase'
import {Card, Header , Icon} from "react-native-elements"
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput , TouchableOpacity, Alert } from 'react-native';
export default class RecieverDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            userid:firebase.auth().currentUser().email,
            receiverid:this.props.navigation.getParam["details"]["userid"] ,
            requestid:this.props.navigation.getParam["details"]["requestid"],
            bookName:this.props.navigation.getParam["details"]["book name"],
            reason:this.props.navigation.getParam["details"]["reason"],
            receiverName:"",
            receiverContact:"",
            receiverAddress:"",
            receiverRequestDocId:""

        }
        
    }
    addNotification = ()=>{
      var message = this.state.username + "has shown interest in donating a book"
      db.collection("allNotifications").add({
        targettedUserId: this.state.receiverid,
         donorid: this.state.userId , 
         requestid:this.state.requestid,
         bookName:this.state.bookName,
         date:firebase.firestore.FieldValue.serverTimestamp(),
        notificationStatus:"unread",
        message:message      })
    }
    getReceiverDetails(){
        db.collection("users").where("email_id", "==",this.state.receiverid).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.setState({
                    receiverName:doc.data().first_name,
                    receiverContact:doc.data().contact,
                    receiverAddress:doc.data().address,
                })
            });
        })
        db.collection("Requested_Books").where("requestid", "==", this.state.requestid).get()
        .then(snapshot => {
            this.setState({receiverRequestDocId:doc.id})
        })
    }
    componentDidMount(){
        this.getReceiverDetails()
    }
    updateStatus = ()=>{
        db.collection("all_donations").add({
            bookName:this.state.bookName,
            requestid:this.state.requestid,
            requestedBy:this.state.receiverName,
            donorid:this.state.userid,
            requestStatus:'donor interested'
        })
    }
    render(){
        return(
          <View style={styles.container}>
            <View style={{flex:0.1}}>
              <Header
                leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
                centerComponent={{ text:"Donate Books", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
                backgroundColor = "#eaf8fe"
              />
            </View>
            <View style={{flex:0.3}}>
              <Card
                  title={"Book Information"}
                  titleStyle= {{fontSize : 20}}
                >
                <Card >
                  <Text style={{fontWeight:'bold'}}>Name : {this.state.bookName}</Text>
                </Card>
                <Card>
                  <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason}</Text>
                </Card>
              </Card>
            </View>
            <View style={{flex:0.3}}>
              <Card
                title={"Reciever Information"}
                titleStyle= {{fontSize : 20}}
                >
                <Card>
                  <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
                </Card>
                <Card>
                  <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
                </Card>
                <Card>
                  <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
                </Card>
              </Card>
            </View>
            <View style={styles.buttonContainer}>
              {
                this.state.recieverId !== this.state.userId
                ?(
                  <TouchableOpacity
                      style={styles.button}
                      onPress={()=>{
                        this.updateStatus()
                        this.addNotification()
                        this.props.navigation.navigate('myDonations')
                      }}>
                    <Text>I want to Donate</Text>
                  </TouchableOpacity>
                )
                : null
              }
            </View>
          </View>
        )
      }
    
    }
    
    
    const styles = StyleSheet.create({
      container: {
        flex:1,
      },
      buttonContainer : {
        flex:0.3,
        justifyContent:'center',
        alignItems:'center'
      },
      button:{
        width:200,
        height:50,
        justifyContent:'center',
        alignItems : 'center',
        borderRadius: 10,
        backgroundColor: 'orange',
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
         },
        elevation : 16
      }
    })