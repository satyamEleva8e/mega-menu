import express from "express";

const app = express();
const PORT = 7000;
const API_PREFIX = "/api";

app.use(express.json());

const initialize = async () => {
    try {
        server.use(API_PREFIX, default_routes);

        app.listen(PORT, async () => {
            console.log(`\tServer running on http://localhost:${PORT}`);
            console.log("-------------------------------------------------");
        });
    } catch (error) {
        console.log(error?.message || "server not started");
        process.exit(1);
    }
};
