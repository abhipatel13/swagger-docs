const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const path = require('path');

const app = express();

// Load YAML documents
const squarespaceDocument = YAML.load('./squarespace-api.yaml');
const integrationTestingDocument = YAML.load('./integration-testing-api.yaml');
const mockDataGenerationDocument = YAML.load('./mock-data-generation-api.yaml');
const performanceTestingDocument = YAML.load('./performance-testing-api.yaml');
const regressionTestingDocument = YAML.load('./regression-testing-api.yaml');
const postmanEchoDocument = YAML.load('./postman-echo-api.yaml');

// Enable CORS for all requests
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Proxy for Squarespace API
app.use('/api/squarespace', createProxyMiddleware({
  target: 'https://api.squarespace.com',
  changeOrigin: true,
  pathRewrite: { '^/api/squarespace': '' },
}));

// Proxy for Integration Testing API
app.use('/api/integration-testing', createProxyMiddleware({
  target: 'https://postman-integration-testing.glitch.me',
  changeOrigin: true,
  pathRewrite: { '^/api/integration-testing': '' },
}));

// Proxy for Postman Echo API
app.use('/api/echo', createProxyMiddleware({
  target: 'https://postman-echo.com',
  changeOrigin: true,
  pathRewrite: { '^/api/echo': '' },
}));

// Proxy for Mock Data Generation API
app.use('/api/mock-data-generation', createProxyMiddleware({
  target: 'https://mock-data-generation.glitch.me',
  changeOrigin: true,
  pathRewrite: { '^/api/mock-data-generation': '' },
}));

// Proxy for Performance Testing API (fallback to postman-echo.com)
app.use('/api/performance-testing', createProxyMiddleware({
  target: 'https://postman-echo.com',
  changeOrigin: true,
  pathRewrite: { '^/api/performance-testing': '' },
}));

// Proxy for Regression Testing API (fallback to postman-echo.com)
app.use('/api/regression-testing', createProxyMiddleware({
  target: 'https://postman-echo.com',
  changeOrigin: true,
  pathRewrite: { '^/api/regression-testing': '' },
}));

// Serve Swagger documentation for each API
app.use('/squarespace-api', swaggerUi.serve, swaggerUi.setup(squarespaceDocument, {
  customSiteTitle: "Squarespace API Documentation",
  customCss: '.swagger-ui .topbar { display: none }',
  customJs: '/js/custom.js'
}));

app.use('/integration-testing-api', swaggerUi.serve, swaggerUi.setup(integrationTestingDocument, {
  customSiteTitle: "Integration Testing API Documentation",
  customCss: '.swagger-ui .topbar { display: none }',
  customJs: '/js/custom.js'
}));

app.use('/postman-echo-api', swaggerUi.serve, swaggerUi.setup(postmanEchoDocument, {
  customSiteTitle: "Postman Echo API Documentation",
  customCss: '.swagger-ui .topbar { display: none }',
  customJs: '/js/custom.js'
}));

app.use('/mock-data-generation-api', swaggerUi.serve, swaggerUi.setup(mockDataGenerationDocument, {
  customSiteTitle: "Mock Data Generation API Documentation",
  customCss: '.swagger-ui .topbar { display: none }',
  customJs: '/js/custom.js'
}));

app.use('/performance-testing-api', swaggerUi.serve, swaggerUi.setup(performanceTestingDocument, {
  customSiteTitle: "Performance Testing API Documentation",
  customCss: '.swagger-ui .topbar { display: none }',
  customJs: '/js/custom.js'
}));

app.use('/regression-testing-api', swaggerUi.serve, swaggerUi.setup(regressionTestingDocument, {
  customSiteTitle: "Regression Testing API Documentation",
  customCss: '.swagger-ui .topbar { display: none }',
  customJs: '/js/custom.js'
}));

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API Documentation Hub is running' });
});

// Get port from environment variable (Render sets PORT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation Hub available at http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('- / (Main Hub)');
  console.log('- /squarespace-api');
  console.log('- /integration-testing-api');
  console.log('- /postman-echo-api');
  console.log('- /mock-data-generation-api');
  console.log('- /performance-testing-api');
  console.log('- /regression-testing-api');
  console.log('- /health (Health check)');
});
