import React from "react";
import firestore from "@react-native-firebase/firestore"
import { FlatList, StyleSheet, Text, View } from "react-native";
import { List, MD3Colors, Provider } from "react-native-paper";
//import Icon from '@react-native-vector-icons/material-icons';

function Activity ({id, complete, title}) {
    async function toggleComplete() {
        await firestore()
            .collection('todos')
            .doc(id)
            .update({
                complete: !complete,
            });
    }
    /*return(
        <View style= {{borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, flexDirection:'row'}}>
            <Text style={{fontSize:20,fontWeight:"bold",marginTop:10, }}>{title}</Text>
            <Icon {...props} name={complete ? 'check': 'cancel'} size={20} onPress={() => toggleComplete()}/>
        </View>
    )*/
    return(
        <List.Item
            title={title}
            onPress={() => toggleComplete()}
            left={props => (
                <List.Icon {...props} icon={complete ? 'check' : 'cancel'}/>
            )}
        />
    );
}
export default Activity;
