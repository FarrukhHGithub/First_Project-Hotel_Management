import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BasicBars from "./Charts.jsx/Chart";
import BasicBars1 from "./Charts.jsx/Chart2";
import BasicBars2 from "./Charts.jsx/Chart3";

export default function Dashboard() {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Card sx={{ marginLeft: "5%" }}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        style={{ textColor: "orange" }}
      >
        <Tab label="Rooms " />
        <Tab label="Hotels " />
        <Tab label="Booking" />
      </Tabs>
      <CardContent>
        {tabIndex === 0 && (
          <>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "#222831", fontSize: "18px" }}
            >
              The Graphical Presentation of How Many Hotels, Rooms Added and
              Removed from Lists
            </Typography>
            <BasicBars />
          </>
        )}
        {tabIndex === 1 && (
          <>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "#222831", fontSize: "18px" }}
            >
              The Graphical Presentation of Total Earnings and Expenses (like
              Staff Salaries, Electricity Bills, Water Bills, etc.)
            </Typography>
            <BasicBars1 />
          </>
        )}
        {tabIndex === 2 && (
          <>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "#222831", fontSize: "18px" }}
            >
              The Graphical Presentation of Where Most of Our Honorable Guests
              Come From
            </Typography>
            <BasicBars2 />
          </>
        )}
      </CardContent>
    </Card>
  );
}
