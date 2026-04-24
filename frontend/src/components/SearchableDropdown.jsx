import { useState, useRef, useEffect } from "react";

export function SearchableDropdown({
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  label,
  icon,
  error,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="form-group" ref={dropdownRef} style={{ position: "relative" }}>
      {/* Label */}
      <label>{label}</label>

      {/* Trigger input */}
      <div className="input-wrapper" style={{ position: "relative" }}>
        {icon && <i className={`bi bi-${icon}`}></i>}
        <input
          type="text"
          placeholder={placeholder}
          value={isOpen ? searchTerm : (value || "")}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onFocus={() => setIsOpen(true)}
          className={`dropdown-input ${error ? "error-input" : ""}`}
          autoComplete="off"
          style={{ paddingRight: "2rem", cursor: isOpen ? "text" : "pointer" }}
        />
        <i
          className={`bi bi-chevron-down`}
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: isOpen ? "translateY(-50%) rotate(180deg)" : "translateY(-50%)",
            transition: "transform 0.2s ease",
            cursor: "pointer",
            color: "#6b7280",
            fontSize: "0.85rem",
            pointerEvents: "all",
          }}
        />
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 999,
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            maxHeight: "220px",
            overflowY: "auto",
            marginTop: "4px",
          }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option}
                onMouseDown={(e) => {
                  e.preventDefault(); // prevent onBlur from firing before select
                  handleSelect(option);
                }}
                style={{
                  padding: "0.6rem 1rem",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  color: value === option ? "#2563eb" : "#111827",
                  background: value === option ? "#eff6ff" : "transparent",
                  fontWeight: value === option ? 600 : 400,
                  borderLeft: value === option ? "3px solid #2563eb" : "3px solid transparent",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (value !== option) {
                    e.currentTarget.style.background = "#f9fafb";
                  }
                }}
                onMouseLeave={(e) => {
                  if (value !== option) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {option}
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "0.75rem 1rem",
                fontSize: "0.875rem",
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              No results found
            </div>
          )}
        </div>
      )}

      {/* Inline error (below input, not in label) */}
      {error && (
        <span className="error-text" style={{ display: "block", marginTop: "4px", fontSize: "0.8rem" }}>
          {error}
        </span>
      )}
    </div>
  );
}