import React from "react";
import useAuth from "../../Hooks/useAuth";
const ChangePasswordAdmin = () => {
  const { resetPassword, message, user } = useAuth();
  return (
    <div className="center-grid">
      <div>
        {message && <p className="text-center text-success">{message}</p>}
        <button
          className="btn btn-primary mx-auto d-block"
          onClick={() => resetPassword(user?.email)}>
          Send Password Reset Link
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordAdmin;
