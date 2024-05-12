import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import firestore from "@react-native-firebase/firestore"
import { Appbar, Button, TextInput } from "react-native-paper"
import { useEffect, useState } from "react"
import Activity from "./Activity"
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer"

const App = () =>{
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)
    const ToDo = firestore().collection("todos")
    async function addTodo(){
        await ToDo.add({
            title: todo,
            complete: false
        });
        setTodo('');
    }
    useEffect(()=>{
        return ToDo.onSnapshot(querySnapshot => {
            const mytodolist = [];
            querySnapshot.forEach(doc => {
                const {title, complete} = doc.data();
                mytodolist.push({
                    id: doc.id,
                    title,
                    complete
                });
            });
            setTodos(mytodolist);
            //console.log(activitys);
            if(loading){
                setLoading(false);
            }
        });
    });
    if(loading){
        return null;
    }
    //console.log(activitys);
    return(
        <SafeAreaView>
            <View>
                <Appbar>
                    <Appbar.Content title={'TODOs List'}/>
                </Appbar>
                <FlatList
                    data={todos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Activity {...item}/>}
                />
                <TextInput label={'New Todo'} value={todo} onChangeText={setTodo}/>
                <Button onPress={addTodo}>Add ToDo</Button>
            </View>
        </SafeAreaView>
    )
}
export default App;