const express = require('express');

const app = express();
app.use(express.json());

app.use('/api/companies', require('./routes/companies'));
app.use('/api/reports', require('./routes/reports'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
