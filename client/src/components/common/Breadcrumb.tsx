import React from 'react';
import { Link } from 'wouter';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <i className="fas fa-chevron-right text-muted text-xs mx-xs"></i>
              )}
              
              {item.path && !isLast ? (
                <Link href={item.path}>
                  <a className="inline-flex items-center text-sm font-medium hover:text-primary">
                    {index === 0 && (
                      <i className="fas fa-home mr-xs"></i>
                    )}
                    {item.label}
                  </a>
                </Link>
              ) : (
                <span className={`text-sm ${isLast ? 'text-muted' : 'font-medium'}`}>
                  {index === 0 && (
                    <i className="fas fa-home mr-xs"></i>
                  )}
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
