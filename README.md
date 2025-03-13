# Ovi Sinugbang Manok Kiosk Application

This project is a kiosk application designed for Ovi Sinugbang Manok to streamline the customer ordering process. It allows customers to easily browse the menu (including budget meals and add-ons), create orders, and submit them. A back-end API handles the insertion of order details into a MySQL database.

## Installation and Setup

Follow these instructions to install, configure, and run the project.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **XAMPP:** (or any equivalent web server with MySQL/MariaDB) - Used for setting up the database.
*   **Node.js:** (v16 or higher recommended) - JavaScript runtime environment for running the server.
*   **Visual Studio Code (VS Code):** - Code editor (optional, but highly recommended).
*   **Live Server Extension (VS Code):** - Simplifies testing HTML files.

### Database Setup

1.  **Import the Database:**
    *   Start the Apache and MySQL modules in your XAMPP control panel.
    *   Open your web browser and navigate to `http://localhost/phpmyadmin/`.
    *   Create a new database named `db_ovisinugbangmanok`.
    *   Click on the newly created database.
    *   Click on the "Import" tab.
    *   Choose the `db_ovisinugbangmanok.sql` file from the project directory.
    *   Click "Go" to import the database schema and initial data.

### Project Setup

1.  **Clone/Download the Repository:**
    *   Download the project files, or clone from your repository (if using Git):

    ```bash
    git clone [your repository URL]
    ```

2.  **Navigate to the Server Directory:**
    *   Open your terminal or command prompt.
    *   Navigate to the `server` directory (assuming you have an HTML file and separate backend server.js):

    ```bash
    cd server
    ```

3.  **Install Dependencies:**
    *   Run the following command to install the required Node.js packages:

    ```bash
    npm install express mysql
    ```

### Configuration

1.  **Configure Database Connection:**
    *   Open the `server.js` file.
    *   Locate the database connection configuration:

    ```javascript
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'your_user',
        password: 'your_password',
        database: 'db_ovisinugbangmanok'
    });
    ```

    *   Replace `your_user`, `your_password` with your actual MySQL/MariaDB username and password. Ensure the `database` is set to `db_ovisinugbangmanok`.

### Running the Application

1.  **Start the Server:**
    *   In your terminal (within the `server` directory), run the following command to start the Node.js server:

    ```bash
    node server.js
    ```
    *   You should see a message indicating that the server is running (e.g., `Server listening at http://localhost:3000`).

2.  **Open the Kiosk Interface:**
    *   Open the `kiosk.html` file in VS Code.
    *   If you have the Live Server extension installed, right-click on the HTML file and select "Open with Live Server". This will automatically open the HTML file in your default web browser (usually at `http://127.0.0.1:5500/kiosk.html`). If Live Server isn't running automatically, look for a "Go Live" button in the bottom right corner of VS Code and click it.
    *   If you don't use Live Server, simply open the `kiosk.html` file in your web browser directly (e.g., by double-clicking the file).

    ***Important:** Ensure your Node.js server (from step 1) is running in the background while you interact with the kiosk interface in your web browser. The kiosk interface communicates with this server to process orders.*

## Environment Variables

This project does not explicitly rely on environment variables. However, for production deployment, it is highly recommended to use environment variables to store sensitive information like database credentials.

## Troubleshooting

*   **"Cannot connect to database" error:**
    *   Verify that the MySQL/MariaDB server is running in XAMPP.
    *   Double-check the database credentials (`host`, `user`, `password`, `database`) in `server.js`.
    *   Ensure that your MySQL user has the necessary privileges to access the `db_ovisinugbangmanok` database.
*   **"Cannot find module 'express'" or "'mysql'" error:**
    *   Make sure you ran `npm install express mysql` in the `server` directory.  If not, run it now.
*   **Kiosk interface not displaying correctly:**
    *   Check your browser's developer console (usually by pressing F12) for any JavaScript errors.
    *   Clear your browser's cache and try again.
*   **Orders are not being created in the database:**
    *   Check the Node.js server console for any error messages.
    *   Verify that the `db_ovisinugbangmanok` database exists and that the necessary tables have been imported correctly.

## Important Considerations

*   **Security:** This example is for demonstration purposes.  For a production environment, you should implement proper security measures, including:
    *   Input validation and sanitization to prevent SQL injection.
    *   Authentication and authorization to restrict access to sensitive data and functionality.
    *   HTTPS to encrypt communication between the client and server.
*   **Error Handling:** Enhance the error handling in the backend API to provide more informative error messages to the client.
*   **Scalability:**  For a high-traffic application, consider using a more robust database connection pool and optimizing your database queries.
*   **Staff ID and Customer ID:** The current implementation uses a hardcoded `staffId` and allows for a `null` customer ID for guest checkouts.  In a real-world scenario, you'll need a proper user authentication system and a way to associate orders with specific customers.

This README provides a comprehensive guide to installing, configuring, and running the Ovi Sinugbang Manok kiosk application.  Follow the instructions carefully, and happy ordering!
