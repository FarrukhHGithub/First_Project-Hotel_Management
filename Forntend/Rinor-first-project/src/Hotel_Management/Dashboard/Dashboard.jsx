import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BasicBars from './Charts.jsx/Chart';
import BasicBars1 from './Charts.jsx/Chart2';
import BasicBars2 from './Charts.jsx/Chart3';

export default function Dashboard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{marginTop:"5%", marginLeft:"5%"}}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1bh-content"
      id="panel1bh-header"
    >
      <Typography sx={{ width: '40%', flexShrink: 0, height:70, color: '#222831', fontSize: '18px' }}>
    The Graphical Presentaion of How Many Hotels,Rooms Add and Also Show How Many Remove Form Lists
</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <BasicBars />
    </AccordionDetails>
  </Accordion>

  <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{marginTop:"5%", marginLeft:"5%"}}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2bh-content"
      id="panel2bh-header"
    >
      <Typography sx={{ width: '40%', flexShrink: 0, height:70, color: '#222831', fontSize: '18px' }}>
      The Graphical Presentaion of Total Earnings and Expenses (like Staffs Salaries, Electicity Bills, Water Bills Etc)
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
    </AccordionDetails>
    <BasicBars1 />
  </Accordion>

  <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{marginTop:"5%", marginLeft:"5%"}}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3bh-content"
      id="panel3bh-header"
    >
      <Typography sx={{ width: '40%', flexShrink: 0, height:70, color: '#222831', fontSize: '18px' }}>
      The Graphical Presentaion of, Where Most Of Our Honouarable Guestes Come From 
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
    </AccordionDetails>
    <BasicBars2 />
  </Accordion> 
</div>
  );
}
