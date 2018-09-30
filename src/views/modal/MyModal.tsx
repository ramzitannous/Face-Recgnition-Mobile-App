import * as React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {Button, Input} from "react-native-elements";
import Modal from "react-native-modal";
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons'
import styles from "./style";


type Props = {
    modalOpen: boolean,
    closeModal: () => void,
    textValue?: string,
    title: string,
    onButtonPress: (textValue: string) => void,
    label: string
}
type States = {
    textValue: string
}
export default class MyModal extends React.Component<Props, States> {
    private userInput: any;


    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            textValue: ""
        }
    }

    // async getSnapshotBeforeUpdate(prevProps: Readonly<Props>, prevState: Readonly<States>): any | null {
    //     let url = await AsyncStorage.getItem(KEY);
    //     return url;
    // }
    //
    // componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<States>, snapshot?: any): void {
    //     console.log(snapshot)
    //     if (snapshot)
    //         this.setState({textValue: snapshot})
    // }


    render() {
        return <Modal supportedOrientations={["portrait", "landscape"]}
                      isVisible={this.props.modalOpen}
                      onBackButtonPress={() => this.props.closeModal()}
                      style={styles.modal}
                      avoidKeyboard={true}>
            <View style={styles.viewContainer}>
                <Text style={styles.title}>{this.props.title}</Text>
                <TouchableOpacity onPress={() => this.props.closeModal()} style={styles.close}>
                    <EvilIcons name={"close"} size={36} color={"#000"}/>
                </TouchableOpacity>
                <Input label={this.props.label}
                       labelStyle={styles.label}
                       ref={o => this.userInput = o}
                       defaultValue={this.props.textValue ? this.props.textValue : ""}
                       onChangeText={text => this.setState({textValue: text})}

                />
                <Button onPress={() => {
                    this.props.onButtonPress(this.state.textValue);
                    this.userInput.clear();
                    this.setState({textValue: ""});
                }}
                        disabledStyle={styles.disableButton}
                        buttonStyle={styles.button}
                        title={"Done"}
                        containerStyle={styles.button}
                        disabled={this.state.textValue.trim().length === 0}
                />
            </View>
        </Modal>
    }
}