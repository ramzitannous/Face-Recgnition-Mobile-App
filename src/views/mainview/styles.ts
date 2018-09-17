import {StyleSheet,Dimensions} from "react-native";

const WIDTH=Dimensions.get("window").width;
const HEIGHT=Dimensions.get("window").height;

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center"
    },
    progress:{
        alignSelf:"center"
    }
});
export default styles;