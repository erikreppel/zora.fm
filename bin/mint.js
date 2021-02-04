const {
  constructMediaData,
  sha256FromBuffer,
  generateMetadata,
  validateMetadata,
  parseMetadata,
  constructBidShares,
} = require("@zoralabs/zdk");

const { Zora } = require("@zoralabs/zdk");
const { Wallet, providers } = require("ethers");
const fs = require("fs");

const main = async () => {
  // Create provider, signer, zora zdk instance
  const provider = new providers.InfuraProvider(
    "homestead",
    process.env.INFURA_KEY
  );
  console.log(process.env.KEY_PATH);
  const wallet = new Wallet(
    `0x${fs.readFileSync(process.env.KEY_PATH)}`,
    provider
  );
  console.log(wallet.address);
  const zora = new Zora(wallet, 1);

  // create metadata and content to build mediaData and BidShares
  const metadata = {
    description: "🎵🌞🎵 internet pirate radio.",
    mimeType: "text/html",
    name: "zora.fm v1",
    version: "zora-20210101",
  };

  const metadataJSON = generateMetadata(metadata.version, metadata);
  console.log("generated", metadataJSON);
  const valid = validateMetadata(metadata.version, metadata);
  console.log("validated", valid);
  const parsable = parseMetadata(metadata.version, metadataJSON);
  console.log("parsable", parsable);

  fs.writeFileSync("bin/metadata.json", metadataJSON);
  const contentHash = sha256FromBuffer(fs.readFileSync("bin/index.html"));
  const metadataHash = sha256FromBuffer(Buffer.from(metadataJSON));
  const mediaData = constructMediaData(
    "https://cloudflare-ipfs.com/ipfs/QmUTMQLgvE2o2ZooR1gGsYjznE4rsYTKRLSwDo5wwHhjBW",
    "https://cloudflare-ipfs.com/ipfs/QmS23rGm5yLW9c4gAWKtn9na4n3k2YWjT2LzDKiUWdmrZs",
    contentHash,
    metadataHash
  );

  console.log("Content Hash", contentHash);
  console.log("Metadata Hash", metadataHash);
  console.log("Media data", mediaData);

  const bidShares = constructBidShares(
    25, // creator share
    75, // owner share
    0 // prevOwner share
  );

  console.log({ bidShares });

  // Mint
  const gas = await zora.media.estimateGas.mint(mediaData, bidShares);
  console.log("gas estimate", await gas.toNumber());
  const tx = await zora.mint(mediaData, bidShares);
  await tx.wait(8); // 8 confirmations to finalize
  console.log("Done!", tx);
};

main();
