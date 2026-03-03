import { useState } from "react";
import "./index.css";

export default function App() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("patient");

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
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

    setResult(await res.json());
    setLoading(false);
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
              {activeTab === "patient" && (
                <div className="form-section fade-in">
                  <div className="section-header">
                    <div className="section-icon patient">
                      <i className="bi bi-person-check"></i>
                    </div>
                    <div>
                      <h3>Patient Details</h3>
                      <p>Enter patient information</p>
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Patient Name</label>
                      <div className="input-wrapper">
                        <i className="bi bi-person"></i>
                        <input
                          name="customer_name"
                          type="text"
                          required
                          onChange={change}
                          placeholder="Enter patient name"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Patient Email</label>
                      <div className="input-wrapper">
                        <i className="bi bi-envelope"></i>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={change}
                          placeholder="Enter email"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Invoice Number</label>
                      <div className="input-wrapper">
                        <i className="bi bi-hash"></i>
                        <input
                          name="number"
                          type="number"
                          required
                          onChange={change}
                          placeholder="Invoice #"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Section */}
              {activeTab === "payment" && (
                <div className="form-section fade-in">
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
                      <label>Amount</label>
                      <div className="input-wrapper">
                        <i className="bi bi-currency-rupee"></i>
                        <input
                          name="amount"
                          type="number"
                          required
                          onChange={change}
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Amount in Words</label>
                      <div className="input-wrapper">
                        <i className="bi bi-pencil"></i>
                        <input
                          name="amount_in_digit"
                          type="text"
                          required
                          onChange={change}
                          placeholder="e.g., Two Hundred Fifty"
                        />
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label>Mode of Payment</label>
                      <div className="input-wrapper">
                        <i className="bi bi-wallet2"></i>
                        <input
                          name="mode_of_payment"
                          type="text"
                          required
                          onChange={change}
                          placeholder="e.g., Cash, Check, UPI"
                        />
                      </div>
                    </div>

                    <div className="form-group full-width">
                      <label>Purpose</label>
                      <div className="input-wrapper">
                        <i className="bi bi-clipboard"></i>
                        <input
                          name="purpose"
                          type="text"
                          required
                          onChange={change}
                          placeholder="e.g., Medical Consultation"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Bank Name</label>
                      <div className="input-wrapper">
                        <i className="bi bi-bank"></i>
                        <input
                          name="bank_name"
                          type="text"
                          required
                          onChange={change}
                          placeholder="Enter bank name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
