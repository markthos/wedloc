const db = require("../config/connection");
const { User, Capsule } = require("../models");

const userSeed = require("./userSeeds.json");
const capsuleSeed = require("./capsuleSeeds.json");

db.once("open", async () => {
  
  await User.deleteMany({});
  await Capsule.deleteMany({});

  const user = await User.create(userSeed);
  console.log(user);
  const cap = await Capsule.create(capsuleSeed);
  console.log(cap);
  
  user.capsules.push(cap);
  console.log(user);

  // update user with associated capsule by owner and username
  await User.findOneAndUpdate(
    { owner: User.username },
    { $addToSet: { capsules: cap._id } }
  );

  console.log("all done!");
  process.exit(0);
});
