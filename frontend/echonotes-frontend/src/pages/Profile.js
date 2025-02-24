import { useState } from "react";
import { auth } from "../firebase";
import { 
  updatePassword, 
  reauthenticateWithCredential, 
  EmailAuthProvider 
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;

  const updateUserPassword = async () => {
    if (!currentPassword || !newPassword) return setMessage("⚠️ Fill in all fields.");
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setMessage("✅ Password updated successfully.");
    } catch (error) {
      setMessage(error.message.replace("Firebase: ", ""));
    }
  };

  const logout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-3">Profile Settings</h2>
        <p className="text-muted text-center">Manage your account settings.</p>

        {message && <div className="alert alert-danger text-center">{message}</div>}

        {/* Update Password Section */}
        <div className="mt-3">
          <label className="fw-bold">Current Password</label>
          <input
            type="password"
            placeholder="Enter current password"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <label className="fw-bold mt-2">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button className="btn btn-dark w-100 mt-3" onClick={updateUserPassword}>
            🔒 Change Password
          </button>
        </div>

        <hr className="my-4" />

        <button className="btn btn-danger w-100" onClick={logout}>
          🚪 Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
