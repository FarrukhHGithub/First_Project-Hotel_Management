/* eslint-disable no-unused-vars */
import React from "react";
import { Typography, Grid } from "@mui/material";
import CustomCard from "./Card";

function Dashboard() {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography
          variant="h4"
          color="textPrimary"
          gutterBottom
          textAlign={"center"}
          marginBottom={6}
        >
          Dashboard
        </Typography>
        <CustomCard />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
