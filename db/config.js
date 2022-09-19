const mongoose = require("mongoose");

const connectionDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const url = `${connection.connection.host}:${connection.connection.port}`;

    console.log("mongoDb Connect");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  connectionDB,
};
