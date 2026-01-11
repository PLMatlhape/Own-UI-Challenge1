import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './mobileNav.css';

interface MobileNavProps {
  onAddLink: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onAddLink }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="mobile-nav">
        <div className="mobile-nav-content">
          <h1 className="mobile-nav-title">Link Vault</h1>
          <button 
            className="mobile-nav-toggle" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button 
              className="mobile-menu-item" 
              onClick={() => {
                onAddLink();
                setIsOpen(false);
              }}
            >
              Add New Link
            </button>
          </div>
        </div>
      )}
    </>
  );
};
