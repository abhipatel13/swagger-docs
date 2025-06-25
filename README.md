# API Documentation Hub

A comprehensive API documentation hub that provides Swagger UI documentation for multiple services including Squarespace API, Integration Testing, Postman Echo, Mock Data Generation, Performance Testing, and Regression Testing.

## Features

- 🏠 **Central Hub**: Beautiful landing page with navigation to all API documentation
- 📚 **Multiple APIs**: Documentation for 6 different API services
- 🔄 **Proxy Support**: Routes API calls through the server to external services
- 🎨 **Custom UI**: Enhanced Swagger UI with custom navigation
- 📱 **Responsive**: Works on desktop and mobile devices
- 🚀 **Deployment Ready**: Configured for Render deployment

## Available APIs

1. **Squarespace API** (`/squarespace-api`) - E-commerce platform API
2. **Integration Testing API** (`/integration-testing-api`) - Token-based authentication testing
3. **Postman Echo API** (`/postman-echo-api`) - HTTP method testing
4. **Mock Data Generation API** (`/mock-data-generation-api`) - Generate test data
5. **Performance Testing API** (`/performance-testing-api`) - Load testing
6. **Regression Testing API** (`/regression-testing-api`) - API regression testing

## Local Development

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd swagger-docs
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Deployment on Render

### Step 1: Prepare Your Repository

1. Make sure all files are committed to your Git repository
2. Ensure your repository is public or you have a paid Render account

### Step 2: Deploy on Render

1. **Sign up/Login**: Go to [render.com](https://render.com) and create an account or log in

2. **Create New Web Service**:
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub/GitLab repository

3. **Configure the Service**:
   - **Name**: `api-documentation-hub` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Choose Free or Paid plan

4. **Environment Variables** (optional):
   - `NODE_ENV`: `production`

5. **Click "Create Web Service"**

### Step 3: Wait for Deployment

- Render will automatically build and deploy your application
- You'll get a URL like: `https://your-app-name.onrender.com`

### Step 4: Access Your Application

- Main Hub: `https://your-app-name.onrender.com/`
- Squarespace API: `https://your-app-name.onrender.com/squarespace-api`
- Integration Testing API: `https://your-app-name.onrender.com/integration-testing-api`
- Postman Echo API: `https://your-app-name.onrender.com/postman-echo-api`
- Mock Data Generation API: `https://your-app-name.onrender.com/mock-data-generation-api`
- Performance Testing API: `https://your-app-name.onrender.com/performance-testing-api`
- Regression Testing API: `https://your-app-name.onrender.com/regression-testing-api`
- Health Check: `https://your-app-name.onrender.com/health`

## Project Structure

```
swagger-docs/
├── server.js                 # Main Express server
├── package.json             # Dependencies and scripts
├── index.html               # Main hub landing page
├── public/
│   └── js/
│       └── custom.js        # Custom Swagger UI enhancements
├── squarespace-api.yaml     # Squarespace API documentation
├── integration-testing-api.yaml
├── postman-echo-api.yaml
├── mock-data-generation-api.yaml
├── performance-testing-api.yaml
├── regression-testing-api.yaml
└── README.md
```

## API Proxy Configuration

The application acts as a proxy for external APIs:

- **Squarespace API**: `https://api.squarespace.com`
- **Integration Testing**: `https://postman-integration-testing.glitch.me`
- **Postman Echo**: `https://postman-echo.com`
- **Mock Data Generation**: `https://mock-data-generation.glitch.me`
- **Performance Testing**: `https://postman-echo.com` (fallback)
- **Regression Testing**: `https://postman-echo.com` (fallback)

## Customization

### Adding New APIs

1. Create a new YAML file (e.g., `new-api.yaml`)
2. Add the proxy configuration in `server.js`
3. Add the Swagger UI route in `server.js`
4. Update the navigation in `index.html`

### Styling

- Main hub styling is in `index.html`
- Swagger UI customizations are in `public/js/custom.js`
- You can modify colors, fonts, and layout as needed

## Troubleshooting

### Common Issues

1. **Port Issues**: The app uses `process.env.PORT` for Render deployment
2. **YAML Loading**: Ensure all YAML files are properly formatted
3. **Proxy Errors**: Check if external APIs are accessible
4. **Build Failures**: Verify all dependencies are in `package.json`

### Health Check

Visit `/health` to verify the application is running correctly.

## License

MIT License - feel free to use this project for your own API documentation needs.

## Support

If you encounter any issues:
1. Check the Render deployment logs
2. Verify all files are properly committed
3. Ensure Node.js version is 16 or higher
4. Check that all dependencies are installed # swagger-docs
