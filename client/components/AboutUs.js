import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { purple } from "@mui/material/colors";

const AboutUs = () => {
  return (
    <div className="accordionWrapper">
    <div className="accordion">
      <Accordion sx={{bgcolor:'#659DBD', color:'text.secondary'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Armand Arslanian</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          As the front-end UI/UX developer I was largely responsible for
          styling the majority of the application. Thought was put into the
          color palette, font, text and image choices that would best invoke
          the theme of 'freshness'. Please enjoy our application, great new
          recipe ideas await you!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{bgcolor:'#659DBD', color:'text.secondary'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Arthur Loefstedt</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
              Arthur came to coding after a career sleeping in holes and walking
              in the woods. Upon the realization that chairs are comfortable, he
              quickly signed up for a career which emphasized the use of chairs
              and air conditioning. Arthur spends his time exploring his new
              career as well as flying Blackhawks in the Army Reserve.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{bgcolor:'#659DBD', color:'text.secondary', }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Lionel Verrier</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography>
              A newly minted father, Lionel’s coding journey began on his final
              day as a carpenter when he fell off a roof while earning a low
              wage. As if he needed more of a sign, an email from Fullstack
              Academy was waiting for him at lunch time. He enjoys keeping
              livestock, gardening, plotting to corner his local chicken market
              and now challenging himself in the web development realm.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    </div>
  );
}

export default AboutUs;
