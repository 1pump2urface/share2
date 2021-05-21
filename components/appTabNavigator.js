import React from 'react'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import RequestScreen from '../screens/requestScreen'
import DonateScreen from '../screens/donateScreen'
import {Image} from 'react-native'
export const AppTabNavigator = createBottomTabNavigator({
    donateBooks: {
        screen:DonateScreen,
        navigationOptions:{
            tabBarIcon:<Image source = {require("../assets/request-list.png")} style = {{width:20,height:20}}/>,
            tabBarLabel: "donateBooks"
        }
    },
    bookRequest: {
        screen:RequestScreen,
        navigationOptions:{
            tabBarIcon:<Image source = {require("../assets/request-book.png")} style = {{width:20,height:20}}/>,
            tabBarLabel: "bookRequest"
        }
    }
})