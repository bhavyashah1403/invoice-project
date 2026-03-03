import { useState } from "react";
import "./index.css";

export default function App() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("patient");

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl mb-6 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl blur opacity-50"></div>
              <i className="bi bi-receipt text-white text-3xl relative z-10"></i>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Invoice Generator</h1>
            <p className="text-slate-500 text-base font-medium">Professional clinic billing system</p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 backdrop-blur-xl bg-opacity-95">
            {/* Card Header - Gradient */}
            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

            <div className="p-8 md:p-10">
              <form onSubmit={submit} className="space-y-8">
                {/* Section Tabs */}
                <div className="flex gap-3 mb-6 pb-6 border-b border-slate-200">
                  <button
                    type="button"
                    onClick={() => setActiveSection("patient")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      activeSection === "patient"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <i className="bi bi-person-check"></i>
                    <span className="hidden sm:inline">Patient</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSection("payment")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                      activeSection === "payment"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <i className="bi bi-credit-card"></i>
                    <span className="hidden sm:inline">Payment</span>
                  </button>
                </div>

                {/* Patient Details Section */}
                {activeSection === "patient" && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                        <i className="bi bi-person-check"></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Patient Details</h3>
                        <p className="text-xs text-slate-500 font-medium">Enter patient information</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        ["customer_name", "Patient Name", "bi-person", "full"],
                        ["email", "Patient Email", "bi-envelope", "email"],
                        ["number", "Invoice Number", "bi-hash", "number"]
                      ].map(([name, label, icon, type]) => (
                        <div key={name} className={type === "full" ? "md:col-span-2" : ""}>
                          <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                            <i className={`bi ${icon} text-blue-600`}></i>
                            {label}
                          </label>
                          <input
                            name={name}
                            type={type === "email" ? "email" : type === "number" ? "number" : "text"}
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-0 transition-all duration-300 bg-slate-50 hover:bg-white text-slate-900 placeholder-slate-400 font-medium"
                            required
                            onChange={change}
                            placeholder={label}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Details Section */}
                {activeSection === "payment" && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                        <i className="bi bi-credit-card"></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Payment Details</h3>
                        <p className="text-xs text-slate-500 font-medium">Enter payment information</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        ["amount", "Amount", "bi-currency-rupee", "number", ""],
                        ["mode_of_payment", "Mode of Payment", "bi-wallet2", "text", "md:col-span-2"],
                        ["purpose", "Purpose", "bi-clipboard", "text", "md:col-span-2"],
                        ["bank_name", "Bank Name", "bi-bank", "text", ""],
                        ["amount_in_digit", "Amount in Words", "bi-pencil", "text", ""]
                      ].map(([name, label, icon, type, gridClass]) => (
                        <div key={name} className={gridClass}>
                          <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                            <i className={`bi ${icon} text-indigo-600`}></i>
                            {label}
                          </label>
                          <input
                            name={name}
                            type={type}
                            className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-0 transition-all duration-300 bg-slate-50 hover:bg-white text-slate-900 placeholder-slate-400 font-medium"
                            required
                            onChange={change}
                            placeholder={label}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6 border-t border-slate-200 mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center space-x-3 text-lg"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Generating Invoice...</span>
                      </>
                    ) : (
                      <>
                        <i className="bi bi-file-earmark-pdf-fill"></i>
                        <span>Generate Invoice</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Result Messages */}
                {result?.success && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl animate-in fade-in slide-in-from-top-2 shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                          <i className="bi bi-check-circle-fill text-green-600 text-2xl"></i>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-green-900 mb-1">Success!</h3>
                        <p className="text-sm text-green-800 mb-4">Your invoice has been generated successfully.</p>
                        <a
                          href={result.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-base px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <i className="bi bi-download text-xl"></i>
                          <span>Download PDF</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {result && !result.success && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300 rounded-2xl animate-in fade-in slide-in-from-top-2 shadow-md">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                          <i className="bi bi-exclamation-circle-fill text-red-600 text-2xl"></i>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-red-900 mb-1">Error</h3>
                        <p className="text-sm text-red-800">{result.error}</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-3 rounded-full border border-slate-200 shadow-md">
              <i className="bi bi-shield-lock text-blue-600 text-lg"></i>
              <p className="text-sm text-slate-600 font-semibold">
                Secure invoices delivered via AWS
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-in {
          animation: fadeIn 0.3s ease-out;
        }
        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .slide-in-from-top-2 {
          animation: slideInFromTop 0.3s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
