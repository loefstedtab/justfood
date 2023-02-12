import { all } from'axios';
import React, { useState } from 'react';

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleClick = index => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };
  
  return (
    <div className='center'>
      <section id='item1'>
        <a href='#item1' onClick={() => handleClick(0)}>
          Armand Arslanian
        </a>
        {activeIndex === 0 && (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt vel
            beatae consequatur suscipit vero magnam nulla molestias alias
            praesentium atque, commodi error quis, unde aliquam distinctio
            blanditiis! Beatae, temporibus reprehenderit!
          </p>
        )}
      </section>
      <section id='item2'>
        <a href='#item2' onClick={() => handleClick(1)}>
          Arthur Loefstedt
        </a>
        {activeIndex === 1 && (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt vel
            beatae consequatur suscipit vero magnam nulla molestias alias
            praesentium atque, commodi error quis, unde aliquam distinctio
            blanditiis! Beatae, temporibus reprehenderit!
          </p>
        )}
      </section>
      <section id='item3'>
        <a href='#item3' onClick={() => handleClick(2)}>
          Stephanie Kwong
        </a>
        {activeIndex === 2 && (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt vel
            beatae consequatur suscipit vero magnam nulla molestias alias
            praesentium atque, commodi error quis, unde aliquam distinctio
            blanditiis! Beatae, temporibus reprehenderit!
          </p>
        )}
      </section>
      <section id='item4'>
        <a href='#item4' onClick={() => handleClick(3)}>
          Salvador Fierro
        </a>
        {activeIndex ===3 && (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt vel
            beatae consequatur suscipit vero magnam nulla molestias alias
            praesentium atque, commodi error quis, unde aliquam distinctio
            blanditiis! Beatae, temporibus reprehenderit!
          </p>
        )}
      </section>
      <section id='item5'>
        <a href='#item5' onClick={() => handleClick(4)}>
          Lionel Verrier
        </a>
        {activeIndex === 4 && (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt vel
            beatae consequatur suscipit vero magnam nulla molestias alias
            praesentium atque, commodi error quis, unde aliquam distinctio
            blanditiis! Beatae, temporibus reprehenderit!
          </p>
        )}
      </section>
    </div>
  );
};
export default AboutUs;