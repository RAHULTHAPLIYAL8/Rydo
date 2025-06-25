import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationSearchPanel = (props) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (props.searchQuery && props.searchQuery.trim() !== "") {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: props.searchQuery },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setSuggestions(res.data);
        })
        .catch((err) => {
          console.error(err);
          setSuggestions([]);
        });
    } else {
      setSuggestions([]);
    }
  }, [props.searchQuery]);

  return (
    <div>
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, key) => (
          <div
            key={key}
            onClick={() =>{props.handleSuggestionSelect(suggestion.description);setSuggestions([])}}
            className="flex items-center active:border p-3 rounded-xl justify-start my-4 cursor-pointer"
          >
            <h2 className="bg-[#eee] h-10 w-10 p-2 me-2 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h3 className="font-medium">{suggestion.description}</h3>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-14 text-center">No suggestions found</p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
