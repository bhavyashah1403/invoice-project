import { useState } from "react";
import "./index.css";
import { numberToWords } from "./utils/numberToWords";
import { capitalizeFirstAndLastName } from "./utils/capitalizeNames";
import { titles, paymentModes, purposes, indianBanks } from "./utils/dropdownData";
import { SearchableDropdown } from "./components/SearchableDropdown";

const T2T_LOGO = "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";

export default function App() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("patient");
  const [errors, setErrors] = useState({});

  const isCash = form.mode_of_payment?.toLowerCase() === "cash";

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.title?.trim()) {
      newErrors.title = "Title is required";
    }

    if (!form.customer_name?.trim()) {
      newErrors.customer_name = "Patient name is required";
    } else if (form.customer_name.trim().length < 2) {
      newErrors.customer_name = "Name must be at least 2 characters";
    } else if (form.customer_name.trim().length > 60) {
      newErrors.customer_name = "Name must be under 60 characters";
    } else if (!/^[a-zA-Z\s.\-']+$/.test(form.customer_name.trim())) {
      newErrors.customer_name = "Name can only contain letters, spaces, dots, or hyphens";
    }

    if (!form.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email.trim())) {
      newErrors.email = "Please enter a valid email (e.g. name@example.com)";
    } else if (form.email.trim().length > 100) {
      newErrors.email = "Email must be under 100 characters";
    }

    if (!form.number && form.number !== 0) {
      newErrors.number = "Invoice number is required";
    } else if (!Number.isInteger(Number(form.number))) {
      newErrors.number = "Invoice number must be a whole number";
    } else if (Number(form.number) <= 0) {
      newErrors.number = "Invoice number must be greater than 0";
    } else if (Number(form.number) > 999999) {
      newErrors.number = "Invoice number cannot exceed 999999";
    }

    if (!form.amount && form.amount !== 0) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(Number(form.amount))) {
      newErrors.amount = "Amount must be a valid number";
    } else if (Number(form.amount) <= 0) {
      newErrors.amount = "Amount must be greater than ₹0";
    } else if (Number(form.amount) > 1000000) {
      newErrors.amount = "Amount cannot exceed ₹10,00,000";
    } else if (!/^\d+(\.\d{1,2})?$/.test(String(form.amount))) {
      newErrors.amount = "Amount can have at most 2 decimal places";
    }

    if (!form.amount_in_digit?.trim()) {
      newErrors.amount_in_digit = "Amount in words is required";
    } else if (form.amount_in_digit.trim().length < 3) {
      newErrors.amount_in_digit = "Amount in words seems too short";
    } else if (!/^[a-zA-Z\s,]+$/.test(form.amount_in_digit.trim())) {
      newErrors.amount_in_digit = "Amount in words should only contain letters";
    }

    if (!form.mode_of_payment?.trim()) {
      newErrors.mode_of_payment = "Mode of payment is required";
    }

    if (!form.purpose?.trim()) {
      newErrors.purpose = "Purpose is required";
    }

    // Bank name: skip validation if cash (it's auto-set to "NA")
    if (!isCash && !form.bank_name?.trim()) {
      newErrors.bank_name = "Bank name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const change = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };

    if (name === "customer_name" && value) {
      updatedForm.customer_name = capitalizeFirstAndLastName(value);
    }

    if (name === "amount" && value) {
      updatedForm.amount_in_digit = numberToWords(value);
    }

    // When payment mode changes, handle bank_name automatically
    if (name === "mode_of_payment") {
      if (value.toLowerCase() === "cash") {
        updatedForm.bank_name = "NA";
      } else {
        // Only clear bank_name if it was previously set to NA by cash selection
        if (updatedForm.bank_name === "NA") {
          updatedForm.bank_name = "";
        }
      }
    }

    setForm(updatedForm);

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const patientFields = ["title", "customer_name", "email", "number"];
      const hasPatientErrors = patientFields.some((f) => errors[f]);
      if (hasPatientErrors) setActiveTab("patient");
      return;
    }

    setLoading(true);
    setResult(null);

    const invoiceData = {
      ...form,
      customer_name: `${form.title} ${form.customer_name}`,
      patient_name_only: form.customer_name,
    };

    const res = await fetch(
      "https://invoice-project-muxg.onrender.com/api/generate-invoice",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceData),
      }
    );

    const data = await res.json();
    setResult(data);
    setLoading(false);

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

          {/* ── Header with T2T Logo ── */}
          <div className="header">
            <div className="logo-wrapper">
              <img
                src={`data:image/jpeg;base64,${T2T_LOGO}`}
                alt="T2T Hormone Clinics"
                className="clinic-logo"
              />
            </div>
            <p className="header-subtitle">Professional Billing System</p>
          </div>

          {/* ── Main Card ── */}
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

              {/* ── Patient Section ── */}
              <div className={`form-section ${activeTab === "patient" ? "active" : "hidden"}`}>
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

                  <SearchableDropdown
                    name="title"
                    label={`Title ${errors.title ? `— ${errors.title}` : ""}`}
                    value={form.title || ""}
                    onChange={change}
                    options={titles}
                    placeholder="Select title"
                    icon="person-badge"
                    error={errors.title}
                  />

                  <div className="form-group">
                    <label>
                      Patient Name{" "}
                      {errors.customer_name && (
                        <span className="error-text">— {errors.customer_name}</span>
                      )}
                    </label>
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
                    <label>
                      Patient Email{" "}
                      {errors.email && (
                        <span className="error-text">— {errors.email}</span>
                      )}
                    </label>
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
                    <label>
                      Invoice Number{" "}
                      {errors.number && (
                        <span className="error-text">— {errors.number}</span>
                      )}
                    </label>
                    <div className="input-wrapper">
                      <i className="bi bi-hash"></i>
                      <input
                        name="number"
                        type="number"
                        value={form.number || ""}
                        onChange={change}
                        placeholder="Invoice #"
                        min="1"
                        max="999999"
                        className={errors.number ? "error-input" : ""}
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* ── Payment Section ── */}
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
                    <label>
                      Amount{" "}
                      {errors.amount && (
                        <span className="error-text">— {errors.amount}</span>
                      )}
                    </label>
                    <div className="input-wrapper">
                      <i className="bi bi-currency-rupee"></i>
                      <input
                        name="amount"
                        type="number"
                        value={form.amount || ""}
                        onChange={change}
                        placeholder="Enter amount"
                        min="1"
                        max="1000000"
                        step="0.01"
                        className={errors.amount ? "error-input" : ""}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Amount in Words{" "}
                      {errors.amount_in_digit && (
                        <span className="error-text">— {errors.amount_in_digit}</span>
                      )}
                    </label>
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

                  <SearchableDropdown
                    name="mode_of_payment"
                    label={`Mode of Payment ${errors.mode_of_payment ? `— ${errors.mode_of_payment}` : ""}`}
                    value={form.mode_of_payment || ""}
                    onChange={change}
                    options={paymentModes}
                    placeholder="Select payment mode"
                    icon="wallet2"
                    error={errors.mode_of_payment}
                  />

                  <SearchableDropdown
                    name="purpose"
                    label={`Purpose ${errors.purpose ? `— ${errors.purpose}` : ""}`}
                    value={form.purpose || ""}
                    onChange={change}
                    options={purposes}
                    placeholder="Select purpose"
                    icon="clipboard"
                    error={errors.purpose}
                  />

                  <SearchableDropdown
                    name="bank_name"
                    label={`Bank Name ${errors.bank_name ? `— ${errors.bank_name}` : ""}`}
                    value={form.bank_name || ""}
                    onChange={change}
                    options={indianBanks}
                    placeholder="Search and select bank"
                    icon="bank"
                    error={errors.bank_name}
                    disabled={isCash}
                  />

                </div>
              </div>

              {/* Submit */}
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

            {/* Success */}
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

            {/* Error */}
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