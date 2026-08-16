import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signupForm.css";

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // handle input changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.terms) {
      return setError("You must accept Terms of Service.");
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);

    try {
      const response = await fetch("https://signup-page-backend-8fop.onrender.com/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: formData.interest,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setSuccess("Account created successfully!");

      // Clear the form after successful signup
      setFormData({
        name: "",
        email: "",
        phone: "",
        interest: "",
        password: "",
        confirmPassword: "",
        terms: false,
      });

      // Redirect to the sign-in page after 1.5 seconds
      setTimeout(() => {
        navigate("/signin");
      }, 1500);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }; // <-- This closes the handleSubmit function properly now

  // The return statement is now OUTSIDE of handleSubmit
  return (
    <section className="signup-shell">
      <div className="signup-container">
        <div className="signup-copy">
          <div className="signup-badge">
            <span className="signup-badge-dot">✦</span>
            <span className="signup-badge-dot-ex">Ready to Say “I Do”?</span>
            <span className="signup-badge-dot">✦</span>
          </div>

          <h1 className="signup-title">
            Let's help you plan <em>Your perfect Wedding Event.</em>
          </h1>

          <p className="signup-sub">
            Create an account to save searches, and get access to the best: <br />
            <span className="signup-badge-dot-list">✦ Event Planners/Coordinators </span><br />
            <span className="signup-badge-dot-list">✦ Venue Managers </span><br />
            <span className="signup-badge-dot-list">✦ Caterer / Chefs </span><br />
            <span className="signup-badge-dot-list">✦ Photographers, and all the professionals you need for a premium event...</span>
          </p>

          <div className="signup-benefits">
            <div className="signup-benefit">Verified professionals only</div>
            <div className="signup-benefit">Faster client matching</div>
            <div className="signup-benefit">Saved searches and alerts</div>
          </div>
        </div>

        <div className="signup-card">
          <div className="signup-card-head">
            <h2>Create Your Account With Us</h2>
            <p>"Every detail matters. Every moment counts!"</p>
          </div>

          {/* messages */}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-grid">
              <div className="signup-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="What should we call you?😊"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="signup-field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="chidoka@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="signup-field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="signup-field">
                <label htmlFor="interest">Looking To</label>
                <select
                  id="interest"
                  value={formData.interest} // <-- Fixed: use value instead of defaultValue
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select one</option>
                  <option value="hire">Hire</option>
                  <option value="consult">Consult</option>
                  <option value="partner">Partner</option>
                  <option value="invest">Invest</option>
                </select>
              </div>

              <div className="signup-field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>

              <div className="signup-field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="signup-check">
              <input
                id="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={handleChange}
              />
              <label htmlFor="terms">
                I agree to the Terms and Conditions.
              </label>
            </div>

            <button type="submit" className="signup-submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="signup-footer">
              Already have an account? <Link to="/signin">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;