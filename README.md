# MoMo Data Analysis Dashboard

This project, MoMo Data Analysis (MDA), processes SMS data from MTN MoMo, a mobile payment service in Rwanda, to extract, clean, and categorize transaction data, store it in a SQLite database, and visualize insights through an interactive web dashboard. The application is designed for MoMo users to gain detailed analytics on their spending and transaction patterns.

### Walkthrough Video: https://youtu.be/grxHxOvdWaU

## Table of Contents

- Project Overview
- System Architecture
- Features
- Technologies Used
- Setup Instructions
- File Structure
- Running the Application
- Challenges and Lessons Learned
- Authors

# Project Overview

The MoMo Data Analysis (MDA) project processes an XML file containing approximately 1,600 SMS messages from MTN MoMo. The backend parses the XML, categorizes transactions (e.g., Incoming Money, Payments, Withdrawals), cleans the data, and stores it in a SQLite database. The frontend provides an interactive dashboard with search, filter, and visualization features to analyze transaction data. The application targets MoMo users seeking detailed insights into their financial activities.
System Architecture
The application follows a modular fullstack architecture:

Data Processing: Python scripts (sms_data.py, cleaner_script.py) parse XML data (modified_sms_v2.xml) using regex for categorization, clean it into JSON (cleaned_sms.json), and store it in SQLite (transactions.db).
Database: SQLite with a normalized schema, including tables for transactions and entities, with constraints to prevent duplicates.
Frontend: HTML (index.html, transactions.html), CSS (styles/), and JavaScript (js/) create a responsive dashboard with Chart.js for visualizations and features like theme switching.
Data Flow: XML → Python Parser → JSON → SQLite → Frontend Dashboard.

# Features

### Backend:

Parses and categorizes SMS data into types (e.g., Incoming Money, Payments, Airtime Purchases).
Cleans data by normalizing amounts and dates, handling missing fields.
Logs unprocessed messages to unprocessed_sms.log for debugging.
Stores data in SQLite with a scalable schema and duplicate constraints.
As for the API, it uses Node JS and express to create a server for fetching data at
` http://localhost:3000/transactions`

### Frontend:

Responsive dashboard with a sticky sidebar, navbar, and main content area.
Theme switch (light/dark mode) for enhanced user experience.
Search functionality to query transactions by keyword.
Filter transactions by category (e.g., Incoming, Payments).
Visualizations using Chart.js (e.g., pie charts for transaction types, bar charts for monthly totals).
Detailed transaction view in transactions.html.

# Technologies Used

Backend:
Python 3.8+ (xml.etree.ElementTree, re for regex, sqlite3)
JSON for data interchange (cleaned_sms.json)
Node Js + express JS for creating an api to serve the frontend

Database: SQLite (transactions.db)
Frontend:
HTML (index.html, transactions.html)
CSS (custom styles in styles/, Bootstrap for responsiveness)
JavaScript (Chart.js for visualizations, custom scripts in js/)

Tools: Git, GitHub, VS Code Live Server (for frontend testing)

# Setup Instructions

### 1. Clone the Repository:

```
git clone https://github.com/mbonikevin/MoMo_Data_Analysis.git
cd MoMo_Data_Analysis
```

### 2. Install Dependencies:

Ensure Python 3.8+ is installed.
No additional Python packages are required (uses standard libraries).
For frontend development, install the VS Code Live Server extension (optional but recommended for Chart.js rendering).

### 3. Set Up SQLite Database:

The transactions.db file is included, pre-populated with data.
If rebuilding the database, run the backend scripts (see below).

Prepare XML Data:

Ensure modified_sms_v2.xml is in the backend/ directory.

```
MoMo_Data_Analysis/
├── AUTHORS
├── README.md
├── backend/
│   ├── node_modules/
│   ├── cleaned_sms.json
│   ├── cleaner_script.py
│   ├── modified_sms_v2.xml // this file right here
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   ├── sms_data.py
│   ├── transactions.db
│   └── unprocessed_sms.log
├── frontend/
│   ├── assets/
│   ├── js/
│   ├── styles/
│   ├── index.html
│   └── transactions.html
```

Running the Application

Process and Store Data:
Run the XML parser and cleaner:

```
cd backend
python sms_data.py
python cleaner_script.py
```

These scripts parse modified_sms_v2.xml, generate cleaned_sms.json, and populate transactions.db.

### 4. install dependecies

Now you can move on to installing backend dependencies by running:

```
cd backend
npm install
```

# Serve the Frontend:

Use VS Code `Live Server` to open `frontend/index.html` (recommended for Chart.js compatibility). to start the server run

```
node server.js
```

Alternatively, use a simple HTTP server:
cd frontend
python -m http.server 8000

Access the dashboard at http://localhost:8000/index.html.

Interact with the Dashboard:
Toggle between light/dark mode using the theme switch.
Use the search bar to query transactions.
Filter by category to view specific transaction types.
Explore visualizations and click through to transactions.html for details.

## Challenges and Lessons Learned

### Challenges:

Frontend: Chart.js charts failed to render when opening index.html directly; resolved by using VS Code Live Server and following tutorials.
Backend: Inconsistent SMS formats in modified_sms_v2.xml complicated regex extraction; handled by robust error checking and logging to unprocessed_sms.log. Missing fields required special handling to avoid database errors.
Teamwork: Scheduling conflicts were resolved by adjusting meeting times to accommodate all team members.

### Lessons Learned:

CSS variables streamlined styling and improved development speed.
Data validation ensured database integrity and prevented broken records.
Flexible schema design reduced future refactoring needs.
Error logging prevented silent data loss, improving debugging.

# Authors

See the AUTHORS file for a list of contributors and their contact details.
