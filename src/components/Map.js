import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataonMap } from "../mapInfo";

function Map({ country, casesType, center, zoom }) {
  console.log(country);
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataonMap(country, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
