import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { decryptGuideFile, encryptForBattletag } from "../lib/rxp-crypto";

const SOURCE_TAG = "";
const TARGET_TAG = "player#1234";

const guides = [
  {
    input: "The Burning Crusade Speedrun Guide - Both Factions!",
    output: "guide_tbc_player_1234.txt",
  },
  {
    input: "WotLK Both Faction Guide 1-80!",
    output: "guide_wotlk_player_1234.txt",
  },
];

const publicDir = join(__dirname, "..", "public");

for (const { input, output } of guides) {
  const raw = readFileSync(join(publicDir, input), "utf-8");
  console.log(`Decrypting ${input}...`);
  const { plaintext, version, guideCount } = decryptGuideFile(raw, SOURCE_TAG);
  console.log(`  Found ${guideCount} guides (version ${version})`);

  console.log(`Re-encrypting for ${TARGET_TAG}...`);
  const encrypted = encryptForBattletag(plaintext, TARGET_TAG, version);

  const outPath = join(publicDir, output);
  writeFileSync(outPath, encrypted, "utf-8");
  console.log(`  Written to ${outPath}`);
}

console.log("Done!");
