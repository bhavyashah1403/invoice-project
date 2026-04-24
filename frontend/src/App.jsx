import { useState } from "react";
import "./index.css";
import { numberToWords } from "./utils/numberToWords";
import { capitalizeFirstAndLastName } from "./utils/capitalizeNames";
import { titles, paymentModes, purposes, indianBanks } from "./utils/dropdownData";
import { SearchableDropdown } from "./components/SearchableDropdown";

// T2T Logo as base64 — replace this import with your actual asset path if preferred
const T2T_LOGO = "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nPjSRmx+MZ3hxWOnXZievMhN/TNojrM9YolVFiklPH4WI+yKa5g1VY0ic76udOvSBIHLGOUmL0TJYJ43psp+ip9peY1ron0d1eTcP4NPiMlSvS59zZKc1gPCaVs10eA4DVJLLGkiN3NVd6nPjSRmx+MZ3hxWOnXZievMhN/TNojrM9YolVFiklPH4WI+yKa5g1VY0ic76udOvSBIHLGOUmL0TJYJ43psp+ip9peY1ron0d1eTcP4NPiMlSvS59zZKc1gPCaVs10eA4DVJLLGkiN3NVd6nPjSRmx+MZ3hxWOnXZievMhN/TNojrM9YolVFiklPH4WI+yKa5g1VY0ic76udOvSBJXjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8wBJbjTlzy1R+1QcacueWqP2qEaeSFmPz11vuRfmByQsx+eut9yL8w";

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

    if (!form.bank_name?.trim()) {
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

                  {/* Title — now a SearchableDropdown */}
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

                  {/* Patient Name */}
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

                  {/* Email */}
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

                  {/* Invoice Number */}
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

                  {/* Amount */}
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

                  {/* Amount in Words */}
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