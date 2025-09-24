# Full Stack Part 3 - Phonebook Backend

A Node.js/Express backend for a phonebook application with MongoDB database integration.

## Features

- RESTful API for managing phonebook entries
- MongoDB database with Mongoose ODM
- Data validation for names and phone numbers
- CORS support for frontend integration
- Request logging with Morgan middleware
- Error handling middleware
- ESLint configuration for code quality

## API Endpoints

### GET /api/persons
Returns all phonebook entries as JSON.

### GET /api/persons/:id
Returns a single phonebook entry by ID.

### GET /info
Returns information about the phonebook (number of entries and request timestamp).

### POST /api/persons
Creates a new phonebook entry.
- Body: `{ "name": "Person Name", "number": "XX-XXXXXXX" }`
- Validation: Name minimum 3 characters, phone number format XX-XXXXXX or XXX-XXXXXX

### PUT /api/persons/:id
Updates an existing phonebook entry.

### DELETE /api/persons/:id
Deletes a phonebook entry by ID.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3001
   ```

3. Start the server:
   ```bash
   npm start          # Production mode
   npm run dev        # Development mode with auto-restart
   ```

## Database

The application uses MongoDB Atlas. Set up your database and add the connection string to the `.env` file.

### Command-line database tool

Use `mongo.js` to interact with the database:

```bash
# Display all entries
node mongo.js <password>

# Add new entry
node mongo.js <password> "Name" "XX-XXXXXXX"
```

## Validation

- **Name**: Minimum 3 characters, required
- **Phone number**: Minimum 8 characters, format XX-XXXXXX or XXX-XXXXXX, required

## Code Quality

The project uses ESLint for code quality and style checking:

```bash
npm run lint
```

## Deployment

The application is configured for deployment to platforms like Fly.io or Render:
- Uses `process.env.PORT` for dynamic port assignment
- Environment variables configured via platform settings
- CORS enabled for frontend integration

## Technologies

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- Morgan (logging)
- dotenv (environment variables)
- ESLint (code quality)

## Exercise Completion Status

✅ 3.1-3.8: Basic phonebook backend with hardcoded data  
✅ 3.9: CORS support for frontend integration  
✅ 3.12: Command-line database tool  
✅ 3.13-3.14: MongoDB integration for fetching and saving  
✅ 3.15: Database deletion support  
✅ 3.16: Error handling middleware  
✅ 3.17: PUT requests for updating entries  
✅ 3.18: Single person and info routes with database  
✅ 3.19-3.20: Data validation (name and phone number)  
✅ 3.22: ESLint configuration  

⏳ 3.10-3.11, 3.21: Deployment tasks (ready for deployment)