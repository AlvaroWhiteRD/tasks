import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, StatusBar, Animated, Switch } from 'react-native'
import Layout from '../components/Layout'
import { UseDbContext } from '../contexts/DBContext';//solo fue para prueba no se usa. se deja como referencia para luego usarlo :)
import { DeleteTask, GetDBConnection, GetTasks, UpdateTasks } from '../database/Connection';
import TimeAgo  from '../sources/timeago';
import { useIsFocused, useNavigation } from "@react-navigation/native";

const HomeScreen = () => {

  const [tasks, setTasks] = useState([]);
  const isFocused = useIsFocused(); // propiedad de la navegacion para actualizar la pagina
  const  [db, setDb] = useState(null);

  
  async function fetchData(){
    try{
     const db = await GetDBConnection();
     const data = await GetTasks(db);
     setTasks(data)
     setDb(db)

    }catch(error){
      console.log(error + " mi error");
    }
   
    }
    
  useEffect(function() {
    fetchData();
  }, [ isFocused ]);//isFocused refrezcar vista al navegar
    

  const SPARCING = 20;
  const ITEM_SIZE = 70 + SPARCING * 3;
  const ScrollY = React.useRef(new Animated.Value(0)).current;

  const HandleDelete=async(id)=>{
     await DeleteTask(db, id);
     await fetchData();
  }
const UpdateTask= async(id)=>{
  await UpdateTasks (db, id, 0);
  await fetchData();
}
  return (
      <Layout >
        <View style={{flex:1,
          flex: 0.8,
          borderRadius: 25,
          marginTop: 15,
          
      }} >       
          <Animated.FlatList
            data={tasks} 
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: ScrollY}}}],
              {useNativeDriver: true},
            )}
            keyExtractor={(item)=>item.id + ''}
           //bloque  const para la animacion 
            contentContainerStyle={{
              padding:SPARCING,
              paddingTop:StatusBar.currentHeight || 42
            }}
            renderItem={({item, index})=>{
              const inputRange =[
                -1,
                 0,
                 ITEM_SIZE * index,
                 ITEM_SIZE * (index + 2),

              ]
              const OpacityInputRange =[
                -1,
                 0,
                 ITEM_SIZE * index,
                 ITEM_SIZE * (index + .5),

              ]

              const scale = ScrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });
              const opacity = ScrollY.interpolate({
                inputRange: OpacityInputRange,
                outputRange: [1, 1, 1, 0],
              });
              //fin bloque  const para la animacion  
              return <Animated.View style={{ 
                       //flexDirection: 'row',
                       width:375, 
                       height:125,
                      //bloque efecto del flast-list
                        padding:SPARCING, 
                        marginBottom:10, 
                        backgroundColor:'rgba(255,255,255,0.8)',
                        borderRadius:14,
                        shadowColor:'#000',
                        shadowOffset: {
                          width:0, height:10
                        },
                        shadowOpacity: .3,
                        shadowRadius:SPARCING,
                        opacity,
                        transform:[{scale}]
                        //fin bloque efecto del flast-list
                        }}>
                         <View>
                         <View>
                              <Text numberOfLines={1} ellipsizeMode="tail"                            
                                  style={{fontSize:SPARCING, fontWeight:'700', padding:5}}>{item.description.substring(0, 35)}</Text>
                                <Text style={{fontSize:12, opacity: .7}}><TimeAgo timestamps={item.time} /></Text>
                          
                             </View>
                         <View style={{height:50,width:50}} >                           
                             <TouchableOpacity 
                                onPress={() => UpdateTask(item.id)}
                             >
                              <Image
                               source={require('../assets/icons/cheque.png')}
                               style={styles.imgComplete}
                              />
                             </TouchableOpacity>
                          </View> 
                             
                        </View>
                          <View style={{alignSelf:'flex-end', top:-40 }}>                           
                             <TouchableOpacity style={{backgroundColor:'#ee5253', padding:7, borderRadius:7}}
                                onPress={() => HandleDelete(item.id)}
                             >
                                 <Text style={{ color: "#fff", alignItems:'center', fontSize:12 }}>Eliminar</Text>

                             </TouchableOpacity>
                          </View> 
                        
                           
                    </Animated.View>
            }}
          />
        </View>       
      </Layout>
  )
}

const styles = StyleSheet.create({
  imgComplete: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    alignSelf:'flex-start', 
    top:.4
  }
});

export default HomeScreen