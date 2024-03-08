import express from "express";
import morgan from "morgan";
import cors from "cors";
import { userRouter } from "./routes/userRoutes.js";
import { cartRouter } from "./routes/cartRoutes.js";
import { orderRouter } from "./routes/orderRoutes.js";
import { productRouter } from "./routes/productRoutes.js";

export const app = express();

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(cors());

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/products", productRouter);

// HANDLE UNHANDLED ROUTES
app.all("*", (req, res, next) => {});

// HANDLE ERROR GLOBALLY
app.use((err, req, res, next) => {});
