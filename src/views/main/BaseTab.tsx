import * as React from "react";
import {FlatList, ProgressBarAndroid, Text, ToastAndroid, View} from "react-native";
//ts-ignore
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet'
import {Badge, Button, ListItem} from "react-native-elements";
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import url, {BLACKLIST_URL, dbTypes, WHITELIST_URL} from "../../constants";
import AddUserModal from "../addUser/AddUserModal";
import UploadModal from "../upload/UploadModal";
import style from "./style";

type State = {
    people: [],
    isLoading: boolean,
    images: Image[],
    uploadModalOpened: boolean,
    pressedName: string,
    addUserModalOpened: boolean,
    networkError: boolean
}
type Props = {
    dbType: string
}

export default class BaseTab extends React.Component<Props, State> {


    private actionSheet: any;
    private baseUrl: string;

    constructor(props: Readonly<Props>) {
        super(props);
        const {dbType} = this.props;
        this.baseUrl = dbType === dbTypes.whitelist ? WHITELIST_URL : BLACKLIST_URL;
        this.state = {
            people: [],
            isLoading: false,
            uploadModalOpened: false,
            images: [],
            pressedName: "",
            addUserModalOpened: true,
            networkError: false
        }
    }

    componentWillMount() {
        this.getNames();
    }

    render() {
        return <View style={style.container}>
            {this.renderView()}
            <ActionSheet
                ref={(o: any) => this.actionSheet = o}
                title={<Text style={{color: '#ff1947', fontSize: 18}}>Choose Image From</Text>}
                options={['From Gallery', 'From Camera', 'Cancel']}
                cancelButtonIndex={2}
                onPress={(index: number) => {
                    this.chooseImages(index);
                }}
            />
            <UploadModal name={this.state.pressedName} images={this.state.images}
                         modalOpened={this.state.uploadModalOpened}
                         closeModal={
                             () => {
                                 this.setState({uploadModalOpened: false})
                                 this.getNames()
                             }}
                         dbType={this.props.dbType}/>

            <AddUserModal modalOpen={this.state.addUserModalOpened}
                          closeModal={() => {
                              this.setState({addUserModalOpened: false})
                              this.getNames()
                          }} dbType={this.props.dbType}/>
            {this.state.isLoading || this.state.networkError ? null :
                <Button onPress={() => this.setState({addUserModalOpened: true})}
                        title={""} buttonStyle={style.addButton}
                        icon={<MaterialIcons name={"add"} size={26} color={"white"}/>}/>}
        </View>;
    }

    private renderView() {
        if (this.state.isLoading)
            return <ProgressBarAndroid indeterminate={true}/>
        else if (this.state == null || this.state.people.length == 0)
            return <Text style={style.error}>{"No Data"}</Text>
        else if (!this.state.isLoading)
            return this.renderList()
        else if (this.state.networkError)
            return <Text style={style.error}>{"Server Down \n Or \n Network Error"}</Text>
    }

    private async getNames() {
        try {
            this.setState({isLoading: true, networkError: false});
            let data = await fetch(this.baseUrl + url.names);
            if (!data.ok) {
                ToastAndroid.show("No Internet Connection", ToastAndroid.LONG);
                return;
            }
            let json = await data.json()
            console.log(json)
            this.setState({people: json, isLoading: false, networkError: false});
        }
        catch (e) {
            this.setState({networkError: true});
        }
    }


    private renderList() {
        // @ts-ignore
        return <FlatList
            data={this.state.people}
            extraData={this.state}
            onRefresh={() => this.getNames()}
            refreshing={this.state.isLoading}
            renderItem={({item}: any) => {
                console.log(item)
                return < ListItem
                    title={item.name}
                    rightElement={
                        <Badge value={item.imageCount + ""} containerStyle={style.countBadge}/>
                    }
                    onPress={() => {
                        this.actionSheet.show()
                        this.setState({pressedName: item.name + ""})
                    }
                    }
                    bottomDivider={true}
                    chevron={true}
                />
            }
            }
            showsVerticalScrollIndicator={true}
            keyExtractor={({item}: any) => item + ""}
        />
    }

    private async chooseImages(index: number) {
        if (index == 2)
            return;
        const options = {
            multiple: true,
            mediaType: "photo",
            cropping: true

        };
        try {
            let images = undefined;
            if (index == 0)
                images = await ImagePicker.openPicker(options);
            else
                images = await ImagePicker.openCamera(options);
            this.uploadImages(images);
        }
        catch (e) {
            ToastAndroid.show(e.toString(), ToastAndroid.LONG);
        }


    }

    private async uploadImages(images: Image | Image[]) {
        if (Array.isArray(images)) {
            this.setState({images: images, uploadModalOpened: true});
        }
        else {
            this.setState({images: [images], uploadModalOpened: true});
        }
    }
}

