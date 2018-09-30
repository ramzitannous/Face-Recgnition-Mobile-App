import * as React from "react";
import {AsyncStorage, FlatList, ProgressBarAndroid, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
//ts-ignore
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet'
import {Badge, Button, Header, ListItem} from "react-native-elements";
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/dist/Entypo'
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import url, {BLACKLIST_URL, KEY, WHITELIST_URL} from "../../constants";
import MyModal from "../modal/MyModal";
import styles from "../modal/style";
import UploadModal from "../upload/UploadModal";
import style from "./style";

type State = {
    people: [],
    isLoading: boolean,
    images: Image[],
    uploadModalOpened: boolean,
    pressedName: string,
    addUserModalOpened: boolean,
    networkError: boolean,
    urlModalOpened: boolean,
    urlValue: string
}

type Props = {
    dbType: string
}

export default class BaseTab extends React.Component<Props, State> {


    private cameraSheet: any;
    private menuSheet: any;

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            people: [],
            isLoading: false,
            uploadModalOpened: false,
            images: [],
            pressedName: "",
            addUserModalOpened: false,
            urlModalOpened: false,
            networkError: false,
            urlValue: ""
        }
    }

    componentWillMount() {
        this.getNames();
    }

    render() {
        return (<View style={style.container}>
            <Header outerContainerStyles={style.header}
                    backgroundColor={"#e1e1e1"}
                    leftComponent={<Text style={styles.title}>{"Names"}</Text>}
                    rightComponent={
                        <TouchableOpacity onPress={() => this.setState({urlModalOpened: true})}>
                            <Entypo name={"dots-three-vertical"} size={22} color={"#fff"}/>
                        </TouchableOpacity>
                    }/>
            {this.renderView()}

            <UploadModal name={this.state.pressedName} images={this.state.images}
                         modalOpened={this.state.uploadModalOpened}
                         closeModal={
                             () => {
                                 this.setState({uploadModalOpened: false})
                                 this.getNames()
                             }}
                         dbType={this.props.dbType}/>

            <MyModal modalOpen={this.state.addUserModalOpened}
                     title={"Add User To " + this.props.dbType}
                     closeModal={() => {
                         this.setState({addUserModalOpened: false})
                         this.getNames()
                     }}
                     textValue={""}
                     label={"Username"}
                     onButtonPress={textValue => this.addUser(textValue)}
            />

            <MyModal modalOpen={this.state.urlModalOpened}
                     closeModal={() => this.setState({urlModalOpened: false})}
                     title={"Server Url"}
                     onShow={async () => {
                         let url = await AsyncStorage.getItem(KEY);
                         if (url)
                             this.setState({urlValue: url});
                     }}
                     onButtonPress={async textValue => {
                         await AsyncStorage.setItem(KEY, textValue);
                         ToastAndroid.show("url saved", ToastAndroid.LONG);
                     }}
                     textValue={this.state.urlValue}
                     label={"server url"}/>
            {this.state.isLoading || this.state.networkError ? null :
                <Button onPress={() => this.setState({addUserModalOpened: true})}
                        title={""} buttonStyle={style.addButton}
                        icon={<MaterialIcons name={"add"} size={44} color={"white"}/>}/>}

            <ActionSheet
                ref={(o: any) => this.cameraSheet = o}
                title={<Text style={{color: '#ff1947', fontSize: 18}}>Choose Image From</Text>}
                options={['From Gallery', 'From Camera', 'Cancel']}
                cancelButtonIndex={2}
                onPress={(index: number) => {
                    this.chooseImages(index);
                }}
            />

            <ActionSheet
                ref={(o: any) => this.menuSheet = o}
                title={<Text style={{color: '#ff1947', fontSize: 18}}>Menu</Text>}
                options={['Upload Image', 'Train Modal', 'Cancel']}
                cancelButtonIndex={2}
                onPress={(index: number) => {

                    if (index == 0) {
                        this.cameraSheet.show();
                        this.menuSheet.hide()
                    }
                    else if (index == 1) {
                        this.menuSheet.hide();
                        this.trainPerson();
                    }
                }}
            />
        </View>);
    }

    private renderView() {
        console.log(this.state.people)
        if (this.state.isLoading)
            return <ProgressBarAndroid indeterminate={true}/>

        else if (this.state.networkError)
            return <Text style={style.error}>{"Network Error"}</Text>

        else if (this.state.people == null || this.state.people.length == 0)
            return <Text style={style.error}>{"No Data"}</Text>

        else if (!this.state.isLoading)
            return this.renderList()

    }

    private async getNames() {
        try {
            this.setState({isLoading: true, networkError: false});
            let baseUrl = await AsyncStorage.getItem(KEY);
            if (baseUrl && !baseUrl.endsWith("/"))
                baseUrl = baseUrl + "/"
            const furl = baseUrl + this.props.dbType + "/" + url.names;
            let noRes = true;
            let timerId = setTimeout(() => {
                if (noRes)
                    this.setState({networkError: false, isLoading: false});
            }, 10000);
            let res = await fetch(furl);

            if (!res.ok) {
                ToastAndroid.show("No Internet Connection", ToastAndroid.LONG);
                return;
            }
            else {
                noRes = false;
                clearTimeout(timerId);
            }
            let json = await res.json();
            this.setState({people: json, isLoading: false, networkError: false});
        }
        catch (e) {
            this.setState({networkError: true, isLoading: false});
        }
    }


    private renderList() {
        // @ts-ignore
        return <FlatList
            style={style.list}
            data={this.state.people}
            extraData={this.state}
            onRefresh={() => this.getNames()}
            refreshing={this.state.isLoading}
            renderItem={({item, index}: any) => {
                return < ListItem
                    title={item.name}
                    rightElement={<Badge value={item.imageCount + ""} containerStyle={style.countBadge}/>}
                    onPress={() => {
                        this.menuSheet.show()
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

    private async addUser(textValue: string) {
        console.log(textValue)
        try {
            let baseUrl = await AsyncStorage.getItem(KEY);
            if (baseUrl && !baseUrl.endsWith("/"))
                baseUrl = baseUrl + "/"
            const furl = baseUrl + this.props.dbType + "/" + url.addName;
            let res = await fetch(furl, {
                method: 'POST',
                body: JSON.stringify({
                    name: textValue
                })
                ,
                headers: {}
            })
            if (res.ok)
                ToastAndroid.show("User Added", ToastAndroid.LONG);
        }
        catch (e) {
            ToastAndroid.show(e.toString(), ToastAndroid.LONG);
        }
    }

    private async trainPerson() {

    }
}

