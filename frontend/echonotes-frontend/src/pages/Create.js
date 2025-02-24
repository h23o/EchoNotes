import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Create = () => {
  const [file, setFile] = useState(null);
  const [summaryType, setSummaryType] = useState("concise");
  const [voice, setVoice] = useState("alloy");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId("");
      }
    });
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    if (!userId) {
      alert("User is not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("summaryType", summaryType);
    formData.append("voice", voice);
    formData.append("userId", userId);

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="page-content container d-flex justify-content-center">
      <div className="upload-card p-4">
        <h1 className="text-center">Upload Your Lecture Notes</h1>
        <p className="text-muted text-center">Supported formats: PDF, PPT, DOC, TXT</p>

        <input type="file" className="form-control mb-3" accept=".pdf,.ppt,.pptx,.doc,.docx,.txt" onChange={handleFileChange} />

        <h5>Select Summary Type</h5>
        <select className="form-select mb-3" value={summaryType} onChange={(e) => setSummaryType(e.target.value)}>
          <option value="concise">Concise</option>
          <option value="detailed">Detailed</option>
        </select>

        <h5>Select AI Voice</h5>
        <select className="form-select mb-4" value={voice} onChange={(e) => setVoice(e.target.value)}>
          <option value="alloy">Alloy</option>
          <option value="echo">Echo</option>
          <option value="fable">Fable</option>
          <option value="onyx">Onyx</option>
          <option value="nova">Nova</option>
          <option value="shimmer">Shimmer</option>
        </select>

        <button className="btn btn-dark w-100 d-flex align-items-center justify-content-center" onClick={handleUpload} disabled={loading}>
  {loading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2"></span> Uploading...
    </>
  ) : (
    "Upload"
  )}
</button>

        {result && (
          <div className="result-card mt-4 p-3">
            <h2 className="text-center">Summary</h2>
            <p className="summary-text">{result.summary}</p>
            <h3 className="mt-3">Audio</h3>
            <audio controls className="w-100">
              <source src={result.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
