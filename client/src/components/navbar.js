import React from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <Link to="/" className="navbar-link">Home</Link>
      <Link to="/create-recipe" className="navbar-link">Create Recipe</Link>
      <Link to="/saved-recipes" className="navbar-link" >Saved Recipes</Link>
      {!cookies.access_token ? (
        <Link to="/auth" className="navbar-link">Login/Register</Link>
      ) : (
          <button className="log-button" onClick={logout} > Logout </button>
      )}
    </div>
  );
};