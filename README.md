# AI Web Development Project

A full-stack web application that integrates Anthropic Claude (e.g., claude-3-haiku-20240307) for text generation with a modern React frontend and Node.js/Express backend. The application allows users to generate AI-powered text responses and maintains a history of all interactions in a MongoDB database.

## 🚀 Features

- **AI Text Generation**: Generate text responses using Anthropic Claude models
- **Interactive History**: View and manage all previous AI interactions
- **Real-time API Integration**: Seamless communication with Anthropic API
- **MongoDB Storage**: Persistent storage of all interactions with metadata
- **Modern UI**: Clean and responsive React-based user interface
- **CORS Enabled**: Cross-origin resource sharing for frontend-backend communication

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern JavaScript library for building user interfaces
- **CSS3** - Styling and responsive design
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Anthropic Claude API** - AI text generation service

### Development Tools
- **Nodemon** - Auto-restart server during development
- **Concurrently** - Run frontend and backend simultaneously

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 14.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or Atlas)
- **Anthropic API Key** (for AI text generation)

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/rahul-sharma4132/JS_Project.git
cd JS_Project
```

2. **Install all dependencies**
```bash
npm run install:all
```

This command will install dependencies for:
- Root project
- Backend server
- Frontend React app

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```bash
# Anthropic API Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# MongoDB Configuration (optional - currently hardcoded in config/db.js)
MONGODB_URI=your_mongodb_connection_string
```

### Database Configuration

The MongoDB connection is currently configured in `backend/config/db.js`. For production, consider moving the connection string to environment variables.

### Accessing Your Local MongoDB

To connect to your local MongoDB instance and inspect your data, use:

```bash
mongosh "mongodb://localhost:27017"
```

This will open the MongoDB shell connected to your local database.

## 🏃‍♂️ Running the Application

### Using Docker (Recommended)

The easiest way to run the entire application is using Docker Compose:

1. **Create a `.env` file** in the project root with your Anthropic API key:
   ```bash
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

2. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001
   - MongoDB: localhost:27017

4. **Stop the services:**
   ```bash
   docker-compose down
   ```

### Development Mode (Without Docker)

Run both frontend and backend concurrently:
```bash
npm run startApp
```

This will start:
- **Backend server** on `http://localhost:5001`
- **Frontend React app** on `http://localhost:3000`

### Individual Services

**Start Backend Only:**
```bash
npm run start:backend
# or
cd backend && npm run dev
```

**Start Frontend Only:**
```bash
npm run start:frontend
# or
cd frontend/my-app && npm start
```

## 📁 Project Structure

```
JS_Project/
├── backend/                    # Express.js backend
│   ├── config/
│   │   └── db.js             # MongoDB connection configuration
│   ├── models/
│   │   └── Interaction.js    # Mongoose schema for interactions
│   ├── routes/
│   │   └── ai.js             # AI-related API endpoints
│   ├── .env                  # Environment variables
│   ├── package.json          # Backend dependencies
│   └── server.js             # Express server entry point
├── frontend/
│   └── my-app/               # React frontend
│       ├── src/
│       │   ├── components/
│       │   │   ├── TextGenerator.js      # AI text generation component
│       │   │   └── InteractionHistory.js # Interaction history component
│       │   ├── App.js                    # Main React component
│       │   └── App.css                   # Main styles
│       └── package.json      # Frontend dependencies
├── package.json              # Root project configuration
└── README.md                 # This file
```

## 🔌 API Endpoints

### Base URL: `http://localhost:5001`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Welcome message |
| `GET` | `/api/test` | Backend health check |
| `POST` | `/api/ai/generate` | Generate AI text response |
| `GET` | `/api/ai/history` | Get all interaction history |

### AI Generation Endpoint

**POST** `/api/ai/generate`

**Request Body:**
```json
{
  "prompt": "Your text prompt here",
  "maxTokens": 100
}
```

**Response:**
```json
{
  "result": "AI generated response",
  "usage": {
    "input_tokens": 10,
    "output_tokens": 50,
    "total_tokens": 60
  }
}
```

## 🎯 Usage

1. **Start the application** using `npm run startApp`
2. **Open your browser** and navigate to `http://localhost:3000`

![AI Text Generator Interface](./images/Screenshot%202025-07-29%20at%208.33.35%20AM.png)

3. **Switch between tabs**:
   - **Generate Text**: Create new AI-powered text responses
   - **View History**: Browse all previous interactions

![Interaction History View](./images/Screenshot%202025-07-29%20at%208.33.58%20AM.png)

4. **Enter your prompt** and click "Generate" to get AI responses
5. **View interaction history** including tokens used and timestamps

## 📊 Database View

Your interactions are stored in MongoDB and can be viewed using MongoDB Compass:

![MongoDB Compass - Interactions Collection](./images/Screenshot%202025-07-29%20at%208.34.01%20AM.png)

## 🔧 Available Scripts

### Root Level
- `npm run startApp` - Start both frontend and backend concurrently
- `npm run start:backend` - Start backend server only
- `npm run start:frontend` - Start frontend React app only
- `npm run install:all` - Install all dependencies for all services

### Docker Commands
- `docker-compose up --build` - Build and start all services
- `docker-compose up` - Start all services (if already built)
- `docker-compose down` - Stop all services
- `docker-compose logs` - View logs from all services
- `docker-compose logs [service-name]` - View logs from specific service

### Backend (`cd backend`)
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend (`cd frontend/my-app`)
- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🐛 Troubleshooting

### Common Issues

**Issue:** Port already in use
```bash
# Kill process using port 5001
lsof -ti:5001 | xargs kill -9
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

**Issue:** MongoDB connection failed
- Check your MongoDB service is running
- Verify MongoDB connection string is correct in `backend/config/db.js`

**Issue:** Anthropic API errors
- Verify your Anthropic API key is valid
- Check your Anthropic account has sufficient credits
- Ensure the API key is set in your `.env` file

**Issue:** Module not found errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
cd backend && rm -rf node_modules package-lock.json && npm install
cd ../frontend/my-app && rm -rf node_modules package-lock.json && npm install
```

## 🔒 Security Notes

- **API Keys**: Never commit your Anthropic API key to version control
- **Database**: Consider using environment variables for database connection strings
- **CORS**: Currently configured to allow all origins (`*`) - restrict for production

## 🚀 Deployment

### Backend Deployment (Heroku/Vercel/Railway)

1. Set environment variables:
   - `ANTHROPIC_API_KEY`
   - `MONGODB_URI`

2. Update CORS settings for your production domain

3. Deploy using your preferred platform

### Frontend Deployment (Netlify/Vercel)

1. Build the React app:
```bash
cd frontend/my-app
npm run build
```

2. Deploy the `build` folder to your hosting platform

3. Update API endpoint URLs to point to your production backend

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Rahul Sharma**
- Email: rahul4132@gmail.com
- GitHub: [@rahul-sharma4132](https://github.com/rahul-sharma4132)

## 🙏 Acknowledgments

- [Anthropic](https://www.anthropic.com/) for providing the Claude API
- [React](https://reactjs.org/) team for the amazing frontend library
- [Express.js](https://expressjs.com/) for the robust backend framework
- [MongoDB](https://www.mongodb.com/) for the flexible database solution

---

**Project Link:** [JS Project](https://github.com/rahul-sharma4132/JS_Project)