import React ,{Component} from "react";
import {  Text, View,TouchableOpacity,StyleSheet,Dimensions } from "react-native";
import Global from "../../providers/Global";
import TextField from "../../components/TextField";

const HEIGHT=Dimensions.get('window').height;
const WIDTH=Dimensions.get('window').width;

let namesArray=['prashant','achal','ganesh'];

const Myname=(props)=><Text style={styles.textColor}>{props.name}</Text>


export default class Home extends Component{
getName=(p)=>{
    console.log('hello im codegrabs: ',p);
}
    render(){
    return (
        <View style={{}}>
        <View style={styles.mainWrapper}>

            <View style={styles.namesWrapper}>

            {namesArray.map((item,index)=>{
                console.log('item: ',item);
                return <Myname key={index} name={item} />
            })}
            </View>
            <View style={{flex:1,backgroundColor:'green',height:100}}>
                    <TextField value="ganesh" />
                    <TextField style={{color:'red'}} value="akash" />
            </View>
          
        
        </View>
          <View style={{marginTop:'10%'}}>
          <TouchableOpacity style={{backgroundColor:'black',borderRadius:50,alignItems:'center',paddingVertical:10,width:'90%',alignSelf:'center'}}
          onPress={()=>{this.getName('hello')}}
          ><TextField value="Press here" /></TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:'black',width:'10%',alignItems:'center',alignSelf:'center',marginTop:'5%',width:WIDTH*0.5}}><TextField value="x" /></TouchableOpacity>
      </View>
</View>
    );
    }
}

const styles=StyleSheet.create({
    ...Global,
    namesWrapper:{flex:1,backgroundColor:'black',alignItems: 'center',},
    mynameText:{color:'red',fontSize:28},
    mainWrapper:{backgroundColor:'green',flexDirection:'row'}

})
