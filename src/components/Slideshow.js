import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const spanStyle = {
  padding: "20px",
  background: "#efefef",
  color: "#000000",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "100% auto",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "90vh",
};
const slideImages = [
  {
    url: "https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.6435-9/106784463_324570238940439_5571421982430967525_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=e3f864&_nc_ohc=Gupd5ZMuITMAX_7BSzw&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfABI2iKeXjAovhCBy7FUB7Kt3AajZ7wewnoSFAq5za74Q&oe=654203D1",
    // caption: "Slide 1",
  },
  {
    url: "https://cdn.skatedeluxe.com/thumb/KiA5YJ8j6JnfxRLB-6OZCjK31aU=/fit-in/0x0/content/kategoriebilder/summer2022/cat-skateboards-790x300.jpg",
    // caption: "Slide 2",
  },
  {
    url: "https://f5-zpcloud.zdn.vn/6837458964246438050/f490434c2de9eeb7b7f8.jpg",
    // caption: "Slide 3",
  },
];
export const Slideshow = () => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            >
              {/* <span style={spanStyle}>{slideImage.caption}</span> */}
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};
