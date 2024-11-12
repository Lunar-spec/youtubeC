import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import videoRoutes from "./routes/video.js";
import channelRoutes from "./routes/channel.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api', videoRoutes);
app.use('/api', channelRoutes);

app.use(errorHandler);

app.get('/', async (req, res) => {
    res.send(`Server is running on port http://localhost:${PORT}`);
});

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}

startServer();