Human Resource (HR) Module 

Task 1 — Understand the Existing 
Architecture 
Objective 
Before writing any code, understand how the Inventory module is organized. 
Scenario 
The HR team wants a new Employee Directory. 

● How API communication is implemented. 
● How components are organized. 
● Where reusable business logic lives. 
● How hooks are used. 
● When Zustand is used instead of useState. 
● How types are shared. 
● How pages are kept thin. 
Deliverables 
Create an HR module that follows the same folder structure and architectural pattern as 
Inventory. 

Task 2 — Employee Directory (Read) 
Objective 
Implement the Employee Directory page. 
Scenario 
HR staff need to browse all employees and quickly search for specific people. 
The page should allow users to: 
● View all employees 
● Search employees by name 
● Filter employees by department 
● Display loading and error states 
● Refresh employee data 

Concepts Being Evaluated 
● API Integration 
● TanStack Query 
● Component Composition 
● Local State 
● Props 
Task 3 — Shared State Across the 
Application 
Objective 
Share HR information between unrelated parts of the application. 
Scenario 
The HR page allows users to filter employees by department. 
When the user navigates to the Dashboard, the selected department should still be available. 
The Navbar should also display the number of employees currently on leave. 
These components are not directly connected. 
Implement global state following the same approach used in the Inventory module. 
Expected Features 
● Department filter persists across pages. 
● Dashboard displays information for the selected department. 
● Navbar automatically updates the "Employees on Leave" badge. 
● No prop drilling. 
Concepts Being Evaluated 
● Zustand 
● Global State 
● State Synchronization 
● Cross-page Communication 
Task 4 — Complete Employee 
Management (CRUD) 
Objective 
Complete the Employee Management feature. 
Scenario 
HR administrators should be able to fully manage employee records. 
Implement functionality to: 
● Add employees 
● Edit employees 
● Delete employees 
● Validate employee information 
● Reuse the same form for Create and Edit 
● Perform bulk actions on multiple employees 
The employee list should update automatically after every successful operation. 
Follow the same CRUD pattern . 
Concepts Being Evaluated 
● CRUD Operations 
● Form Reuse 
● API Mutations 
● Query Invalidation 
● Local State 
● Global State 
Functional Requirements 
ID 
Requirement 
FR-1 View all employees 
FR-2 Search employees by name 
FR-3 Filter employees by department 
FR-4 Add a new employee 
FR-5 Edit an existing employee 
FR-6 Delete an employee 
FR-7 Select multiple employees for bulk actions 
FR-8 Display employees currently on leave in the 
Navbar 
FR-9 Dashboard reflects the selected department 