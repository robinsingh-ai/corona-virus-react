import React, { useState, useEffect } from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import CovidStats from "./components/CovidStats";
import Map from "./components/Map";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Tabel from "./components/Tabel";
import { sortData } from "./sorting";
// import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";
import { preetyStat } from "./preetystat";

function App() {
  const [country, setcountry] = useState([]);
  const [countryInfo, SetcountryInfo] = useState({});
  const [TabelData, setTabelData] = useState([]);
  const [count, setcount] = useState("worldwide");
  const [mapcenter, setmapcenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [mapzoom, setmapzoom] = useState(3);
  const [mapcountries, setmapcountries] = useState([]);
  const [casesType, setcasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((Response) => Response.json())
      .then((data) => {
        SetcountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((Response) => Response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso3,
          }));

          const sortedData = sortData(data); 
          setcountry(countries);
          setmapcountries(data);
          setTabelData(sortedData); 
        });
    };
    getCountries();
  }, []);

  

  const OnchountryChange = async (event) => {
    const CountryCode = event.target.value;

    console.log(CountryCode);

    setcount(CountryCode);

    const url =
      CountryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${CountryCode}`;

    await fetch(url)
      .then((Response) => Response.json())
      .then((data) => {
        setcount(CountryCode);

        SetcountryInfo(data);
        setmapcenter([data.countryInfo.lat, data.countryInfo.long]);
      });
  };

  console.log(countryInfo);

  return (
    <div className="App">
      <div className="container-fluid my-3 ">
        <div className="row">
          <div className="col-lg-9">
            <div className="app__header">
              <h1>
                covid-19 tracker
                <a
                  className="mx-5  text-center"
                  href="https://www.who.int/health-topics/coronavirus#tab=tab_1"
                >
                  More Info
                </a>
              </h1>

              <FormControl className="app__dropdown">
                <Select
                  variant="outlined"
                  value={count}
                  onChange={OnchountryChange}
                >
                  <MenuItem value="worldwide">WorldWide</MenuItem>
                  {country.map((country) => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* map */}
            <Map
              casesType={casesType}
              country={mapcountries}
              center={mapcenter}
              zoom={mapzoom}
            />
          </div>
          <div className="col-lg-3 ">
            <div className="app__stats">
              <h2 className="text-center">Daily Cases</h2>
              <CovidStats
                color="red"
                active={casesType === "cases"}
                onClick={(e) => setcasesType("cases")}
                cases={preetyStat(countryInfo.todayCases)}
                total={preetyStat(countryInfo.active)}
                title="Active Cases"
              />
              <CovidStats
                color="black"
                active={casesType === "deaths"}
                onClick={(e) => setcasesType("deaths")}
                cases={preetyStat(countryInfo.todayDeaths)}
                total={preetyStat(countryInfo.deaths)}
                title="Deaths Cases"
              />
              <CovidStats
                color="green"
                active={casesType === "recovered"}
                onClick={(e) => setcasesType("recovered")}
                total={preetyStat(countryInfo.recovered)}
                cases={preetyStat(countryInfo.todayRecovered)}
                title="Recovered Cases"
              />
            </div>
            
          </div>
          <div className="col-md-12">
            <Card>
              <CardContent>
                <Tabel countries={TabelData} />
              </CardContent>
            </Card>
            <div className="row my-4 ">
              <div className="col-md-3 my-3 who__posters ">
                <img
                  className="img-fluid"
                  src="https://www.who.int/images/default-source/health-topics/coronavirus/social-media-squares/be-ready-social-2.jpg"
                  alt="poster img 1"
                />
              </div>
              <div className="col-md-3 my-3 who__posters">
                <img
                  className="img-fluid"
                  src="https://www.who.int/images/default-source/health-topics/coronavirus/risk-communications/general-public/protect-yourself/blue-3.png?sfvrsn=b1ef6d45_2"
                  alt="poster img 1"
                />
              </div>
              <div className="col-md-3 my-3 who__posters">
                <img
                  className="img-fluid"
                  src="https://www.who.int/images/default-source/health-topics/coronavirus/risk-communications/general-public/protect-yourself/blue-1.png?sfvrsn=3d15aa1c_2"
                  alt="poster img 1"
                />
              </div>
              <div className="col-md-3 my-3 who__posters">
                <img
                  className="img-fluid"
                  src="https://www.who.int/images/default-source/health-topics/coronavirus/risk-communications/general-public/protect-yourself/blue-2.png?sfvrsn=2bc43de1_2"
                  alt="poster img 1"
                />
              </div>
              <div className="col-md-6 my-3 who__posters">
                <img
                  className="img-fluid"
                  src="https://www.who.int/images/default-source/health-topics/coronavirus/eng-mythbusting-ncov-(19).tmb-1920v.png"
                  alt="poster img 1"
                />
              </div>
              <div className="col-md-6 my-3 who__posters">
                <img
                  className="img-fluid"
                  src="https://www.who.int/images/default-source/health-topics/coronavirus/eng-mythbusting-ncov-(13).tmb-1920v.png"
                  alt="poster img 1"
                />
              </div>
              <div className="col-md-6 my-3 who__posters">
                <img
                  className="img-fluid"
                  src="https://www.who.int/images/default-source/health-topics/coronavirus/risk-communications/home-care-posters/home-care-everyone-a4-covid.png"
                  alt="poster img 1"
                />
              </div>
              <div className="col-md-6 my-3 who__posters">
                <img
                  className="img-fluid"
                  src="https://www.who.int/images/default-source/health-topics/coronavirus/risk-communications/home-care-posters/home-care-ill-people-a4-covid.png"
                  alt="poster img 1"
                />
              </div>
              <div className="col-md-6 my-3 who__posters">
                <img
                  className="img-fluid"
                  src="https://www.who.int/images/default-source/health-topics/coronavirus/eng-mythbusting-ncov-(30).tmb-1920v.png"
                  alt="poster img 1"
                />
              </div>
              <div className="col-md-6 my-3 who__posters">
                <img
                  className="img-fluid"
                  src="https://www.who.int/images/default-source/health-topics/coronavirus/eng-mythbusting-ncov-(33).tmb-1920v.png"
                  alt="poster img 1"
                />
              </div>
            </div>

            <div className="footer text-center">
              <a className="" href="https://github.com/robin025">
                <GitHubIcon className="github__logo" />
              </a>
              <h3>&copy;2020 Robin Singh</h3>
              <p>Made using React</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
