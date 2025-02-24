import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

const Library = () => {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAudiobooks = async () => {
      setLoading(true);
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("Please log in to view your audiobooks.");
        setLoading(false);
        return;
      }

      try {
        const token = await user.getIdToken();
        const response = await fetch("http://localhost:5000/audiobooks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setAudiobooks(data);
        } else {
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        console.error("Failed to fetch audiobooks:", error);
        alert("Could not load audiobooks. Please try again.");
      }

      setLoading(false);
    };

    fetchAudiobooks();
  }, []);

  const filteredAudiobooks = audiobooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-content container">
      <h1 className="text-center my-4">Your Audiobooks</h1>
      <input
        type="search"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-control mb-4"
      />
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : audiobooks.length === 0 ? (
        <p className="text-center">No audiobooks found.</p>
      ) : filteredAudiobooks.length === 0 ? (
        <p className="text-center">No matching audiobooks found.</p>
      ) : (
        <div className="row">
          {filteredAudiobooks.map((book) => (
            <div key={book.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm p-3 rounded">
                <h3 className="card-title">{book.title}</h3>
                <p className="card-text">{book.summary}</p>
                <audio controls className="w-100">
                  <source src={book.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;