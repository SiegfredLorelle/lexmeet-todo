import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ({ toggleListsSection }) => {
  return (
    <>
      <header className="header">
        <div className="header-left">
          {/* <button className="hamburger-menu" onClick={toggleListsSection}>
            <FontAwesomeIcon icon={faBars} />
          </button> */}
          <img src="logo.png" alt="Logo" />
          <h1 className="header-title">ToDo dudu</h1>
        </div>
      </header>
    </>
  );
};

export default Header;
