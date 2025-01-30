const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const plantsRouter = require('./routes/plants');
const characteristicsRouter = require('./routes/characteristics');
const associationsRouter = require('./routes/associations');

// Use Routes
app.use('/api/plants', plantsRouter);
app.use('/api/characteristics', characteristicsRouter);
app.use('/api/associations', associationsRouter);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
