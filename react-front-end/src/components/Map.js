import React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "./App.css";
import { Icon } from "leaflet";
import useSwr from "swr";
import axios from "axios";
import { features } from "../SFNeighborhoods-copy.json"
// import { features } from "./bayareacounties.json"


// const fetcher = (...args) => fetch(...args).then((response) => response.json());

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const icon = new Icon({
  iconUrl: "/building.png",
  iconSize: [25, 25],
});

export const groceriesIcon = new Icon({
  iconUrl: "/groceries.png",
  iconSize: [25, 25],
});

function Mapp() {

  const ratingsUrl = 'http://localhost:8080/api/reviews/area_ratings'
  const { datas, errors } = useSwr(ratingsUrl, { fetcher });
  const ratings = datas && !errors ? datas : [];

  console.log('THIS SHIT')
  console.log(ratings)
  // const getAreaRatings = () => {
  //   axios.get(ratingsUrl)
  //   .then((res) => {
  //     const allAreaRatings = res.data;
  //   })
  // }


  
  const url = "https://data.sfgov.org/resource/ramy-di5m.json";
  const { data, error } = useSwr(url, { fetcher });
  const buildings = data && !error ? data.slice(0, 100) : [];

  console.log('THAT SHIT')
  console.log(buildings)

  const SFHoodData = features

  // const countyData = features

  const onEachFeature = function(feature, layer) {
    if (feature.properties && feature.properties.name)
    layer.bindPopup(feature.properties.name) //How to add more content to the popup?!? Add component here?
  }

  // r = rating 
  const getColor = (r) => {
    return r === "1" ? 'red' : 
    r === "2" ? 'yellow' :
    r === "3" ? 'blue' :
    r === "4" ? 'green' :
    r === "5" ? 'orange' :
                'gray';
  }

  const mapStyle = (feature) => {
    return {
      fillColor: getColor(feature.properties.rating),
      weight: 0.5,
      color: "black",
    }
  };

  const amenities = [
    {
      id: 1,
      area_id: 1,
      name:"Potato Shop", 
      type:"Groceries", 
      image_url: null,
      longitude: -122.399165, 
      latitude: 37.620430000000100
    },
    {
      id: 2,
      area_id: 1,
      name:"Tomato Shop", 
      type:"Groceries", 
      image_url: null,
      longitude: -122.39439100100000, 
      latitude: 37.78668401700000
    },
    {
      id: 3,
      area_id: 1,
      name:"Ice Cream Shop", 
      type:"Groceries", 
      image_url: null,
      longitude: -122.416759954, 
      latitude: 37.77959003500010
    },

  ]

  return (

    <MapContainer center={[37.760955, -122.441475]} zoom={13}>
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {buildings.map((building) => (
        <Marker
          key={building.eas_fullid}
          position={[building.latitude, building.longitude]}
          icon={icon}
        >
          <Popup>
            <div>
              <h2>{building.address}</h2>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {amenities.map((amenity) => (
        <Marker
          key={amenity.id}
          position={[amenity.latitude, amenity.longitude]}
          icon={groceriesIcon}
        >
          <Popup>
            <div>
              <h2>{amenity.name}</h2>
            </div>
          </Popup>
        </Marker>
      ))}

      <GeoJSON
        data={SFHoodData}
        style={mapStyle}
        onEachFeature={onEachFeature}
      />
    </MapContainer>

  );
}

export default Mapp;