import moment from 'moment';
export default function TimeAgo({timestamps}){
    const mitime = new Date(timestamps)
    /*const mitime = new Date(timestamps);

    const  fecha = mitime.getDate() + '-' + ( mitime.getMonth() + 1 ) + '-' + mitime.getFullYear();
    const  hora = mitime.getHours() + ':' + mitime.getMinutes() + ':' + mitime.getSeconds();
    const fechaYHora = fecha + ' ' + hora;*/
    //America/Santo_Domingo
   // moment.locale('es', "America/Santo_Domingo");
    const dateTimeAgo = moment(new Date(mitime)).fromNow();
    console.log(dateTimeAgo)
    return dateTimeAgo;
    /*var nacimiento = new Date(timestamps)
  var hoy = new Date()
  //var ayer = ;
  var tiempoPasado= hoy - nacimiento
  var segs = 1000;
  var mins = segs * 60;
  var hours = mins * 60;
  var days = hours * 24;
  var months = days * 30.416666666666668;
  var years = months * 12;
 
  //calculo
  var anos = Math.floor(tiempoPasado / years);
 
  tiempoPasado = tiempoPasado - (anos * years);
  var meses = Math.floor(tiempoPasado / months)
 
  tiempoPasado = tiempoPasado - (meses * months);
  var dias = Math.floor(tiempoPasado / days)
 
  tiempoPasado = tiempoPasado - (dias * days);
  var horas = Math.floor(tiempoPasado / hours)
 
  tiempoPasado = tiempoPasado - (horas * hours);
  var minutos = Math.floor(tiempoPasado / mins)
 
  tiempoPasado = tiempoPasado - (minutos * mins);
  var segundos = Math.floor(tiempoPasado / segs)
 
  return (`Hace ${meses} meses,  ${dias} dias, ${horas} horas, y ${minutos} minutos`)*/

}

/*import React, { useState } from 'react'

const DATE_UNITS = {
    day:864000,
    hour:3600,
    minute:60,
    second:1
}

const getSecondsDiff = timestamp => (Date.now() - timestamp) / 1000;


const getUnitAndValueDate = (secondsElapsed)=>{
    for(const [unit, seconsInUnit] of Object.entries(DATE_UNITS)){
        if(secondsElapsed >= seconsInUnit || unit==='second'){
            const value = Math.floor(secondsElapsed / seconsInUnit) * -1;
            
            return {value, unit}
        }

    }
}

const GetTimeAgo = (timestamp )=>{
    const rtf = new Intl.RelativeTimeFormat('es');
    const secondsElapsed = getSecondsDiff(timestamp);
    const {value, unit} = getUnitAndValueDate(secondsElapsed);
    return rtf.format(value, unit);
}

function useTimeAgo({timestamp}){
   //const locale = 'es';
    const timeAgo = GetTimeAgo(timestamp);
    const date = new Date(timestamp);

    const formatedDate = new Intl.DateTimeFormat('es',{
        month:'long', day:'numeric'
    }).format(date);

    return {
        dateTime:formatedDate,
        timeAgo
    }
}

export default function TimeAgo({timestamps}){
   // const rtf = new Intl.RelativeTimeFormat('es');
const rtf = new Date().toLocaleDateString('es', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
    const timestamp = +(new Date()) - timestamp;

    const secondsElapsed = getSecondsDiff(timestamp);

    const {value, unit} = getUnitAndValueDate(secondsElapsed);
console.log(value + " unit "+unit)
    return new Date(value).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
}*/
//const rtf = new Intl.RelativeTimeFormat('es');

//const timestamp = +(new Date()) - 3600000;

//const secondsElapsed = getSecondsDiff(timestamp);

//const {value, unit} = getUnitAndValueDate(secondsElapsed);

//rtf.format(value, unit)