import React, { useState } from "react";

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <>
    <div>
      <header>
        <h1 className="missionTitle">Our Mission</h1>
        <p className="missionStatement">Just Food is the ultimate solution for all your meal planning woes! Whether you're a busy professional, a home cook, or just someone who loves to explore new recipes, Just Food is here to make your life easier and more delicious.
With Just Food, you can find amazing meals that match your taste preferences and dietary restrictions. Simply enter your favorite ingredients, dietary needs, and preferred cuisine, and Just Food will provide you with a wide selection of delicious and healthy meal options to choose from. You can also browse through our vast collection of recipes, curated by expert chefs and nutritionists, to discover new and exciting dishes that you never knew existed.
But that's not all! Just Food also makes it easy to find meals based on the ingredients you have on hand. Whether you're in the mood for something sweet or savory, spicy or mild, Just Food has got you covered. Simply enter the ingredients you have in your pantry or fridge, and Just Food will provide you with a list of mouth-watering recipes that you can make right away.
With Just Food, you can say goodbye to the stress and frustration of meal planning and hello to a world of delicious, healthy, and easy-to-make meals. So what are you waiting for? Download Just Food today and start cooking up a storm!</p>
      </header>
    </div>
    <div className="center">
      <section id="item1">
        <a href="#item1" onClick={() => handleClick(0)}>
          Armand Arslanian
        </a>
        {activeIndex === 0 && (
          <p>
            As the front-end UI/UX developer I was largely responsible for styling the majority of the application. Thought was put into the color palette, font, text and image choices that would best invoke the theme of 'freshness'. Please enjoy our application, great new recipe ideas await you!
          </p>
        )}
      </section>
      <section id="item2">
        <a href="#item2" onClick={() => handleClick(1)}>
          Arthur Loefstedt
        </a>
        {activeIndex === 1 && (
          <p>
            Arthur came to coding after a career sleeping in holes and walking in the woods. Upon the realization that chairs are comfortable, he quickly signed up for a career which emphasized the use of chairs and air conditioning. Arthur spends his time exploring his new career as well as flying Blackhawks in the Army Reserve.
          </p>
        )}
      </section>
      <section id="item3">
        <a href="#item3" onClick={() => handleClick(2)}>
          Stephanie Kwong
        </a>
        {activeIndex === 2 && (
          <p>
Hi! My name is Stephanie, and I’m a front-end developer with a passion for building user-friendly applications. My expertise in HTML, CSS, and JavaScript, along with my experience working with front-end frameworks such as React, has enabled me to create a polished and intuitive user interface that makes it easy for users to find the recipes they want.          </p>        )}
      </section>
      <section id="item4">
        <a href="#item4" onClick={() => handleClick(3)}>
          Salvador Fierro
        </a>
        {activeIndex === 3 && (
          <p>
            Hi! My name is Salvador & I recently graduated from a software bootcamp. I’m excited to continue my education in the field of software development. In my time in the bootcamp, I gained practical experience in a variety of programming languages, tools and technologies, which I am eager to put into practice. I’m passionate about learning new things and enjoy taking on challenges that allow me to grow.
          </p>
        )}
      </section>
      <section id="item5">
        <a href="#item5" onClick={() => handleClick(4)}>
          Lionel Verrier
        </a>
        {activeIndex === 4 && (
          <p>
            A newly minted father, Lionel’s coding journey began on his final day as a carpenter when he fell off a roof while earning a low wage. As if he needed more of a sign, an email from Fullstack Academy was waiting for him at lunch time. He enjoys keeping livestock, gardening, plotting to corner his local chicken market and now challenging himself in the web development realm.
          </p>
        )}
      </section>
    </div>
    </>
  );
};
export default AboutUs;
