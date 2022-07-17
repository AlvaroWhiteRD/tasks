import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigation/tabs';
import { DBContextProvider } from './src/contexts/DBContext';
import { InitDatabase } from './src/database/Connection';
;
//

export default function App()  {  

  /*useEffect(async() => {   
    await InitDatabase();   
  }, []);*/

  useEffect(function() {
    async function fetchData(){
      await InitDatabase(); 
    }
    fetchData();
}, []);

  return (
      
      <DBContextProvider>
        <NavigationContainer>
          <Tabs/>
        </NavigationContainer>
      </DBContextProvider>

     
   
    );
  }