// Load environment variables before anything else
import "dotenv/config";

import app from './app.js';
import http from "http";

const PORT = process.env.PORT;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
