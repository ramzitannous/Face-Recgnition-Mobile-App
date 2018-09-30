import * as React from "react";
import {createBottomTabNavigator} from "react-navigation";
import BaseTab from "./views/main/BaseTab";

const DEFAULT_BASE_URL = "http://192.168.0.19:5000/";
export const KEY = "server-url";
export const WHITELIST_URL = DEFAULT_BASE_URL + "whitelist/";
export const BLACKLIST_URL = DEFAULT_BASE_URL + "blacklist/"
export const dbTypes = {
    whitelist: "whitelist",
    blacklist: "blacklist"
}
const url = {
    names: "names",
    images: "images",
    addName: "add_name",
    removeName: "remove_name",
    train: "train",
    trainImage: "train_image"
};


export const TabRouter = createBottomTabNavigator({
        whiteList: {screen: (props: any) => <BaseTab dbType={dbTypes.whitelist}/>},
        blackList: {screen: (props: any) => <BaseTab dbType={dbTypes.blacklist}/>}
    },
    {
        initialRouteName: 'whiteList',
        lazy: true,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: navigation.state.routeName == 'whiteList' ? "White List" : "Black List"
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }
    });

export default url;
