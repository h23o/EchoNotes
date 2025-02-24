import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import "../global.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleCreateClick = () => {
    navigate(user ? "/create" : "/login");
  };

  const scrollToSteps = () => {
    const stepsSection = document.getElementById("steps-section");
    const offset = 30; // Extra padding after scrolling
    if (stepsSection) {
      const y = stepsSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* First Section */}
      <section className="home-section text-center page-content">
  <img src="/echo-icon.png" alt="EchoNotes Logo" className="logo" />
  <h1 className="title">EchoNotes</h1>
  <h2 className="subtitle">Learn with your eyes closed.</h2>
  <p className="description">
    Convert your lecture notes into audiobooks with AI-powered summaries.
  </p>
  <div className="button-container">
    <button className="btn btn-dark createnow-btn" onClick={handleCreateClick}>
      Create Now
    </button>
  </div>

  {/* Scroll Down Button */}
  <div className="scroll-down-container">
    <button className="scroll-down-btn" onClick={scrollToSteps}>
      ▼
    </button>
  </div>
</section>

      {/* How to Get Started */}
      <section className="steps-section" id="steps-section">
        {/* Create Audiobook Section (Flipped) */}
        <div className="guide-card flipped">
          <div className="card-content">
            <h3>Create Your Audiobook</h3>
            <p>
              Simply upload your lecture files, select your preferred level of
              detail for the summary, and choose from our natural-sounding AI
              voices. We'll handle the conversion instantly!
            </p>
          </div>
          <div className="card-image-container">
            <img src="/create.png" alt="Create Process" className="card-image" />
          </div>
        </div>
      </section>

      {/* Search & Manage Section */}
      <section className="features-section">
        <div className="guide-card">
          <div className="card-image-container">
            <img src="/search.png" alt="Search Feature" className="card-image" />
          </div>
          <div className="card-content">
            <h3>Manage Your Library</h3>
            <p>
              Easily search through your audiobook collection, filter by title or
              date, and download your files for offline listening. Your entire
              learning library at your fingertips.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
