import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import "../global.css"; // Import global styles

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    // Handle scroll effect
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="container">
        {/* Logo & Brand */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src="/black-icon.png" alt="Logo" className="navbar-logo" />
          <span className="navbar-title">EchoNotes</span>
        </Link>

        {/* Toggle Button (for mobile view) */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {user && (
              <>
                <li className="nav-item">
                  <Link to="/create" className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to="/library" className="nav-link">Library</Link>
                </li>
                {/* Dropdown for Settings */}
                <li className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    Settings
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/profile" className="dropdown-item">Profile</Link>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </li>
              </>
            )}
            {!user && (
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
