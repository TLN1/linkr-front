import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { CompanyList } from "../screens/CompanyList";
import { useSelector } from "react-redux";
import CompanyView from "../screens/CompanyView";
import CreateCompany from "../screens/CreateCompany";

const Stack = createNativeStackNavigator();

export default function CompanyNavigator() {
  const username = useSelector((state) => state.auth.username);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Companies"
        component={CompanyList}
        initialParams={{ username: username }}
      />
      <Stack.Screen name="Company" component={CompanyView} />
      <Stack.Screen name="Set up company" component={CreateCompany} />
      <Stack.Screen name="Update company data" component={CreateCompany} />
    </Stack.Navigator>
  );
}
