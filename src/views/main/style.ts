import {Dimensions, StyleSheet} from "react-native";

const WIDTH = Dimensions.get("window").width;
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    progress: {
        alignSelf: "center"
    },
    addButton: {
        width: 60,
        height: 60,
        borderRadius: 50,
        position: "absolute",
        bottom: 20,
        right: 10
    },
    error: {
        color: "#ff2523",
        fontSize: 18,
        fontWeight: "bold"
    },
    countBadge: {
        backgroundColor: "#ff2523"
    }
});
export default style;