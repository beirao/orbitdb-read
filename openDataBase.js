const IPFS = require("ipfs");
const OrbitDB = require("orbit-db");

async function main() {
  // Create IPFS instance
  const ipfsOptions = { repo: "./ipfs" };
  const ipfs = await IPFS.create(ipfsOptions);

  // Create OrbitDB instance
  const orbitdb = await OrbitDB.createInstance(ipfs, {
    directory: "./orbitdb",
  });

  // Open database and read value
  const db = await orbitdb.open(
    "/orbitdb/zdpuAqchjTEsoExUHaSmMePf2CMzjaP2UgaHTZxzxcuLUMstY/first-database"
  );
  await db.load();
  const value = await db.all;
  console.log("value : ", value);

  await orbitdb.disconnect();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
