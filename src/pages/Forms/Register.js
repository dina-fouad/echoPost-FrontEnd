import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    bio: "",
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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.userName) {
      showToast("Username is required ❌", "error");
      return;
    }

    if (!form.email) {
      showToast("Email is required ❌", "error");
      return;
    }

    if (!form.password) {
      showToast("Password is required ❌", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      console.log("REGISTER RESPONSE:", res.data);

      showToast(
        "Registration successful! Please check your email to activate your account 📩",
        "success"
      );

      setForm({
        userName: "",
        email: "",
        password: "",
        bio: "",
      });
    } catch (err) {
      showToast(err.response?.data?.msg || "Registration failed ❌", "error");
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

      <div className="bubbles">
        {Array.from({ length: 80 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="container">
        <div className="left">
          <h1>✨ Create Account</h1>
          <p>Join us and start your journey 🚀</p>

          <form onSubmit={handleSubmit}>
            <input
              name="userName"
              placeholder="Username"
              value={form.userName}
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <textarea
              name="bio"
              placeholder="Bio"
              value={form.bio}
              onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>
        </div>

        <div className="right">
          <h2>Why join us?</h2>
          <div className="card">🔐 Secure authentication system</div>
          <div className="card">⚡ Fast & modern experience</div>
          <div className="card">🌐 Global community access</div>
          <div className="card">📊 Build your professional profile</div>

          <div className="trust">
            <div>✔ Verified Platform</div>
            <div>✔ End-to-End Security</div>
            <div>✔ Real-time Features</div>
          </div>
        </div>
      </div>

      <style>{`
        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #061314;
          position: relative;
          font-family: Arial, sans-serif;
          padding: 20px;
          box-sizing: border-box;
        }

        .bgFix {
          position: fixed;
          inset: 0;
          background: #061314;
          z-index: 0;
        }

        .bubbles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 1;
        }

        .bubbles span {
          position: absolute;
          bottom: -120px;
          border-radius: 50%;
          animation: rise 12s linear infinite;
          opacity: 0.2;
        }

        .bubbles span:nth-child(3n) { background: #05595a; }
        .bubbles span:nth-child(3n+1) { background: #00ffe1; }
        .bubbles span:nth-child(3n+2) { background: #ffffff; }

        @keyframes rise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-120vh) scale(1.6); opacity: 0; }
        }

        ${Array.from({ length: 80 })
          .map(
            (_, i) => `
          .bubbles span:nth-child(${i + 1}) {
            left: ${Math.random() * 100}%;
            animation-duration: ${8 + Math.random() * 10}s;
            width: ${3 + Math.random() * 6}px;
            height: ${3 + Math.random() * 6}px;
          }
        `
          )
          .join("")}

        .container {
          display: flex;
          width: 100%;
          max-width: 900px;
          background: rgba(5, 89, 90, 0.08);
          backdrop-filter: blur(18px);
          border-radius: 20px;
          overflow: hidden;
          z-index: 2;
          border: 1px solid rgba(5, 89, 90, 0.25);
        }

        .left { flex: 1; padding: 40px; color: white; }

        input, textarea {
          width: 100%;
          margin-bottom: 12px;
          padding: 12px;
          border-radius: 10px;
          border: none;
          outline: none;
          background: #0c1c1d;
          color: white;
        }

        textarea { height: 80px; resize: none; }

        button {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 10px;
          background: #05595a;
          color: white;
          cursor: pointer;
          font-weight: bold;
        }

        .right {
          flex: 1;
          padding: 40px;
          background: rgba(5, 89, 90, 0.12);
          color: white;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .card {
          background: rgba(5, 89, 90, 0.15);
          padding: 15px;
          border-radius: 10px;
        }

        .trust {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid rgba(5, 89, 90, 0.4);
        }

        .toast {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 12px 18px;
          border-radius: 10px;
          color: white;
          z-index: 9999;
          font-weight: bold;
        }

        .toast.error { background: #ff3b3b; }
        .toast.success { background: #05595a; }

        /* 📱 MOBILE CENTER FIX */
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
            margin: 10px;
          }

          .left,
          .right {
            padding: 18px;
            text-align: center;
            align-items: center;
          }

          form {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          input,
          textarea {
            text-align: center;
          }

          h1, h2, p {
            text-align: center;
          }

          .card {
            text-align: center;
          }

          .trust {
            text-align: center;
          }

          button {
            text-align: center;
          }

          .toast {
            left: 10px;
            right: 10px;
            top: 10px;
            text-align: center;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}