// const express = require('express');
// const app = express();
// const cors = require('cors');
// const router = require('../routes/rout')
// const PORT = 4000;

// app.use(cors());
// app.use(express.json);
// app.use("/api",router);

// app.listen(PORT,()=>{
//     console.log(`Server is running on:${PORT}`)
// });

const express = require('express');
const cors = require('cors');
const route = require('../routes/rout');

const app = express();
const port = 4000;

// Enable CORS for cross-origin requests
app.use(cors());
app.use(express.json());


// Use the routes
app.use('/', route);

// Start the server
app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});