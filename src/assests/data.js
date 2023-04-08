import cricket from "./images/rooms/cricket.jpg";
import badminton from "./images/rooms/badminton.jpg";
import basketball from "./images/rooms/basketball.jpg";
import football from "./images/rooms/football.jpg";
import Tennis from "./images/rooms/tennis.jpg";
import kabaddi from "./images/rooms/kabaddi.jpg";
import volleyball from "./images/rooms/volleyball.jpg";

export const sports = [
  {
    name: "Cricket",
    minPlayer: "11",
    maxPlayer: "15",
    image: cricket,
  },
  {
    name: "Football",
    minPlayer: "11",
    maxPlayer: "15",
    image: football,
  },
  {
    name: "Basketball",
    minPlayer: "5",
    maxPlayer: "10",
    image: basketball,
  },
  {
    name: "Volleyball",
    minPlayer: "6",
    maxPlayer: "12",
    image: volleyball,
  },
  {
    name: "Badminton",
    minPlayer: "2",
    maxPlayer: "4",
    image: badminton,
  },
];
export const interestsList = [
  "Cricket",
  "Football",
  "Basketball",
  "Volleyball",
  "Badminton",
];

export const rooms = [
  {
    name: "Room 1",
    description: "This is room 1",
    maxPeople: 5,
    joined: false,
  },
  {
    name: "Room 2",
    description: "This is room 2",
    maxPeople: 10,
    joined: false,
  },
  {
    name: "Room 3",
    description: "This is room 3",
    maxPeople: 7,
    joined: false,
  },
];
