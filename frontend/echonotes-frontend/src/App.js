import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const pageVariants = {
  initial: { opacity: 0, scale: 0.95, y: 10 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } // easeOutQuint
  },
  exit: { 
    opacity: 0, 
    scale: 1.02, 
    y: -10, 
    transition: { duration: 0.5, ease: [0.64, 0, 0.78, 0] } // easeInQuint
  }
};




const AnimatedRoutes = () => {
  const location = useLocation(); // Detect route changes

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {[
          { path: "/", element: <Home /> },
          { path: "/create", element: <Create /> },
          { path: "/library", element: <Library /> },
          { path: "/profile", element: <Profile /> },
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ].map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
                {element}
              </motion.div>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
