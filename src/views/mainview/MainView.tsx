import * as React from "react";
import {FlatList, ProgressBarAndroid, Text, ToastAndroid, View} from "react-native";
import styles from "./styles";
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import {ListItem} from "react-native-elements";
//ts-ignore
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import url from "../../constants";
import RNFetchBlob from 'rn-fetch-blob'


type State={
    names:any,
    isLoading:boolean
}
export default class MainView extends React.Component<any,State>{


    actionSheet: any;
    pressedName:string;

    constructor(props: Readonly<any>) {
        super(props);
        this.state={names:[],isLoading:false}
        this.pressedName="";
    }

    componentWillMount(){
       this.getNames();
    }

    render(){
        return <View style={styles.container}>
            {this.state.isLoading?<ProgressBarAndroid indeterminate={true}/>:this.renderList()}
            <ActionSheet
                ref={(o:any) => this.actionSheet = o}
                title={<Text style={{color: '#ff1947', fontSize: 18}}>Choose Image From</Text>}
                options={['From Gallery','From Camera','Cancel']}
                cancelButtonIndex={2}
                onPress={(index:number) => {
                    this.chooseImages(index);
                }}
            />
        </View>;
    }

    private async getNames(){
        this.setState({isLoading:true});
        let data=await fetch(url.NAMES);
        if(!data.ok) {
            ToastAndroid.show("No Internet Connection",ToastAndroid.LONG);
            return;
        }
        let json=await data.json()
        console.log(json)
        this.setState({names:json,isLoading:false});
    }

    private renderList() {
        return <FlatList
            data={this.state.names}
            extraData={this.state}
            renderItem={({item}) =>
                <ListItem title={item+""}
                          onPress={()=>{
                              this.actionSheet.show()
                              this.pressedName=item+"";
                          }}
                          bottomDivider={true}
                          chevron={true}
                          badge={{value:item+""}}
                />
            }
            showsVerticalScrollIndicator={true}
            keyExtractor={({item})=>item+""}
        />
    }

    private async chooseImages(index:number) {
        if(index==2)
            return;
        const options={
            multiple: true,
            mediaType: "photo",
            cropping:true

        };
        let images=undefined;
        if(index==0)
            images=await ImagePicker.openPicker(options);
        else
            images=await ImagePicker.openCamera(options);
        this.uploadImages(images);


    }

    private async uploadImages(images:Image|Image[]){
        let rnfetch;
        if(Array.isArray(images)) {
            for (const image of images) {
                if (this.pressedName != ""){

                }
                    rnfetch = await RNFetchBlob.fetch('POST', url.UPLOAD_IMAGE + this.pressedName,
                        {'Content-Type': 'multipart/form-data'}, [{
                            name: 'file',
                            filename: "ramzi.png",
                            data: RNFetchBlob.wrap(image.path)
                        }])
            }
        }
        else{
            await RNFetchBlob.fetch('POST', url.UPLOAD_IMAGE + this.pressedName,
                {'Content-Type': 'multipart/form-data'},
                [{
                    name: 'file',
                    filename: 'image.' + images.mime,
                    data: RNFetchBlob.wrap(images.path)
                }])
        }

    }
}

