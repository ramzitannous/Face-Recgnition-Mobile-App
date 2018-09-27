"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_navigation_1 = require("react-navigation");
var BaseTab_1 = __importDefault(require("./views/main/BaseTab"));
var BASE_URL = "http://192.168.1.147:5000/";
exports.WHITELIST_URL = BASE_URL + "whitelist/";
exports.BLACKLIST_URL = BASE_URL + "blacklist/";
exports.dbTypes = {
    whitelist: "whitelist",
    blacklist: "blacklist"
};
var url = {
    names: "names",
    images: "images",
    addName: "add_name",
    removeName: "remove_name",
    train: "train",
    trainImage: "train_image"
};
exports.TabRouter = react_navigation_1.createBottomTabNavigator({
    whiteList: {
        screen: function (props) {
            return React.createElement(BaseTab_1.default, {dbType: exports.dbTypes.whitelist});
        }
    },
    blackList: {
        screen: function (props) {
            return React.createElement(BaseTab_1.default, {dbType: exports.dbTypes.blacklist});
        }
    }
}, {
    initialRouteName: 'whiteList',
    lazy: true,
    navigationOptions: function (_a) {
        var navigation = _a.navigation;
        return ({});
    },
    tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
    }
});
exports.default = url;
