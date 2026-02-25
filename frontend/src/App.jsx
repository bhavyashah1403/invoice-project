import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const res = await fetch("http://localhost:5000/api/generate-invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setResult(await res.json());
    setLoading(false);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light bg-gradient">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">

            <div className="card shadow-lg rounded-4 overflow-hidden">
              <div className="card-header text-white text-center py-4"
                   style={{ background: "linear-gradient(135deg, #0d6efd, #20c997)" }}>
                <h3 className="mb-1">
                  <i className="bi bi-receipt me-2"></i>
                  Invoice Generator
                </h3>
                <p className="mb-0 small">Clinic Billing System</p>
              </div>

              <div className="card-body p-4">

                <form onSubmit={submit}>

                  {/* Patient Details */}
                  <div className="text-uppercase small text-muted mb-2">
                    Patient Details
                  </div>

                  {[
                    ["email", "Patient Email", "bi-envelope"],
                    ["number", "Invoice Number", "bi-hash"],
                    ["customer_name", "Patient Name", "bi-person"]
                  ].map(([name, label, icon]) => (
                    <div className="mb-3" key={name}>
                      <label className="form-label">{label}</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className={`bi ${icon}`}></i>
                        </span>
                        <input
                          name={name}
                          className="form-control"
                          required
                          onChange={change}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Payment */}
                  <div className="text-uppercase small text-muted mb-2 mt-4">
                    Payment Details
                  </div>

                  {[
                    ["amount", "Amount", "bi-currency-rupee"],
                    ["mode_of_payment", "Mode of Payment", "bi-wallet2"],
                    ["purpose", "Purpose", "bi-clipboard"],
                    ["bank_name", "Bank Name", "bi-bank"],
                    ["amount_in_digit", "Amount in Words", "bi-pencil"]
                  ].map(([name, label, icon]) => (
                    <div className="mb-3" key={name}>
                      <label className="form-label">{label}</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className={`bi ${icon}`}></i>
                        </span>
                        <input
                          name={name}
                          className="form-control"
                          required
                          onChange={change}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="d-grid mt-4">
                    <button className="btn btn-primary btn-lg rounded-3">
                      {loading ? "Generating Invoice..." : "Generate Invoice"}
                    </button>
                  </div>

                </form>

                {result?.success && (
                  <div className="alert alert-success mt-4">
                    Invoice created:
                    <a href={result.link} target="_blank" className="ms-2">
                      Download PDF
                    </a>
                  </div>
                )}

                {result && !result.success && (
                  <div className="alert alert-danger mt-4">
                    {result.error}
                  </div>
                )}

              </div>
            </div>

            <p className="text-center text-muted small mt-4">
              Secure invoices delivered via AWS
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}