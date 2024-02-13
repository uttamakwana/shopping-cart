import { useState } from "react";
import {
  featured1,
  featured2,
  featured3,
  featured4,
  featured5,
  featured6,
} from "../../constants/images";
import "./banner.css";
import { useEffect } from "react";

const images = [
  featured1,
  featured2,
  featured3,
  featured4,
  featured5,
  featured6,
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlide, setIsSlide] = useState(true);
  let slidingInterval;

  useEffect(() => {
    slidingInterval = setInterval(() => {
      if (isSlide) {
        if (currentSlide === 5) {
          setCurrentSlide(0);
        } else {
          setCurrentSlide(currentSlide + 1);
        }
      }
    }, 10000);

    return () => clearInterval(slidingInterval);
  });

  const stopSliding = () => {
    setIsSlide(false);
  };

  const startSliding = () => {
    setIsSlide(true);
  };

  // function handleSlide(index) {
  //   setCurrentSlide(index);
  // }

  return (
    <section className="banner small-container">
      <div className="banner-images relative">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            className="featured-image"
            alt={`featured-image-${index + 1}`}
            onMouseEnter={stopSliding}
            onMouseLeave={startSliding}
            style={{ display: currentSlide === index ? "block" : "none" }}
          />
        ))}
        {/* Below code is for the buttons to go for a particular image */}
        {/* <div className="banner-images-buttons">
          {...Array(images.length)
            .fill(null)
            .map((_, index) => (
              <button
                className={`banner-images-button ${
                  currentSlide === index ? "active" : ""
                }`}
                key={index}
                onClick={() => handleSlide(index)}
              ></button>
            ))}
        </div> */}
      </div>
    </section>
  );
};

export default Banner;
