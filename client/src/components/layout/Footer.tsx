import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t py-sm px-md text-center text-sm text-muted">
      <p>Enterprise HRMS v1.0.0 | &copy; {currentYear} Your Company</p>
    </footer>
  );
};

export default Footer;
