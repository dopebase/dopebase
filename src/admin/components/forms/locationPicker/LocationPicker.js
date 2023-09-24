import React from "react";
import Geosuggest from "react-geosuggest";

/* Default position */
const defaultPosition = {
  lat: 37.77,
  lng: -122.41,
};

function IMLocationPicker(props) {
  const { onLocationChange, initialValue } = props;

  return (
    <Geosuggest
      // location={defaultPosition}
      // radius={1000000}
      autoComplete="off"
      initialValue={initialValue}
      onSuggestSelect={onLocationChange}
    />
  );
}

export default IMLocationPicker;
