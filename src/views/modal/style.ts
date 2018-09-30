import {Dimensions, StyleSheet} from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: "#fff",
        width: 0.9 * width,
        height: 0.3 * height,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        opacity: 1,
    },
    close: {
        position: "absolute",
        left: 10,
        top: 10
    },
    title: {
        color: "#000",
        fontSize: 14,
        fontWeight: "bold"
    },
    button: {
        borderRadius: 30,
        marginBottom: 10
    },
    modal: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    label: {
        color: "#000"
    },
    disableButton: {
        borderRadius: 30,
        marginBottom: 10,
        backgroundColor: "grey"
    }
});
export default styles;