import {Dimensions, StyleSheet} from "react-native";

const HEIGHT = Dimensions.get("window").height;

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    progress: {
        alignSelf: "center"
    },
    addButton: {
        width: 60,
        height: 60,
        borderRadius: 50,
        position: "absolute",
        top: (HEIGHT * 0.4) - 60,
        right: 10,
        alignSelf: "flex-end"
    },
    error: {
        color: "#ff2523",
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "center"
    },
    countBadge: {
        backgroundColor: "#ff2523"
    },
    header: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        height: 64
    },
    list: {
        position: "absolute",
        top: 65,
        right: 0,
        left: 0,
    }
});
export default style;