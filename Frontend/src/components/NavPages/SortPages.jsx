import { useEffect, useRef, useState } from "react";
import "./sortPages.css"; // Estilo CSS para el menú desplegable

export const SortPages = ({ options, onSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    if (selectedOption === option) {
      // Si se hace clic en la opción seleccionada, la deselecciona
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
      onSort(option); // Llama a la función de ordenamiento
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
    <div className="sort-dropdown" ref={dropdownRef}>
      <div className="dropdown-toggle" onClick={toggleMenu}>
        {selectedOption ? (
          <img src="./sortSoft.svg" alt="Boton de ordenamiento" />
        ) : (
          <img src="./sort.svg" alt="Boton de ordenamiento" />
        )}
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`dropdown-option ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};