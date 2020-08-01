const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./utils/db");
const studentRouter = require("./routes/student");
const feesbookRouter = require("./routes/fees");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/students", studentRouter);
app.use("/api/feesbooks", feesbookRouter);
app.use(errorHandler);
app.use((req, res, next) => {
	res.status(404).json({ success: false, error: "Sorry, can't find that." });
});

connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server started on port number ${port}`);
});
