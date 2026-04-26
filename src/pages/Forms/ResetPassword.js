import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();

  const [form, setForm] = useState({
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    setForm({ password: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.password)
      return showToast("Password is required ❌", "error");

    if (form.password.length < 6)
      return showToast("Password must be at least 6 characters ❌", "error");

    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password: form.password }
      );

      console.log("RESET PASSWORD RESPONSE:", res.data);

      showToast("Password updated successfully 🎉", "success");

      setForm({
        password: "",
      });
    } catch (err) {
      showToast(
        err.response?.data?.msg || "Reset failed ❌",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="bgFix"></div>

      {toast.show && (
        <div className={`toast ${toast.type}`}>{toast.message}</div>
      )}

      <div className="container">
        <div className="card">
          <h1>🔒 Reset Password</h1>
          <p>Create a new password</p>

          <form onSubmit={handleSubmit}>
            <input
              name="password"
              type="password"
              placeholder="New Password"
              value={form.password}
              onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #061314;
          font-family: Arial, sans-serif;
          padding: 15px;
        }

        .bgFix {
          position: fixed;
          inset: 0;
          background: #061314;
          z-index: 0;
        }

        .container {
          width: 100%;
          display: flex;
          justify-content: center;
          z-index: 2;
        }

        .card {
          width: 100%;
          max-width: 650px;
          background: rgba(5, 89, 90, 0.08);
          backdrop-filter: blur(18px);
          border-radius: 20px;
          padding: 60px;
          border: 1px solid rgba(5, 89, 90, 0.25);
          box-shadow: 0 25px 60px rgba(0,0,0,0.5);
          text-align: center;
          color: white;
        }

        h1 {
          margin-bottom: 10px;
          font-size: 2.2rem;
        }

        p {
          margin-bottom: 25px;
          color: #b5d6d6;
        }

        input {
          width: 100%;
          margin-bottom: 15px;
          padding: 14px;
          border-radius: 10px;
          border: none;
          outline: none;
          background: #0c1c1d;
          color: white;
          font-size: 16px;
        }

        button {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: #05595a;
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }

        button:hover {
          background: #077a7b;
        }

        @media (max-width: 768px) {
          .card {
            max-width: 95%;
            padding: 40px 20px;
          }

          h1 {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 480px) {
          .card {
            padding: 35px 18px;
          }
        }

        .toast {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 12px 20px;
          border-radius: 10px;
          color: white;
          font-weight: bold;
          z-index: 9999;
        }

        .toast.error { background: #ff3b3b; }
        .toast.success { background: #05595a; }
      `}</style>
    </div>
  );
}