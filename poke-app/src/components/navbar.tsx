import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/getpoke">GetPoke</Link>
      <Link to="/chat">Chat</Link>
    </div>
  );
}
