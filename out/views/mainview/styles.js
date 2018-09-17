"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var WIDTH = react_native_1.Dimensions.get("window").width;
var HEIGHT = react_native_1.Dimensions.get("window").height;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    progress: {
        alignSelf: "center"
    }
});
exports.default = styles;
