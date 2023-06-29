import React, { useState } from "react";
import axios from "axios";

const ChangePasswordForm = ({ customer }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPasswordsMustMatch, setShowPasswordsMustMatch] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setShowPasswordsMustMatch(true);
      return;
    }

    setSubmitting(true);

    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch('http://localhost:8000/auth/change-password', { currentPassword: currentPassword, newPassword: newPassword }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setIsPasswordChanged(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsPasswordChanged(false);
    }
    setSubmitting(false);
  };

  return (
    <div className="card border-info">
      <h6 className="card-header bg-info text-white">Change Password</h6>
      <div className="card-body">
        <form
          onSubmit={handleSubmit}
          className={`needs-validation ${showPasswordsMustMatch ? "was-validated" : ""}`}
          noValidate
        >
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label">
              Current Password
            </label>
            <input
              type="password"
              className="form-control"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              minLength="8"
              maxLength="20"
            />
            <div className="invalid-feedback">Please enter your current password.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength="8"
              maxLength="20"
            />
            <div className="invalid-feedback">Please enter a new password.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="8"
              maxLength="20"
            />
            <div className="invalid-feedback">Please confirm your new password.</div>
          </div>
          {showPasswordsMustMatch && (
            <div className="text-danger">New password and confirm password must match.</div>
          )}
          {isPasswordChanged === false && (
            <div className="text-danger">Fail to change password</div>
          )}
          {isPasswordChanged === true && (
            <div className="text-success">Password changed successfully</div>
          )}
          <button type="submit" className="submit-button" disabled={submitting}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
