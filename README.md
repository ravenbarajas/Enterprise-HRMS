# HRMS Enterprise - Human Resource Management System

A feature-rich frontend prototype for an Enterprise Human Resource Management System built with React, TypeScript, and Shadcn UI components. This prototype demonstrates comprehensive HR functionalities with role-based access control and interactive mock data visualization.

## Core Features

### Authentication & Authorization
- Role-based login system (Admin, HR Manager, Dept Manager, Employee)
- Protected routes with access control
- Session management simulation
- Role selection interface

### Employee Management
- Comprehensive employee profiles with document management
- Skills/qualifications tracking
- Employee directory with advanced filters
- Role-based profile editing capabilities
- Emergency contacts management

### Attendance & Leave Tracking
- Interactive calendar view with attendance markers
- Check-in/out simulation system
- Leave application workflow visualization
- Time-off balance dashboard
- Overtime tracking interface

### Payroll Management
- Salary structure templates with tax simulations
- Payslip generation preview
- Compensation history timeline
- Bonus/incentive management interface
- Payroll analytics dashboard

### HR Analytics
- Real-time KPI dashboards:
  - Employee turnover rate
  - Department headcount
  - Recruitment metrics
  - Attendance patterns
- Interactive data visualizations
- Custom report generation
- Role-specific dashboard configurations

## Technology Stack

- **Framework**: React with TypeScript
- **UI Library**: Shadcn UI components
- **Styling**: CSS Modules with BEM methodology
- **State Management**: React Query + Context API
- **Routing**: React Router v6
- **Visualization**: Recharts
- **Mock Data**: JSON-based simulation

## UI/UX Specifications
- Role-responsive navigation system
- Dark/light mode with CSS variables
- WCAG 2.1 accessibility compliance
- Custom loading states and error boundaries
- Contextual help tooltips
- Multi-step confirmation dialogs
- Responsive grid layouts for desktop/tablet

## Project Structure

```
/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/      # Dashboard-specific components
│   │   │   ├── layout/         # Layout components (Header, Sidebar)
│   │   │   └── ui/             # Shadcn UI components
│   │   ├── data/               # Mock data for demonstration
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utility functions
│   │   ├── pages/              # Page components
│   │   └── App.tsx             # Main application component
├── server/                     # Minimal Express backend
└── shared/                     # Shared types and utilities
```


## Getting Started

For detailed setup and deployment instructions, see the [Deployment Guide](./DEPLOYMENT.md).

### Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5000`

## Usage

This prototype is designed to demonstrate the UI and interaction patterns for a logistics management system. It uses mock data for demonstration purposes and does not require any external API connections.

## Contributing

This project is a prototype and demonstration only. For customization or extension, fork the repository and modify as needed.

## License

This project is available for educational and demonstration purposes.