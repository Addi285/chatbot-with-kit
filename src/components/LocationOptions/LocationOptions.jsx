import React from "react";

import "./LocationOptions.css";

const LocationOptions = (props) => {
  const options = [
    { 
    text: "Brisbane Grove", 
    handler: props.actionProvider.handleLoc1,
    id: 1,
    },
    { text: "Port of Brisbane", handler: () => {}, id: 2 },
    { text: "South Brisbane", handler: () => {}, id: 3 },
    { text: "Brisbane City", handler: () => {}, id: 4 },
    { text: "Brisbane Airport", handler: () => {}, id: 5 },
    { text: "East Brisbane", handler: () => {}, id: 6 },
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