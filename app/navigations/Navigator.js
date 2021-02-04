import React from "react";
import { View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../components/HomeScreen";
import SettingsScreen from "../components/SettingsScreen";

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Lista",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={"list-outline"}/>
          </View>
        ),
      },
    },

    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: "Perfil",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon
              style={[{ color: tintColor }]}
              size={25}
              name={"ios-home"} 
            />
          </View>
        ),
      },
    },
  },

  {
    initialRouteName: "Home",
    activeColor: "#f0edf6",
    inactiveColor: "#226557",
    barStyle: { backgroundColor: "#f69b31" },
    },
    );
  


export default createAppContainer(TabNavigator);
