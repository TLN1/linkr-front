import HomeNavigator from "../screens/Home";
import AuthProvider from "../context/Auth";
import AccountNavigator from "./AccountNavigator";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet } from "react-native";
import { Color } from "../Constants";
import UserProfile from "../screens/UserProfile";
import React, { useEffect, useState } from "react";
import {connect} from 'react-redux'

const Tab = createMaterialBottomTabNavigator();

function MainNavigator(props) {

  const [logged, setLogged] = useState(null);
 
  useEffect(() => {
    isLogged()
  },[props.username])
  
  const isLogged = () => {
    console.log(props.username);
    setLogged(props.username);
  }

  return (
    <AuthProvider>
      <Tab.Navigator
        activeColor={Color.WHITE}
        inactiveColor={Color.GRAY}
        barStyle={styles.barStyle}
      >
        <Tab.Screen
          name="HomeNavigator"
          options={{ tabBarIcon: "home", tabBarLabel: "Home" }}
          component={HomeNavigator}
        />
        {logged ? (
          <Tab.Screen
            name="User Profile"
            options={{ tabBarIcon: "account", tabBarLabel: "Profile" }}
            component={UserProfile}
            initialParams={{ username: logged }}
          />
        ) : (
          <Tab.Screen
            name="AccountNavigator"
            options={{ tabBarIcon: "account", tabBarLabel: "Account" }}
            component={AccountNavigator}
          />
        )}
      </Tab.Navigator>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: Color.BLACK,
  },
});

const mapStateToProps = (state) => {
  return{
    username: state.userReducer.username
  }
} 

export default connect(mapStateToProps, null)(MainNavigator);
