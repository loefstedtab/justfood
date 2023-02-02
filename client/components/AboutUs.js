import { all } from "axios";
import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

const AboutUs = () => {

  const [open, setOpen] = useState('0');

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const AccordionStyling = {
    borderStyle: 'solid'
  }

  const AccordionHeaderStyling = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    margin: 0,
    borderBottom: 'solid'
  };

  const AccordionBodyStyling = {
    paddingLeft: 5,
    borderBottom: 'solid'
  };

  const AccordionHeaderStylingSteph = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    margin: 0,
    borderBottom: 'none'
  }

    return (
      <div>
        <h2>About Just Food: </h2>
        <p className='text-primary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi bibendum neque egestas congue quisque egestas. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Venenatis lectus magna fringilla urna porttitor rhoncus dolor. Magna etiam tempor orci eu lobortis elementum nibh. Amet aliquam id diam maecenas. Nunc aliquet bibendum enim facilisis gravida. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Massa placerat duis ultricies lacus sed turpis. Sollicitudin tempor id eu nisl nunc mi. Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan. Tellus id interdum velit laoreet id donec ultrices. Integer enim neque volutpat ac tincidunt vitae semper quis. Nunc vel risus commodo viverra. Elementum eu facilisis sed odio. Odio euismod lacinia at quis risus sed vulputate odio ut. Sed turpis tincidunt id aliquet risus.</p>
        <h2>Meet the Team: </h2>

      <Accordion open={open} toggle={toggle} style={AccordionStyling}>

        <AccordionItem >
          <AccordionHeader targetId="1" style={AccordionHeaderStyling}>Armand Arslanian </AccordionHeader>
          <AccordionBody accordionId="1" style={AccordionBodyStyling}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet bibendum. Semper eget duis at tellus at. Malesuada pellentesque elit eget gravida cum sociis natoque. Tellus orci ac auctor augue mauris augue neque gravida. Pellentesque nec nam aliquam sem et tortor consequat id. Et odio pellentesque diam volutpat commodo sed. Volutpat sed cras ornare arcu dui vivamus. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Leo urna molestie at elementum eu facilisis. Ut consequat semper viverra nam libero justo. Pharetra magna ac placerat vestibulum lectus mauris. Nisl purus in mollis nunc sed id.
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="2" style={AccordionHeaderStyling}>Arthur Loefstedt </AccordionHeader>
          <AccordionBody accordionId="2" style={AccordionBodyStyling}>
            Eros in cursus turpis massa tincidunt dui ut ornare lectus. Aliquet eget sit amet tellus cras adipiscing enim eu. Ac orci phasellus egestas tellus rutrum tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. A diam sollicitudin tempor id. Rhoncus aenean vel elit scelerisque. Duis ut diam quam nulla porttitor massa. Augue neque gravida in fermentum et sollicitudin. Rutrum tellus pellentesque eu tincidunt tortor. Enim facilisis gravida neque convallis a cras semper auctor. Lorem dolor sed viverra ipsum nunc aliquet. In dictum non consectetur a. Pharetra sit amet aliquam id diam maecenas. Laoreet non curabitur gravida arcu ac tortor dignissim convallis aenean. Ut pharetra sit amet aliquam id diam maecenas. Amet tellus cras adipiscing enim eu turpis egestas pretium aenean. Condimentum mattis pellentesque id nibh tortor id. Nibh sed pulvinar proin gravida hendrerit. Ultrices gravida dictum fusce ut placerat orci.
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="3" style={AccordionHeaderStyling}>Salvador Fierro </AccordionHeader>
          <AccordionBody accordionId="3" style={AccordionBodyStyling}>
            Netus et malesuada fames ac turpis egestas integer eget aliquet. Quis viverra nibh cras pulvinar. Tristique sollicitudin nibh sit amet. Urna duis convallis convallis tellus id. Ut venenatis tellus in metus vulputate eu scelerisque felis. Erat velit scelerisque in dictum non. Donec ultrices tincidunt arcu non sodales neque sodales. Tristique et egestas quis ipsum suspendisse. Nibh sed pulvinar proin gravida hendrerit. Est placerat in egestas erat imperdiet sed. Pulvinar sapien et ligula ullamcorper malesuada proin. Ullamcorper a lacus vestibulum sed arcu non odio. Vel fringilla est ullamcorper eget. Eu sem integer vitae justo. Nunc vel risus commodo viverra maecenas. Ac turpis egestas sed tempus urna et. Senectus et netus et malesuada fames ac.
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="4" style={AccordionHeaderStyling}>Lionel Verrier </AccordionHeader>
          <AccordionBody accordionId="4" style={AccordionBodyStyling}>
            Risus quis varius quam quisque id diam. Suscipit tellus mauris a diam maecenas sed enim ut. Lorem ipsum dolor sit amet consectetur adipiscing elit. Magnis dis parturient montes nascetur ridiculus mus mauris. Nec nam aliquam sem et. Enim sit amet venenatis urna cursus eget nunc scelerisque. At ultrices mi tempus imperdiet. Mollis aliquam ut porttitor leo a. Ultrices sagittis orci a scelerisque purus semper eget duis at. Arcu ac tortor dignissim convallis. Tortor dignissim convallis aenean et tortor at risus. Nulla pharetra diam sit amet. Diam sit amet nisl suscipit adipiscing bibendum est ultricies. Feugiat pretium nibh ipsum consequat nisl. Semper quis lectus nulla at volutpat diam ut venenatis tellus. Viverra suspendisse potenti nullam ac tortor vitae. Massa massa ultricies mi quis hendrerit.
          </AccordionBody>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader targetId="5" style={AccordionHeaderStylingSteph}>Stephanie Kwong </AccordionHeader>
          <AccordionBody accordionId="5" style={AccordionBodyStyling}>
            Enim sit amet venenatis urna cursus. Ornare arcu odio ut sem nulla pharetra diam. Id ornare arcu odio ut sem nulla pharetra diam. Facilisis gravida neque convallis a cras semper auctor. Orci nulla pellentesque dignissim enim sit amet venenatis urna. Sed egestas egestas fringilla phasellus faucibus. Tristique sollicitudin nibh sit amet commodo nulla. Aliquam eleifend mi in nulla posuere sollicitudin aliquam. At auctor urna nunc id cursus. Fames ac turpis egestas maecenas. Semper eget duis at tellus at urna condimentum mattis.
          </AccordionBody>
        </AccordionItem>

      </Accordion>
    </div>
    )
}

export default AboutUs;
