# Backend Folder Structure

- **server.js**: The entry point of the backend application. It sets up the Express server, middleware, and routes.
- **config/**: Contains configuration files, such as `db.js` for connecting to the MongoDB database.
- **controllers/**: Contains the logic for processing functionality and handling requests (MVC pattern).
- **models/**: Contains Mongoose schemas and models for data (e.g., Job, User).
- **routes/**: Defines the API endpoints (routes) and maps them to the appropriate controllers.
- **middleware/**: Contains custom middleware functions for error handling, authentication, logging, etc.
- **.env**: Stores environment variables like API keys, database URIs, and port numbers (should not be shared).
