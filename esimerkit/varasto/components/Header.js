import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };
 
  return (
    <header className="Header">
      
      {(!isSmallScreen || isNavVisible) && (
        <nav className="Nav">
        <a href="/haku">Haku</a>
        <a href="/">Valikko</a>
        <a href="/">Valikko</a>
        </nav> )}
      <button onClick={toggleNav} className="Valikko">☰</button>
      <button className="Haku">🔍</button>
    </header>
  );
}

//Hakunappi, kuinka haku aukeamaan