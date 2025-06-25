const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const path = require('path');

const app = express();

// Load YAML documents with error handling and logging
let squarespaceDocument, integrationTestingDocument, mockDataGenerationDocument, 
    performanceTestingDocument, regressionTestingDocument, postmanEchoDocument;

try {
  squarespaceDocument = YAML.load(path.join(__dirname, 'squarespace-api.yaml'));
  console.log('✅ Loaded Squarespace API:', squarespaceDocument.info.title);
} catch (error) {
  console.error('❌ Error loading squarespace-api.yaml:', error.message);
}

try {
  integrationTestingDocument = YAML.load(path.join(__dirname, 'integration-testing-api.yaml'));
  console.log('✅ Loaded Integration Testing API:', integrationTestingDocument.info.title);
} catch (error) {
  console.error('❌ Error loading integration-testing-api.yaml:', error.message);
}

try {
  mockDataGenerationDocument = YAML.load(path.join(__dirname, 'mock-data-generation-api.yaml'));
  console.log('✅ Loaded Mock Data Generation API:', mockDataGenerationDocument.info.title);
} catch (error) {
  console.error('❌ Error loading mock-data-generation-api.yaml:', error.message);
}

try {
  performanceTestingDocument = YAML.load(path.join(__dirname, 'performance-testing-api.yaml'));
  console.log('✅ Loaded Performance Testing API:', performanceTestingDocument.info.title);
} catch (error) {
  console.error('❌ Error loading performance-testing-api.yaml:', error.message);
}

try {
  regressionTestingDocument = YAML.load(path.join(__dirname, 'regression-testing-api.yaml'));
  console.log('✅ Loaded Regression Testing API:', regressionTestingDocument.info.title);
} catch (error) {
  console.error('❌ Error loading regression-testing-api.yaml:', error.message);
}

try {
  postmanEchoDocument = YAML.load(path.join(__dirname, 'postman-echo-api.yaml'));
  console.log('✅ Loaded Postman Echo API:', postmanEchoDocument.info.title);
} catch (error) {
  console.error('❌ Error loading postman-echo-api.yaml:', error.message);
}

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
app.use('/squarespace-api', swaggerUi.serve, (req, res, next) => {
  if (!squarespaceDocument) {
    return res.status(500).send('Squarespace API documentation not loaded');
  }
  console.log('🔍 Serving Squarespace API:', squarespaceDocument.info.title);
  swaggerUi.setup(squarespaceDocument, {
    customSiteTitle: "Squarespace API Documentation",
    customCss: '.swagger-ui .topbar { display: none }',
    customJs: '/js/custom.js'
  })(req, res, next);
});

app.use('/integration-testing-api', swaggerUi.serve, (req, res, next) => {
  if (!integrationTestingDocument) {
    return res.status(500).send('Integration Testing API documentation not loaded');
  }
  console.log('🔍 Serving Integration Testing API:', integrationTestingDocument.info.title);
  swaggerUi.setup(integrationTestingDocument, {
    customSiteTitle: "Integration Testing API Documentation",
    customCss: '.swagger-ui .topbar { display: none }',
    customJs: '/js/custom.js'
  })(req, res, next);
});

app.use('/mock-data-generation-api', swaggerUi.serve, (req, res, next) => {
  if (!mockDataGenerationDocument) {
    return res.status(500).send('Mock Data Generation API documentation not loaded');
  }
  console.log('🔍 Serving Mock Data Generation API:', mockDataGenerationDocument.info.title);
  swaggerUi.setup(mockDataGenerationDocument, {
    customSiteTitle: "Mock Data Generation API Documentation",
    customCss: '.swagger-ui .topbar { display: none }',
    customJs: '/js/custom.js'
  })(req, res, next);
});

app.use('/performance-testing-api', swaggerUi.serve, (req, res, next) => {
  if (!performanceTestingDocument) {
    return res.status(500).send('Performance Testing API documentation not loaded');
  }
  console.log('🔍 Serving Performance Testing API:', performanceTestingDocument.info.title);
  swaggerUi.setup(performanceTestingDocument, {
    customSiteTitle: "Performance Testing API Documentation",
    customCss: '.swagger-ui .topbar { display: none }',
    customJs: '/js/custom.js'
  })(req, res, next);
});

app.use('/regression-testing-api', swaggerUi.serve, (req, res, next) => {
  if (!regressionTestingDocument) {
    return res.status(500).send('Regression Testing API documentation not loaded');
  }
  console.log('🔍 Serving Regression Testing API:', regressionTestingDocument.info.title);
  swaggerUi.setup(regressionTestingDocument, {
    customSiteTitle: "Regression Testing API Documentation",
    customCss: '.swagger-ui .topbar { display: none }',
    customJs: '/js/custom.js'
  })(req, res, next);
});

app.use('/postman-echo-api', swaggerUi.serve, (req, res, next) => {
  if (!postmanEchoDocument) {
    return res.status(500).send('Postman Echo API documentation not loaded');
  }
  console.log('🔍 Serving Postman Echo API:', postmanEchoDocument.info.title);
  swaggerUi.setup(postmanEchoDocument, {
    customSiteTitle: "Postman Echo API Documentation",
    customCss: '.swagger-ui .topbar { display: none }',
    customJs: '/js/custom.js'
  })(req, res, next);
});

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
