import React from "react";

import "./LocationOptions.css";

//temporary hard-coded location buttons
const LocationOptions = (props) => {
  const options = [
    { 
    text: "Brisbane Grove", 
    handler: props.actionProvider.handleLoc0,
    id: 1,
    },
    { 
    text: "Port of Brisbane", 
    handler: props.actionProvider.handleLoc1,
    id: 2,
    },
    {
    text: "South Brisbane", 
    handler: props.actionProvider.handleLoc2,
    id: 3,
    },
    {
    text: "Brisbane City", 
    handler: props.actionProvider.handleLoc3,
    id: 4,
    },
    {
    text: "Brisbane Airport", 
    handler: props.actionProvider.handleLoc4,
    id: 5,
    },
    {
    text: "East Brisbane", 
    handler: props.actionProvider.handleLoc5,
    id: 6,
    },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="location-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="location-options-container">{optionsMarkup}</div>;
};

export default LocationOptions;