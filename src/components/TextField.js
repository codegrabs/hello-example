import React from "react";
import {  Text, StyleSheet } from "react-native";

const TextField=(props)=>{
return <Text  {...props} style={{color:'white',fontSize:30,...props.style}} >{props.value}</Text>
}

export default TextField;

