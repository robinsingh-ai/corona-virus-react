import React from "react";
import "./Tabel.css";
// import numeral from "numeral";
import { preetyStat } from "../preetystat";
function Tabel({ countries }) {
  return (
    <div className="tabel my-4">
      <tr className="tabel__categories">
        <td>
          <strong>Country</strong>
        </td>
        <td>
          <strong>Active</strong>
        </td>
        <td>
          <strong>Deaths</strong>
        </td>
        <td>
          <strong>Recovered</strong>
        </td>
      </tr>
      {countries.map(({ country, cases, recovered, deaths }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{preetyStat(cases)}</strong>
          </td>
          <td>
            <strong>{preetyStat(deaths)}</strong>
          </td>
          <td>
            <strong>{preetyStat(recovered)}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Tabel;
