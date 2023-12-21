const mongoose = require("mongoose");
const mongourl =
  "mongodb+srv://vineettiwari041997:2rFsUAsvykcNt5oa@cluster0.ojrlcac.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const dbConnect = async () => {
  try {
    await mongoose.connect(mongourl);
    console.log("db connected successfully");
    const fetched_data = await mongoose.connection.db.collection("fooditems");
    // console.log(fetched_data);
    let data = await fetched_data.find({}).toArray();
    global.fooditems = data;
    const foodCategory = await mongoose.connection.db.collection(
      "foodCategory"
    );
    let catData = await foodCategory.find({}).toArray();
    global.foodCategory = catData;
    // await fetched_data.find({}).toArray(function (err, data) {
    //   if (err) console.log(err);
    //   else console.log(data);
    // });
    // console.log(data);
  } catch (err) {
    console.log("db connection issue");
    console.error(err);
  }
};
module.exports = dbConnect;
