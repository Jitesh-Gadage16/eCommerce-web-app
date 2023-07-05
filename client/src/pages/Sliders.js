import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { NavLink } from "react-router-dom";

// import './Slider.css';

function Sliders({ images }) {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,

    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };



  return (
    <div className="slider">

      <Slider {...settings} className="overflow-hidden">

        {images.map((img, index) => (
         
         <NavLink  to={`${img.categoryid}/${img.subcategoryid}`}>
            
            {console.log(img)}
           
            <div
              className="slider-div"
              key={index}
            >
              <img src={img.image} alt="" className='slider-img' />
            </div>
            </NavLink>
        ))}
      </Slider>


      {/* <div className="dots-container">
        {images.map((_, index) => (
          <span
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            key={index}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div> */}
    </div>
  );
}

export default Sliders;
