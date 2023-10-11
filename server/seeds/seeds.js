const db = require("../config/connection");
const { User, Capsule } = require("../models");

const userSeed = require("./userSeeds.json");
const capsuleSeed = require("./capsuleSeeds.json");

db.once("open", async () => {
  
  await User.deleteMany({});
  await Capsule.deleteMany({});

  const user = await User.create(userSeed);
  const cap = await Capsule.create(capsuleSeed);
  
  user.capsules.push(cap);

  user.save()


  console.log("all done!");
});
