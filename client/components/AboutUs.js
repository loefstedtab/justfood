import { all } from "axios";
import React, { useState } from "react";

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = index => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <div>
      <h2>About Just Food: </h2>
      <p>Lorem ipsum dolor sit </p>
      <h2>Meet the Team: </h2>
      <div className="accordion">
        <div className="accordion-item">
          <button className="accordion-header" onClick={() => handleClick(0)}>
            Armand Arslanian
          </button>
          <div className={`accordionContent ${activeIndex === 0 ? 'active' : ''}`}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className="accordion-item">
          <button className="accordion-header" onClick={() => handleClick(1)}>
            Arthur Loefstedt
          </button>
          <div className={`accordionContent ${activeIndex === 1 ? 'active' : ''}`}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className="accordion-item">
          <button className="accordion-header" onClick={() => handleClick(1)}>
            Lionel Verrier
          </button>
          <div className={`accordionContent ${activeIndex === 1 ? 'active' : ''}`}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className="accordion-item">
          <button className="accordion-header" onClick={() => handleClick(1)}>
            Stephanie Kwong
          </button>
          <div className={`accordionContent ${activeIndex === 1 ? 'active' : ''}`}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className="accordion-item">
          <button className="accordion-header" onClick={() => handleClick(2)}>
            Salvador Fierro
          </button>
          <div className={`accordionContent ${activeIndex === 2 ? 'active' : ''}`}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            </div>
            </div>
            </div>
            );
          };


export default AboutUs;