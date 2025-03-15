import img1 from "../img/img1.png";

import img2 from "../img/img2.png";

import img3 from "../img/img3.png";

import img4 from "../img/img4.jpg";

export const Comments = [
  {
    imgUrl: img1,
    name: "Andrew",
    comment: "Cute ❤❤",
    reply:[{
        img: img1,
    name: "Andrew",
    reply: "Cute ❤❤"
    }]
  },

  {
    imgUrl: img2,
    name: "Hulk Buster",
    comment: "Lovely photographr",
    reply:[]
  },

  {
    imgUrl: img3,
    name: "Hannah",
    comment: "Awesome photograph",
    reply:[{
        img: img1,
    name: "Andrew",
    reply: "Cute ❤❤"
    }]
  },

  {
    imgUrl: img4,
    name: "Montana",
    comment: "Cute",
    reply:[]
  },
];
