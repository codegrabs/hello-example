import React, {Component} from 'react';
import {View, Text,FlatList,Image, TouchableOpacity, ActivityIndicator,Modal} from 'react-native';
import Api from '../../providers/Api';
import AsyncStorage from '@react-native-community/async-storage';



const Catlog = props => {
  return (
    <View style={{flexDirection:'row',paddingVertical:20}}>
        <TouchableOpacity style={{
            // backgroundColor:'red'
            }}
            onPress={()=>{
                props.selectedImage(props.item);
            }}
            >
        <Image
        source={{uri: props.item.thumbnailUrl}}
        style={{width: 200, height: 200,borderRadius:30}}
        // defaultSource={require('../../assets/img/test.jpg')}
        initialNumToRender={2}
      />
        </TouchableOpacity>
     

      <View>
        <Text>{props.item.title}</Text>
        <Text>Price: {50} rs</Text>
        <TouchableOpacity style={{backgroundColor:props.selectedItems.includes(props.item.id)?'red':'pink',padding:20,width:100,borderRadius:40,alignItems:'center'}} 
        onPress={()=>{
           props.push(props.item.id);
        }}
        >
            <Text>{props.selectedItems.includes(props.item.id)?'selected':'select'}</Text>
            {props.item.status?<ActivityIndicator animating={false} size="large" color="#0000ff" />:<></>}
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedItems:[],
      modalVisible:false,
      selectedData:{}
    };
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  getMoviesFromApi = async () => {
    try {
      let responseJson = await Api.get('photos');
      this.setState({data: responseJson}, () => {});
      // console.log('this.state.data: ', this.state.data);
    } catch (error) {
      console.error(error);
    }
  };

  postme =async()=>{
      let data=await Api.post('posts',{
        title: 'foo',
        body: 'bar',
        userId: 1
      });

      console.log('posts data: ',data);
      
  }
  componentDidMount() {
    this.getMoviesFromApi();
    this.postme();
    //    console.log('data: ',data);
  }

updateCatlog=(id)=>{
    if(!this.state.selectedItems.includes(id)){
        let selectedItems= [...this.state.selectedItems];
        selectedItems.push(id);
      this.setState({selectedItems:selectedItems})
    }else{
        let selectedItems= [...this.state.selectedItems];
        console.log('id: ',id,' selectedItems: ',selectedItems);
        
        selectedItems.splice(selectedItems.indexOf(id),1);
            console.log('remove selectedItems: ',selectedItems);
            
        this.setState({selectedItems});
    }
}



  render() {
    return (
      <View>
           <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
        <Text>{this.state.selectedData.title}</Text>
        <Image
        source={{uri: this.state.selectedData.thumbnailUrl}}
        style={{width: 300, height: 400,borderRadius:30}}
        defaultSource={require('../../assets/img/test.jpg')}
        initialNumToRender={2}
      />
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <Catlog
           item={item}
           selectedItems={this.state.selectedItems}
          push={(id)=>{
             this.updateCatlog(id);
          }} 

          selectedImage={(item)=>{
                this.setState({selectedData:item,modalVisible:true});
          }}

          />
        }
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
