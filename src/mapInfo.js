import numeral from "numeral";
import React from "react";
import { Circle, Popup } from "react-leaflet";
import "./mapinfo.css";
import { preetyStat } from "./preetystat";

const casesTypeColors = {
  cases: {
    hex: "rgb(236, 114, 114)",
    rgb: "rgb(204, 16, 52)",

    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",

    multiplier: 1200,
  },
  deaths: {
    hex: "gray",

    multiplier: 2000,
  },
};

//drawing circles on the map with interactive tooltop
export const showDataonMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info__container">
          <div
            className="info__flag"
            style={{
              border: "1px solid black",
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}
          />

          <div className="info__name mt-3">
            {country.country},{country.countryInfo.iso2}
          </div>
          <div className="info__confiremed my-1">
            Cases:{numeral(country.cases).format("0,0")}
          </div>
          <div className="info__recovered my-1">
            Recovered:{numeral(country.recovered).format("0,0")}
          </div>
          <div className="info__deaths my-1">
            Deaths:{numeral(country.deaths).format("0,0")}
          </div>
          <div className="info__basic">
            CasesPerMillion:{numeral(country.casesPerOneMillion).format("0,0")}
          </div>
          <div className="info__basic">
            DeathsPerMillion:
            {numeral(country.deathsPerOneMillion).format("0,0")}
          </div>
          <div className="info__basic">
            RecoveredPerMillion:
            {numeral(country.recoveredPerOneMillion).format("0,0")}
          </div>
          <div className="info__basic">
            Population:{preetyStat(country.population)}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
