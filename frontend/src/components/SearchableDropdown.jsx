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
  disabled = false,
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

  // Close dropdown if disabled while open
  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
      setSearchTerm("");
    }
  }, [disabled]);

  const handleSelect = (option) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleOpen = () => {
    if (disabled) return;
    setIsOpen(true);
    setSearchTerm("");
  };

  return (
    <div
      className="form-group"
      ref={dropdownRef}
      style={{ position: "relative" }}
    >
      <label>{label}</label>

      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {icon && (
          <i
            className={`bi bi-${icon}`}
            style={{
              position: "absolute",
              left: "13px",
              color: disabled ? "#cbd5e1" : "#94a3b8",
              fontSize: "15px",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        )}

        <input
          type="text"
          autoComplete="off"
          placeholder={disabled ? "N/A — Cash selected" : (isOpen ? "Search…" : (value || placeholder))}
          value={disabled ? "NA" : (isOpen ? searchTerm : (value || ""))}
          onChange={(e) => {
            if (disabled) return;
            setSearchTerm(e.target.value);
          }}
          onFocus={handleOpen}
          readOnly={disabled || !isOpen}
          className={`dropdown-input${error ? " error-input" : ""}`}
          style={{
            paddingLeft: icon ? "38px" : "13px",
            paddingRight: "36px",
            cursor: disabled ? "not-allowed" : (isOpen ? "text" : "pointer"),
            opacity: disabled ? 0.55 : 1,
            background: disabled ? "#f8fafc" : undefined,
            color: disabled ? "#94a3b8" : undefined,
          }}
        />

        <i
          className="bi bi-chevron-down"
          onMouseDown={(e) => {
            if (disabled) return;
            e.preventDefault();
            isOpen ? (setIsOpen(false), setSearchTerm("")) : handleOpen();
          }}
          style={{
            position: "absolute",
            right: "12px",
            color: disabled ? "#cbd5e1" : (isOpen ? "#3b82f6" : "#94a3b8"),
            fontSize: "13px",
            cursor: disabled ? "not-allowed" : "pointer",
            transition: "transform 0.2s ease, color 0.2s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            userSelect: "none",
          }}
        />
      </div>

      {isOpen && !disabled && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 5px)",
            left: 0,
            right: 0,
            zIndex: 9999,
            background: "#ffffff",
            border: "2px solid #e2e8f0",
            borderRadius: "12px",
            boxShadow: "0 12px 32px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)",
            maxHeight: "220px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => {
              const isSelected = value === option;
              return (
                <div
                  key={option}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(option);
                  }}
                  style={{
                    padding: "10px 14px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: isSelected ? 600 : 500,
                    color: isSelected ? "#1d4ed8" : "#1a202c",
                    background: isSelected ? "#eff6ff" : "transparent",
                    borderLeft: `3px solid ${isSelected ? "#3b82f6" : "transparent"}`,
                    transition: "background 0.12s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {isSelected && (
                    <i
                      className="bi bi-check2"
                      style={{ fontSize: "14px", color: "#3b82f6", flexShrink: 0 }}
                    />
                  )}
                  {option}
                </div>
              );
            })
          ) : (
            <div
              style={{
                padding: "14px",
                fontSize: "13.5px",
                color: "#94a3b8",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              No results found
            </div>
          )}
        </div>
      )}

      {error && (
        <span
          className="error-text"
          style={{ display: "block", marginTop: "3px", fontSize: "12px" }}
        >
          {error}
        </span>
      )}
    </div>
  );
}