import React, { createContext, useContext, useEffect, useState } from "react";
import { CreateTables, GetDBConnection } from "../database/Connection";
import { Text } from 'react-native';

const DBContext = createContext();

export function UseDbContext(){
    return useContext(DBContext);
}

export  function DBContextProvider({children}){
    console.log("estoy DBContext");
    const [isLoading, setIsloading] = useState(true);
    const [db, setDb] = useState(null);
//console.log("estoy aqui");
    useEffect(function() {
        let _db = null;
            async  function GetConnection(){
                _db = await GetDBConnection()
                await CreateTables(_db);
                setDb(_db);
                setIsloading(false);
            }
            GetConnection();
            return function(){
                if(_db!==null){
                    _db.close();
                }
            }
    }, []);
            
    if(isLoading){
        return <Text>Cargando...</Text>
    }  
    return <DBContext.Provider value={db}>{children}</DBContext.Provider>
}