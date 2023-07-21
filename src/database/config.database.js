import mongoose from "mongoose";

const connectToDatabase = function (config) {
  // define connection
  mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // listen for errors
  mongoose.connection.on("error", (err) =>
    console.error(`  ☣  Error in connectiong to our database: ${err}  ☣ `)
  );
  // listen for successful connection
  mongoose.connection.once("open", () =>
    console.info(`🚀  Database connection successful 🚀 `)
  );
};

export default connectToDatabase;
