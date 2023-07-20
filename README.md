# flight-info

### Welcome to Flight-Info!

This is a simple web application that consists of a backend built with Node.js, Express, CORS, and dotenv, and a frontend built with React and TypeScript, using react-router-dom for routing.

Below, you will find instructions on how to set up and run the app on your local machine.

The app retrieves its data from a `flights.json` file, which allows for a lightweight implementation without the need for a full database integration.

## Getting Started

### Prerequisites

Node.js and npm (Node Package Manager) must be installed on your machine. You can download the latest version from the official Node.js website: https://nodejs.org

#### Installation

Clone this repository to your local machine using the following command:

```
git clone https://github.com/winterborn/flight-info.git
```

Navigate to the backend folder:

Create a `.env` file in the backend folder and set the `PORT` to `4000`:

Install the backend dependencies:

```
npm install
```

Navigate to the frontend folder:

Install the frontend dependencies:

```
npm install
```

### Running the App

Start the backend server. From the backend folder:

```
npm run dev
```

The backend server will run on `http://localhost:4000` (or the port specified in the .env file).

Open a new terminal window and navigate to the frontend folder:

Start the frontend development server:

```
npm start
```

The frontend will be accessible on `http://localhost:3000`, and it will automatically open in your default web browser.

## Tests

To run tests for the backend, navigate to the backend folder and execute the following command:

```
npm test
```

## Acknowledgments

Special thanks to Edinburgh Airport for the `flights.json` data.

```

```
