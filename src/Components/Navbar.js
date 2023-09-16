import React from 'react';
import { FaGithubSquare } from 'react-icons/fa';
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <span>elhattabidev.online</span>
      </div>
      <div className="icon">
        <a href="https://github.com/ELHATTABIHamza" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none', color:'inherit'}}>
          <FaGithubSquare />
        </a>
      </div>
    </div>
  )
}

export default Navbar;
