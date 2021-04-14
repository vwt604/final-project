import React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "./App.css";
import { Icon } from "leaflet";
import axios from "axios";

export const groceriesIcon = new Icon({
  iconUrl: "/groceries.png",
  iconSize: [25, 25],
});

function AmenMap() {

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
    </MapContainer>

  );
}

export default AmenMap;