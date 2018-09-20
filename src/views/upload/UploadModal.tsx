import {Image} from "react-native-image-crop-picker";
import * as React from "react";
import {FlatList, Image as ReactImage, Modal, ProgressBarAndroid} from "react-native";
import {ListItem} from "react-native-elements";
import styles from "./style";
import url from "../../constants";
import RNFetchBlob from 'rn-fetch-blob'

type Props = {
    images: Image[],
    modalOpened: boolean,
    name: string
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

    async componentWillMount() {
        const {images, name} = this.props;
        let index = 0;
        for (const image of images) {
            if (name != "") {
                await RNFetchBlob.fetch('POST', url.UPLOAD_IMAGE + name,
                    {'Content-Type': 'multipart/form-data'}, [{
                        name: 'file',
                        filename: new Date().getTime() + "." + (image.mime.split("/")[1]),
                        data: RNFetchBlob.wrap(image.path)
                    }]).uploadProgress({interval: 1}, (written: number, total: number) => {
                    this.state.uploadProgress[index] = written / total;
                    this.setState({uploadProgress: this.state.uploadProgress});
                })
            }
            index++;
        }
    }

    render() {
        const {uploadProgress} = this.state;
        return <Modal visible={this.props.modalOpened} animationType={"fade"} onRequestClose={() => null}>
            <FlatList data={this.props.images}
                      renderItem={({item, index}) => <ListItem rightElement={
                          <ReactImage style={styles.image}
                                      source={{uri: item.path}}/>}
                                                               bottomDivider={true}
                                                               leftElement={<ProgressBarAndroid
                                                                   progress={uploadProgress[index]}/>}
                      />}

                      extraData={this.state}
                      keyExtractor={(item, index) => index + ""}
            />
        </Modal>
    }
}