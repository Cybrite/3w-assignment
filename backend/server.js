require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const start = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server failed to start", error.message);
    process.exit(1);
  }
};

start();
