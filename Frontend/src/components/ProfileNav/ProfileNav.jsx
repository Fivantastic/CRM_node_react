import { useState } from 'react';


export const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav id="profileNavContainer">
      <button className={`dropdown-toggle ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        <figure>
            <img className="avatarProfileNav" src="{avatar}" alt="Avatar del usuario" />
        </figure>
      </button>

      <ul className={`menuProfileNav ${isOpen ? 'open' : ''}`}>
        <li className="nameBar">
            <p>Name</p>
        </li>
        <li className="roleBar">
            <p>Role</p>
        </li>
        <li className="userSettings">
            <a href="#">Mexican</a>
        </li>
        <li className="btn-logout">
            <a href="#">Mexican</a>
        </li>
      </ul>
    </nav>
  );
};

