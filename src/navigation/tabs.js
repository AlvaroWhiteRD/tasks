import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen  from '../screens/HomeScreen';
import CompletedScreen  from '../screens/CompletedScreen';
import TaskAddScreen from '../screens/TaskAddScreen';

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window"); //evitamos que la barra de navegacion suba al escribir en un input

const CustomTabBarButton = ({children, onPress})=>
  (
  
      <TouchableOpacity
         style={{
             top:-18,
             justifyContent:'center',
             alignItems:'center',
             ... style.shadow,
         }}
             onPress={onPress}
         >
         <View 
             style={{
                 width:70,
                 height:70,
                 borderRadius:35,
                 backgroundColor:'#e32f45'
                 }}
             >
             {children}
         </View>
     </TouchableOpacity>
   
  );


const Tabs = ()=>{
    return ( 
        <View style={{
            width,
            height,
        }}>

<Tab.Navigator 
        screenOptions={{            
            tabBarShowLabel:false,
            //headerShown:false,
            //keyboardHidesTabBar: false,
            //tabBarHideOnKeyboard :false,
            tabBarStyle:{
                position:'absolute',
                bottom:25,
                left:20,
                right:20,
                elevation:0,
                backgroundColor:'#ffffff',
                borderRadius:15,
                height:60,
                ... style.shadow,
                
        },
        }}       
        >
            <Tab.Screen name="Home" component={HomeScreen} 
            options={({navigation})=>({
                title:'Mis tareas',
                headerStyle:{backgroundColor:'#222f3e'},
                headerTitleStyle:{color: '#ffffff'},
                headerRight:()=>(
                    <TouchableOpacity onPress={()=>navigation.navigate('AddTaks')}>
                        <Text style={{color:'#32CD32', marginRight:20, fontSize:15 }}>Nueva Tarea</Text>
                    </TouchableOpacity>
                ),
                tabBarIcon:({focused})=>(
                   <View style={{alignItems:'center', justifyContent:'center', top:10}}>
                        <Image
                            source={require('../assets/icons/home.png')}
                            resizeMode='contain'
                            style={{
                                width:25,
                                height:25,
                                tintColor:focused ? '#e32f45' : '#748c94'

                            }}
                            />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize:12}}>HOME</Text>
                   </View>     
                )
                
                
            })
            }/>

             <Tab.Screen name="AddTaks" component={TaskAddScreen} options={{
                 title:'Agregar Tareas',
                 headerStyle:{backgroundColor:'#222f3e'},
                 headerTitleStyle:{color: '#ffffff'},
                 tabBarIcon:({focused})=>(
                   
                         <Image
                            source={require('../assets/icons/add.png')}
                            resizeMode='contain'
                            style={{
                                width:30,
                                height:30,
                                tintColor:'#fff'

                            }}
                    /> 
                   
                ),
                 
              tabBarButton:(props)=>{
                   return <CustomTabBarButton {...props}/>
                }
            }}
            />
            <Tab.Screen name="completedTasks" component={CompletedScreen} 
            options={{
                title:'Tareas Completadas',
                headerStyle:{backgroundColor:'#222f3e'},
                headerTitleStyle:{color: '#ffffff'},
                  tabBarIcon:({focused})=>(
                   <View style={{alignItems:'center', justifyContent:'center', top:10}}>
                        <Image
                            source={require('../assets/icons/setting.png')}
                            resizeMode='contain'
                            style={{
                                width:25,
                                height:25,
                                tintColor:focused ? '#e32f45' : '#748c94'

                            }}
                            />
                        <Text style={{color: focused ? '#e32f45' : '#748c94', fontSize:12}}>Completas</Text>
                   </View>     
                ),
                
            }}
            />

        </Tab.Navigator> 
        </View>
        
    );
}

const style = StyleSheet.create({
    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
    }
});

export default Tabs;