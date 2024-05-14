import { useEffect, useRef, useState } from "react";
import "./filterPages.css";

export const FilterPages = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    const index = selectedOptions.indexOf(option.value);
    if (index === -1) {
      setSelectedOptions([...selectedOptions, option.value]);
    } else {
      setSelectedOptions(selectedOptions.filter((value) => value !== option.value));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-menu" ref={dropdownRef}>
      <button onClick={toggleMenu} className="filter-button">
        {selectedOptions.length > 0 ? <img src="./filterPagesSoft.svg" alt="Black Filter Icon" /> : <img src="./filterPages.svg" alt="Filter Icon" />}
      </button>
      {isOpen && (
        <div className="options-container">
          {options.map((option) => (
            <label key={option.value} className="filter-label">
              <input className="filter-checkbox"
                type="checkbox"
                value={option.value}
                checked={selectedOptions.includes(option.value)}
                onChange={() => handleOptionSelect(option)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
