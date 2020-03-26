import React, { Component } from 'react';
import { View, Text,TouchableOpacity,TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';

export default class Storage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name:'',
    };
    this.readStorage();
  }
  updateName=async()=>{
     await AsyncStorage.setItem('name',this.state.name);
  }
  readStorage=async()=>{
    let name=await AsyncStorage.getItem('name');
    this.setState({name});
  }
  clearStorage=async()=>{
        // await AsyncStorage.clear();
        await AsyncStorage.removeItem('name');
  }
  componentDidMount(){
    AsyncStorage.getItem('name').then(v=>{
            console.log('name: ',v);
            
    }).catch(v=>{
        
    });
  }
  render() {
    return (
      <View>
<LottieView source={require('../../assets/json/17722-love-box.json')} autoPlay loop style={{height:300,width:300,backgroundColor:'green'}} />


        <TextInput style={{backgroundColor:'green',fontSize:20,color:'white'}} onChangeText={(value)=>{
                console.log(value);
                this.setState({name:value});
        }} />
        <TouchableOpacity onPress={()=>{
            this.updateName();
        }}><Text>Update name</Text></TouchableOpacity>
        <Text style={{color:'red',fontSize:35}}> {this.state.name?this.state.name:'Storage'} </Text>


        <TouchableOpacity onPress={()=>{
            this.clearStorage();
        }}><Text style={{fontSize:35}}>clear storage</Text></TouchableOpacity>


      </View>
    );
  }
}
