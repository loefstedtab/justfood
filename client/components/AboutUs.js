import React from "react";
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const AboutUs = () => {

    return (
        <>
            <h2>We are all about food! </h2>
            <h3>Mission Statement: </h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla at volutpat diam ut venenatis. Vitae nunc sed velit dignissim sodales ut eu sem. Convallis posuere morbi leo urna molestie at elementum. Aliquam sem fringilla ut morbi tincidunt. Fringilla urna porttitor rhoncus dolor purus. Eget est lorem ipsum dolor sit amet. Scelerisque eu ultrices vitae auctor eu augue ut lectus arcu. Leo vel orci porta non pulvinar neque laoreet suspendisse interdum. Integer quis auctor elit sed vulputate mi sit amet mauris. Dui vivamus arcu felis bibendum ut. Pretium lectus quam id leo in vitae turpis. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer. Nullam ac tortor vitae purus faucibus ornare.</p>

            <h4>About Us: </h4>
            <p>Armand Arslanian: </p>
            <p>Stephanie Kwong: </p>
            <p>Arthur Loefstedt: </p>
            <p>Salvador Fierro: </p>
            <p>Lionel Verrier: </p>

            <Button >Hello!</Button>

            <UncontrolledDropdown className="d-flex align-items-center" >
                <DropdownToggle className="font-weight-bold" >Learn</DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem className="font-weight-bold text-secondary text-uppercase" >Learn React</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Documentation</DropdownItem>
                  <DropdownItem>Tutorials</DropdownItem>
                  <DropdownItem>Courses</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </>

    )
}

export default AboutUs;
