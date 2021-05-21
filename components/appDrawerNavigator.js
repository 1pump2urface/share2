import React from 'react'
import SettingsScreen from '../screens/settingsScreen'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './appTabNavigator'
import CustomMenu from './customSidebarMenu'
import BookDonateScreen from '../screens/donateScreen'
export const AppDrawerNavigator = createDrawerNavigator({
    home:{screen:AppTabNavigator},
    myDonations:{screen:BookDonateScreen},
setting:{
    screen:SettingsScreen
}},{contentComponent:CustomMenu},
    {initialRouteName:"home"
})