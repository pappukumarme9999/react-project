import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import './database/dbconfig.js';

import userRoute from "./routes/user.route.js";
import stateRouter from "./routes/state.route.js";
import cityRouter from "./routes/city.route.js";
import bookRoutes from "./routes/book.route.js";  // Import book route
import categoryRoute from "./routes/category.route.js";
import adminRouter from "./routes/admin.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRoute from "./routes/order.route.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 3006;
const __dirname = dirname(fileURLToPath(import.meta.url));



// Middleware
app.use(cors({
  origin: "http://localhost:3000",  // Allow frontend access
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use("/user", userRoute);
console.log("Registered /user route");

app.use("/state", stateRouter);
console.log("Registered /state route");

app.use("/city", cityRouter);
console.log("Registered /city route");

app.use("/book", bookRoutes); 
console.log("Registered /book route");

app.use("/category", categoryRoute);
console.log("Registered /category route");

app.use("/admin", adminRouter);
console.log("Registered /admin route");

app.use("/cart", cartRouter);
console.log("Registered /cart route");

app.use("/order", orderRoute);
console.log("Registered /order route");

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
