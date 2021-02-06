const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// Get the gamer profile, Platform and gamer name as params
router.get("/:platform/:gamertag", async (req, res) => {
  try {
    const headers = {
      "TRN-Api-Key": process.env.TRACKER_API_KEY,
    };

    //  Assign passed url params to variables
    const { platform, gamertag } = req.params;

    //  access the data contained in the url with the request params
    const response = await fetch(
      `${process.env.TRACKER_API_URL}/profile/${platform}/${gamertag}`,
      { headers }
    );

    //  Assign data to a variable in json format
    const data = await response.json();
    if (data.errors && data.errors.length > 0) {
      return res.status(404).json({
        message: "Profile Not Found",
      });
    }

    res.json(data);
  } catch (err) {
    console.error(err);

    //  Return a server error incase of faliure
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
