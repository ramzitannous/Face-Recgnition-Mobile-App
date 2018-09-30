import * as React from "react";
import {
    Alert,
    AsyncStorage,
    FlatList,
    Image as ReactImage,
    Modal,
    ProgressBarAndroid,
    Text,
    TouchableOpacity,
} from "react-native";
import {Badge, Header, ListItem} from "react-native-elements";
import {Image} from "react-native-image-crop-picker";
//ts-ignore
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons'
import RNFetchBlob from 'rn-fetch-blob'
import url, {KEY} from "../../constants";
import styles from "./style";


type Props = {
    images: Image[],
    modalOpened: boolean,
    name: string,
    closeModal: () => void,
    dbType: string,
}

type State = {
    uploadProgress: number[]
}

export default class UploadModal extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            uploadProgress: []
        }

    }


    render() {
        const {uploadProgress} = this.state;
        return <Modal visible={this.props.modalOpened} animationType={"fade"} onRequestClose={() => null}
                      onShow={() => {
                          this.setState({uploadProgress: uploadProgress.fill(0, 0, this.props.images.length - 1)});
                          this.uploadImages()
                      }}>
            <Header
                backgroundColor={"#fff"}
                centerComponent={<Text style={styles.titleStyle}>{this.props.name}</Text>}
                leftComponent={
                    <TouchableOpacity onPress={() => this.props.closeModal()}>
                        <EvilIcons name={"close"} size={34} color={"#000"}/>
                    </TouchableOpacity>
                }
            />

            <FlatList data={this.props.images}
                      renderItem={({item, index}) => this.renderRow(item, index)}
                      extraData={this.state}
                      keyExtractor={(item, index) => index + ""}
            />
        </Modal>
    }

    private async uploadImages() {
        const {images, name, dbType} = this.props;
        let baseUrl = await AsyncStorage.getItem(KEY);
        if (baseUrl && !baseUrl.endsWith("/"))
            baseUrl = baseUrl + "/"
        const furl = baseUrl + dbType + "/" + encodeURIComponent(name) + "/" + url.images;
        let index = 0;
        for (const image of images) {
            if (name != "") {
                try {
                    await RNFetchBlob.fetch('POST', (furl),
                        {'Content-Type': 'multipart/form-data'}, [{
                            name: 'file',
                            filename: new Date().getTime() + "." + (image.mime.split("/")[1]),
                            data: RNFetchBlob.wrap(image.path)
                        }]).uploadProgress({interval: 0.1}, (written: number, total: number) => {
                        this.state.uploadProgress[index] = written / total;
                        this.setState({uploadProgress: this.state.uploadProgress});
                    })
                }
                catch (e) {
                    Alert.alert("Upload Failed", e.toString());
                    break;
                }
            }
            index++;
        }
    }

    private renderRow(item: any, index: number): any {
        const {uploadProgress} = this.state;
        return <ListItem leftElement={
            <ReactImage style={{width: (item.width * 0.07), height: item.height * 0.04}}
                        source={{uri: item.path}}/>}
                         bottomDivider={true}
                         rightElement={
                             uploadProgress[index] < 0.98 ?
                                 <ProgressBarAndroid
                                     styleAttr={"Horizontal"}
                                     style={styles.progress}
                                     progress={uploadProgress[index]}
                                     indeterminate={false}/> :
                                 <Badge value={uploadProgress[index]}/>
                         }
        />
    }
}