import React from "react";
import { Link } from "react-router-dom";

// TODO: Use material-ui 'AppBar'

export default function Navbar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/pokesearch">PokeSearch</Link>
      <Link to="/todo">Chat</Link>
    </div>
  );
}
