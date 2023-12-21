const express = require("express");
const router = express.Router();

router.get("/foodData", (req, res) => {
  try {
    console.log(global.fooditems);
    res.send([global.fooditems, global.foodCategory]);
    // res.json({
    //   success: true,
    //   array: [global.fooditems, global.foodCategory],
    // });
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});
module.exports = router;
