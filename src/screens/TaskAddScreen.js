import React, { useState, useEffect } from 'react'
import { TextInput, Button, Dimensions, View, Text, FlatList, StyleSheet, TouchableOpacity, Image, StatusBar, Animated, KeyboardAvoidingView } from 'react-native'
import Layout from '../components/Layout'
import { UseDbContext } from '../contexts/DBContext';
import { CreateTables, GetDBConnection, GetTaskId, GetTasks, InitDatabase, SaveTask } from '../database/Connection';
import TimeAgo  from '../sources/timeago';


 

const TaskAddScreen = ({navigation, route}) => {console.log(route.params);
  const SPARCING = 20;
  const ITEM_SIZE = 70 + SPARCING * 3;
  const ScrollY = React.useRef(new Animated.Value(0)).current;
  const RenderTasks = ({ tasks }) => (
    <View>
      <Text style={styleSheet.itemsText}>{tasks}</Text>
    </View>
  );

    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    //const  [db, setDb] = useState(null);
   
    useEffect(function() {
      async function fetchData(){
       
        try{
          const db = await GetDBConnection();
          const data = await GetTasks(db);
          setTasks(data)          
        }catch(error){
          console.log(error + " mi error");
        }
        }
        fetchData();
  }, []);

    function HandleDescriptionChage(description){
        setDescription(description);
    }
    async function AddTask(){
        if(description == ''){
            return;
        }  
        try{
           // const db = UseDbContext();
            const db = await GetDBConnection();
            //await CreateTables(db);
            await SaveTask(db, description);
            const data = await GetTasks(db);
            setTasks(data);
            setDescription('');
            alert('exitoso..' + description)
            navigation.navigate('Home');
        }catch(e){ 
            console.log(e.message + " este es el error");
        } 
    }
    
    return (
        <Layout>
         
            <Text style={styles.title}>Nueva Tarea</Text>
            <View style={styles.container} width={Dimensions.get('window').width - 60 }>
                <View >
                    <TextInput style={styles.input} 
                      placeholderTextColor="#fff"
                      placeholder="Agregar nueva tarea"
                      onChangeText={HandleDescriptionChage}
                      value={description}
                      returnKeyType={'done'}
                      autoCorrect={false} />
                </View>
               
             <TouchableOpacity style={styles.buttonSave} onPress={AddTask}>
                     <Text style={styles.buttonText}>Guardar Tarea</Text>
            </TouchableOpacity>
            </View>
        </Layout>
    )
}

const styles = StyleSheet.create({
  
    title: {
      color: '#fff',
      fontSize: 25,
      marginTop: 2, 
      fontWeight: '500',
      textAlign: "center",
    },
    input:{
      width: "90%",
      marginBottom: 15,
      fontSize: 16,
      borderWidth: 1,
      borderColor: "#fff",
      height: 40,
      textAlign: "center",
      padding: 4,
      borderRadius: 15,
      color: "#fff",
      marginTop:40      
    },
    buttonSave: {
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 15,
      marginBottom: 3,
      backgroundColor: "#10ac84",
      width: "90%"

    },
    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: 'bold'
    },
    /*input: {
      padding: 20,
      fontSize: 14,
      fontWeight: '300',
      color: "#222f3e",

    },*/
    inputBox: {
      borderBottomWidth: 0.5,
      borderBottomColor: '#a9a9a9'
    },
  })

export default TaskAddScreen