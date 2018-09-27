import * as React from "react";
import {createBottomTabNavigator} from "react-navigation";
import BaseTab from "./views/main/BaseTab";

const BASE_URL = "http://192.168.1.147:5000/"
export const WHITELIST_URL = BASE_URL + "whitelist/";
export const BLACKLIST_URL = BASE_URL + "blacklist/"
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
        navigationOptions: ({navigation}) => ({}),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }
    });

export default url;
