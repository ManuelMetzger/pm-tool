const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(
    `MongoDB connected: ${conn.connection.host} on port ${conn.connection.port}`.cyan.underline.bold
  );
};

module.exports = connectDB;
