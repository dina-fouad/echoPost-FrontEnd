import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="bgFix"></div>

      <div className="container">
        <div className="card">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for doesn't exist</p>

          <button onClick={() => navigate("/")}>
            Go Home
          </button>
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
          font-size: 4rem;
          margin-bottom: 10px;
          color: #00ffe1;
        }

        h2 {
          margin-bottom: 15px;
        }

        p {
          margin-bottom: 25px;
          color: #b5d6d6;
        }

        button {
          padding: 14px 25px;
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
            font-size: 3rem;
          }
        }

        @media (max-width: 480px) {
          .card {
            padding: 35px 18px;
          }

          h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}