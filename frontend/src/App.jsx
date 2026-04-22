import { useState } from "react";
import "./index.css";

export default function App() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("patient");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.customer_name?.trim()) {
      newErrors.customer_name = "Patient name is required";
    }
    if (!form.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.number) {
      newErrors.number = "Invoice number is required";
    }
    if (!form.amount) {
      newErrors.amount = "Amount is required";
    } else if (form.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (!form.amount_in_digit?.trim()) {
      newErrors.amount_in_digit = "Amount in words is required";
    }
    if (!form.mode_of_payment?.trim()) {
      newErrors.mode_of_payment = "Mode of payment is required";
    }
    if (!form.purpose?.trim()) {
      newErrors.purpose = "Purpose is required";
    }
    if (!form.bank_name?.trim()) {
      newErrors.bank_name = "Bank name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const change = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setResult(null);

    const res = await fetch(
      "https://invoice-project-muxg.onrender.com/api/generate-invoice",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();
    setResult(data);
    setLoading(false);
    
    // Clear form only after successful invoice generation
    if (data.success) {
      setTimeout(() => {
        setForm({});
        setResult(null);
        setActiveTab("patient");
      }, 3000);
    }
  };

  return (
    <div className="app-container">
      <div className="background-blur"></div>
      
      <div className="app-content">
        <div className="card-wrapper">
          {/* Header */}
          <div className="header">
            <div className="icon-badge">
              <i className="bi bi-receipt"></i>
            </div>
            <h1>Invoice Generator</h1>
            <p>Professional clinic billing system</p>
          </div>

          {/* Card */}
          <div className="main-card">
            {/* Tabs */}
            <div className="tabs">
              <button
                className={`tab-button ${activeTab === "patient" ? "active" : ""}`}
                onClick={() => setActiveTab("patient")}
              >
                <i className="bi bi-person-check"></i>
                <span>Patient</span>
              </button>
              <button
                className={`tab-button ${activeTab === "payment" ? "active" : ""}`}
                onClick={() => setActiveTab("payment")}
              >
                <i className="bi bi-credit-card"></i>
                <span>Payment</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="form-container">
              {/* Patient Section */}
              <div className={`form-section ${activeTab === "patient" ? "active" : "hidden"}`}>
                  <div className="section-header">
                    <div className="section-icon patient">
                      <i className="bi bi-person-check"></i>
                    </div>
                    <div>
                      <h3>Patient Details</h3>
                      <p>Enter patient informationnn</p>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Patient Name {errors.customer_name && <span className="error-text">- {errors.customer_name}</span>}</label>
                      <div className="input-wrapper">
                        <i className="bi bi-person"></i>
                        <input
                          name="customer_name"
                          type="text"
                          value={form.customer_name || ""}
                          onChange={change}
                          placeholder="Enter patient name"
                          className={errors.customer_name ? "error-input" : ""}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Patient Email {errors.email && <span className="error-text">- {errors.email}</span>}</label>
                      <div className="input-wrapper">
                        <i className="bi bi-envelope"></i>
                        <input
                          name="email"
                          type="email"
                          value={form.email || ""}
                          onChange={change}
                          placeholder="Enter email"
                          className={errors.email ? "error-input" : ""}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Invoice Number {errors.number && <span className="error-text">- {errors.number}</span>}</label>
                      <div className="input-wrapper">
                        <i className="bi bi-hash"></i>
                        <input
                          name="number"
                          type="number"
                          value={form.number || ""}
                          onChange={change}
                          placeholder="Invoice #"
                          className={errors.number ? "error-input" : ""}
                        />
                      </div>
                    </div>
                  </div>
              </div>

              {/* Payment Section */}
              <div className={`form-section ${activeTab === "payment" ? "active" : "hidden"}`}>
                  <div className="section-header">
                    <div className="section-icon payment">
                      <i className="bi bi-credit-card"></i>
                    </div>
                    <div>
                      <h3>Payment Details</h3>
                      <p>Enter payment information</p>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label>Amount {errors.amount && <span className="error-text">- {errors.amount}</span>}</label>
                      <div className="input-wrapper">
                        <i className="bi bi-currency-rupee"></i>
                        <input
                          name="amount"
                          type="number"
                          value={form.amount || ""}
                          onChange={change}
                          placeholder="Enter amount"
                          className={errors.amount ? "error-input" : ""}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Amount in Words {errors.amount_in_digit && <span className="error-text">- {errors.amount_in_digit}</span>}</label>
                      <div className="input-wrapper">
                        <i className="bi bi-pencil"></i>
                        <input
                          name="amount_in_digit"
                          type="text"
                          value={form.amount_in_digit || ""}
                          onChange={change}
                          placeholder="e.g., Two Hundred Fifty"
                          className={errors.amount_in_digit ? "error-input" : ""}
                        />
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label>Mode of Payment {errors.mode_of_payment && <span className="error-text">- {errors.mode_of_payment}</span>}</label>
                      <div className="input-wrapper">
                        <i className="bi bi-wallet2"></i>
                        <input
                          name="mode_of_payment"
                          type="text"
                          value={form.mode_of_payment || ""}
                          onChange={change}
                          placeholder="e.g., Cash, Check, UPI"
                          className={errors.mode_of_payment ? "error-input" : ""}
                        />
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label>Purpose {errors.purpose && <span className="error-text">- {errors.purpose}</span>}</label>
                      <div className="input-wrapper">
                        <i className="bi bi-clipboard"></i>
                        <input
                          name="purpose"
                          type="text"
                          value={form.purpose || ""}
                          onChange={change}
                          placeholder="e.g., Medical Consultation"
                          className={errors.purpose ? "error-input" : ""}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Bank Name {errors.bank_name && <span className="error-text">- {errors.bank_name}</span>}</label>
                      <div className="input-wrapper">
                        <i className="bi bi-bank"></i>
                        <input
                          name="bank_name"
                          type="text"
                          value={form.bank_name || ""}
                          onChange={change}
                          placeholder="Enter bank name"
                          className={errors.bank_name ? "error-input" : ""}
                        />
                      </div>
                    </div>
                  </div>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={loading} className="submit-button">
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Generating Invoice...</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-file-earmark-pdf-fill"></i>
                    <span>Generate Invoice</span>
                  </>
                )}
              </button>
            </form>

            {/* Results */}
            {result?.success && (
              <div className="success-message fade-in">
                <div className="message-icon">
                  <i className="bi bi-check-circle-fill"></i>
                </div>
                <div>
                  <h3>Success!</h3>
                  <p>Your invoice has been generated successfully.</p>
                  <a href={result.link} target="_blank" rel="noopener noreferrer" className="download-btn">
                    <i className="bi bi-download"></i>
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            )}

            {result && !result.success && (
              <div className="error-message fade-in">
                <div className="message-icon">
                  <i className="bi bi-exclamation-circle-fill"></i>
                </div>
                <div>
                  <h3>Error</h3>
                  <p>{result.error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="footer">
            <i className="bi bi-shield-lock"></i>
            <p>Secure invoices delivered via AWS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
