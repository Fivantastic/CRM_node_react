import { useEffect, useRef, useState } from "react";
import "./filterPages.css";

export const FilterPages = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (option) => {
    const updatedOptions = {
      ...selectedOptions,
      [option.value]: !selectedOptions[option.value]
    };
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
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

  console.log(selectedOptions);

  return (
    <div className="filter-menu" ref={dropdownRef}>
      <button onClick={toggleMenu} className="filter-button">
        {Object.values(selectedOptions).some(val => val) ? (
          <img src="./filterPagesSoft.svg" alt="Black Filter Icon" />
        ) : (
          <img src="./filterPages.svg" alt="Filter Icon" />
        )}
      </button>
      {isOpen && (
        <div className="options-container">
          {options.map((option) => (
            <label key={option.value} className="filter-label">
              <input
                className="filter-checkbox"
                type="checkbox"
                value={option.value}
                checked={selectedOptions[option.value] || false}
                onChange={() => handleCheckboxChange(option)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
