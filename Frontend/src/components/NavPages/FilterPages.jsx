import { useEffect, useRef, useState } from 'react';
import './filterPages.css';

export const FilterPages = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (option) => {
    const currentIndex = selectedOptions.indexOf(option.value);
    const newSelectedOptions = [...selectedOptions];

    if (currentIndex === -1) {
      newSelectedOptions.push(option.value);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions); // Pasar un array de valores seleccionados
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-menu" ref={dropdownRef}>
      <button onClick={toggleMenu} className="filter-button">
        {Object.values(selectedOptions).some((val) => val) ? (
          <img src="/filterPagesSoft.svg" alt="Black Filter Icon" />
        ) : (
          <img src="/filterPages.svg" alt="Filter Icon" />
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
                checked={selectedOptions.includes(option.value)}
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
