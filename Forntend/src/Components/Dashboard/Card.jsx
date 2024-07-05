/* eslint-disable no-unused-vars */
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import styled from "@emotion/styled";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Doughnut, Line, Bar, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  RadialLinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  RadialLinearScale
);

const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

function CustomCard() {
  return (
    <ThemeProvider theme={{}}>
      <Grid
        container
        spacing={3}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Hotels
              </Typography>
              <Typography variant="h4" component="h2" color="textPrimary">
                40
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Rooms
              </Typography>
              <Typography variant="h4" component="h2" color="textPrimary">
                200 per Hotel
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Bookings
              </Typography>
              <Typography variant="h4" component="h2" color="textPrimary">
                100
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ margin: "1.67rem", minWidth: 50 }}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item md={12}>
                  <Line
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: true,
                          text: "Bookings",
                        },
                      },
                    }}
                    data={{
                      labels: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                      ],
                      datasets: [
                        {
                          label: "Earnings in $",
                          data: [0, 10000, 5000, 15000, 13000, 22000, 33000],
                          fill: false,
                          borderColor: "rgb(75, 192, 192)",
                          tension: 0.1,
                        },
                      ],
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ margin: "1.67rem", minWidth: 50 }}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item md={12}>
                  <Bar
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: true,
                          text: "Users",
                        },
                      },
                    }}
                    data={{
                      labels: ["A", "B", "C", "D", "E"],
                      datasets: [
                        {
                          label: "Data",
                          data: [12, 19, 3, 5, 2],
                          backgroundColor: [
                            "rgb(255, 99, 132)",
                            "rgb(54, 162, 235)",
                            "lightgreen",
                            "rgb(255, 205, 86)",
                            "rgb(75, 192, 192)",
                          ],
                        },
                        {
                          label: "Data",
                          data: [20, 30, 8, 9, 9],
                          backgroundColor: [
                            "rgb(255, 95, 100)",
                            "rgb(54, 160, 100)",
                            "lightgreen",
                            "rgb(255, 100, 70)",
                            "rgb(20, 155, 200)",
                          ],
                        },
                      ],
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ margin: "1.67rem", minWidth: 50 }}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item md={12}>
                  <Doughnut
                    options={{
                      responsive: true,
                      plugins: {
                        title: {
                          display: true,
                          text: "Hotels",
                        },
                      },
                    }}
                    data={{
                      labels: ["Direct", "Referral", "Social"],
                      datasets: [
                        {
                          data: [55, 30, 15],
                          backgroundColor: [
                            "rgb(255, 99, 132)",
                            "rgb(54, 162, 235)",
                            "lightgreen",
                          ],
                          hoverOffset: 4,
                        },
                      ],
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ margin: "1.67rem", minWidth: 50 }}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item md={12}>
                  <PolarArea
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: true,
                          text: "Rooms",
                        },
                      },
                    }}
                    data={{
                      labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
                      datasets: [
                        {
                          label: "Data",
                          data: [11, 16, 7, 3, 14],
                          backgroundColor: [
                            "rgb(255, 99, 132)",
                            "rgb(54, 162, 235)",
                            "lightgreen",
                            "rgb(255, 205, 86)",
                            "rgb(153, 102, 255)",
                          ],
                        },
                      ],
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default CustomCard;
