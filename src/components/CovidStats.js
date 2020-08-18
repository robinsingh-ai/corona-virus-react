import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./CovidStats.css";

function CovidStats({ title, cases, color, active, total, ...props }) {
  return (
    <div className="covidstats">
      <Card
        onClick={props.onClick}
        className={`${active} covidstattop__${color} my-1 mx-2 `}
      >
        <CardContent>
          <Typography color="textSecondary" className="covidstats__category">
            {title}
          </Typography>
          <h2 className={`covidstat__color${color}  "covidstats__cases"`}>
            {cases}
          </h2>
          <Typography className="covidstats__totalcases" color="textPrimary">
            Total :{total}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default CovidStats;
