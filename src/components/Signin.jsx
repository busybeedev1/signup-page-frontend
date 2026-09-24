import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signupForm.css";

const SigninForm = () => {
    const navigate = useNavigate();

    // Form state for login
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Loading and error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!formData.email || !formData.password) {
            setError("Please enter both email and password.");
            return;
        }

        setLoading(true);

        try {
            // Backend login endpoint
            const response = await fetch(
                "https://signup-page-backend-8fop.onrender.com/api/v1/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                    }),
                }
            );

            // Get response as text first
            const text = await response.text();

            let data;

            try {
                data = JSON.parse(text);
            } catch {
                throw new Error(
                    "The server returned an invalid response. Please check the login API."
                );
            }

            // Handle failed login
            if (!response.ok) {
                throw new Error(
                    data.message || "Invalid email or password."
                );
            }

            // Save JWT token
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            // Save user information if returned by backend
            if (data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }

            // Login successful
            setSuccess("Logged in successfully!");

            // Redirect to dashboard
            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        } catch (err) {
            setError(
                err.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="signup-shell">
            <div className="signup-container">

                {/* Left Side: Copy */}
                <div className="signup-copy">
                    <div className="signup-badge">
                        <span className="signup-badge-dot">✦</span>
                        <span className="signup-badge-dot-ex">
                            Welcome Back
                        </span>
                        <span className="signup-badge-dot">✦</span>
                    </div>

                    <h1 className="signup-title">
                        Pick up right where <em>you left off.</em>
                    </h1>

                    <p className="signup-sub">
                        Log in to manage your saved professionals, view your
                        event coordination dashboard, and continue planning
                        your perfect day.
                    </p>

                    <div className="signup-benefits">
                        <div className="signup-benefit">
                            Secure Access
                        </div>

                        <div className="signup-benefit">
                            Manage Bookings
                        </div>

                        <div className="signup-benefit">
                            Chat with Vendors
                        </div>
                    </div>
                </div>

                {/* Right Side: Form Card */}
                <div className="signup-card">

                    <div className="signup-card-head">
                        <h2>Sign In to Your Account</h2>
                        <p>
                            "Every detail matters. Every moment counts!"
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div
                            className="signup-error"
                            style={{
                                color: "#ff4d4f",
                                marginBottom: "16px",
                                fontSize: "0.9rem",
                                padding: "10px",
                                background:
                                    "rgba(255, 77, 79, 0.1)",
                                borderRadius: "8px",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div
                            className="signup-success"
                            style={{
                                color: "#52c41a",
                                marginBottom: "16px",
                                fontSize: "0.9rem",
                                padding: "10px",
                                background:
                                    "rgba(82, 196, 26, 0.1)",
                                borderRadius: "8px",
                            }}
                        >
                            {success}
                        </div>
                    )}

                    <form
                        className="signup-form"
                        onSubmit={handleSubmit}
                    >
                        <div
                            className="signup-grid"
                            style={{
                                gridTemplateColumns: "1fr",
                            }}
                        >

                            {/* Email */}
                            <div className="signup-field">
                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="chidoka@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="signup-field">
                                <label htmlFor="password">
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="signup-submit"
                            style={{ marginTop: "16px" }}
                            disabled={loading}
                        >
                            {loading
                                ? "Signing In..."
                                : "Sign In"}
                        </button>

                        <p className="signup-footer">
                            Don't have an account?{" "}
                            <Link to="/">Sign up</Link>
                        </p>
                    </form>

                </div>
            </div>
        </section>
    );
};

export default SigninForm;
