import React from "react";
import numeral from "numeral";
import {Circle,Popup} from "react-leaflet";
import './Map.css';

const casesTypeColors={
cases:{
hex:"#cc1034",
multiplier:100,

},
recovered:{
hex:"#7dd71d",
multiplier:200,
},
deaths:{
hex:"#fb4443",
multiplier:200,

},

};



export const sortData =(data)=>{
const sortData=[...data];

sortData.sort((a,b)=>{
if(a.cases > b.cases){
	return -1;

}
else{
	return 1;
}


})

return sortData;

};






export const prettyPrintStat=(stat)=>
stat ? `+{numeral(stat).format("0.0a")}` : "+0";



//draw circle on the map
export const showDataOnMap=(data,casesType="cases")=>(
data.map(country=>(
<Circle
center={[country.countryInfo.lat, country.countryInfo.long]}
fillOpacity={0.2}
color={casesTypeColors[casesType].hex}
fillColor={casesTypeColors[casesType].hex}
radius={
Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier

}

>

<Popup>
<div className="info_container">
<div className="info_flag" style={{ backgroundImage:`url(${country.countryInfo.flag})` }} />
<div className="info_name">{country.country}</div>
<div className="info_confiremed">Cases:{numeral(country.cases).format("0.0")}</div>
<div className="info_recovered">Recovered:{numeral(country.recovered).format("0.0")}</div>
<div className="info_deaths">Deaths:{numeral(country.death).format("0.0")}</div>



</div>
</Popup>

</Circle>

	))

);