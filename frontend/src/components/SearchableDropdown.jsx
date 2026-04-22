import { useState, useRef, useEffect } from "react";

export function SearchableDropdown({ 
  name, 
  value, 
  onChange, 
  options, 
  placeholder = "Select an option",
  label,
  icon,
  error
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({
      target: { name, value: option }
    });
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="form-group full-width" ref={dropdownRef}>
      <label>{label}</label>
      <div className={`dropdown-wrapper ${isOpen ? "open" : ""}`}>
        <div className="input-wrapper">
          {icon && <i className={`bi bi-${icon}`}></i>}
          <input
            type="text"
            placeholder={value || placeholder}
            value={isOpen ? searchTerm : value}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onClick={() => setIsOpen(!isOpen)}
            readOnly={!isOpen}
            className={`dropdown-input ${error ? "error-input" : ""}`}
          />
          <i className={`bi bi-chevron-down dropdown-icon ${isOpen ? "rotated" : ""}`}></i>
        </div>

        {isOpen && (
          <div className="dropdown-menu">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option}
                  className={`dropdown-item ${value === option ? "selected" : ""}`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="dropdown-empty">No results found</div>
            )}
          </div>
        )}
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}
