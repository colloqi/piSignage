#!/usr/bin/env node
// Rebuilds the image download list and the Android section in README.md from images.json.
// images.json is also read by the pisignage-website downloads and hardware pages,
// so edit images.json first. The "Update README images" GitHub workflow runs this on
// every push to master that changes images.json; to run it locally: node scripts/update-readme-images.js
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const README = path.join(ROOT, "README.md");

const images = JSON.parse(fs.readFileSync(path.join(ROOT, "images.json"), "utf8"));

function line(image) {
    let text = `- [Version ${image.imageVersion || image.version} (${image.arch})](${image.href}) for ${image.models},\n` +
        `  based on ${image.os} (${image.size})`;
    if (image.gdriveHref) text += `\n  | [Gdrive link](${image.gdriveHref})`;
    return text;
}

// pi3 and piZero2W can share one image, list each file once
const current = [];
for (const key of ["pi64", "pi3", "piZero2W"]) {
    if (!current.some((image) => image.href === images[key].href)) current.push(images[key]);
}

const sections = {
    images: [
        `##### Trixie OS based ${images.pi64.imageVersion || images.pi64.version} image (NEW)`,
        "",
        ...current.map(line),
        "",
        "##### Other images based on older Raspberry OS versions",
        "",
        ...images.older.map(line),
        "",
        "##### Based on 32bit Raspberry Legacy OS(X), uses proprietary omxplayer to display video, still star performer for Pi4/1GB, PI3!",
        "",
        ...images.legacy.map(line)
    ],
    android: [
        `Android app for piSignage is available at [Google Play Store](${images.androidPlayStore.href})` +
            ` and on [Amazon Signage Stick](${images.amazonSignageStick.href})`,
        "",
        "Now piSignage player is also available in custom apk format with support for future OTA updates," +
            ` you can download the same here: [${images.androidApk.version}](${images.androidApk.href})`
    ]
};

let readme = fs.readFileSync(README, "utf8");
for (const [name, lines] of Object.entries(sections)) {
    const START = `<!-- ${name}:start (generated from images.json, run node scripts/update-readme-images.js) -->`;
    const END = `<!-- ${name}:end -->`;
    const start = readme.indexOf(START);
    const end = readme.indexOf(END);
    if (start === -1 || end === -1) {
        console.warn(`Skipping ${name}: README.md has no ${START} and ${END} markers`);
        continue;
    }
    readme = readme.slice(0, start) + [START, "", ...lines, "", END].join("\n") + readme.slice(end + END.length);
    console.log(`README.md ${name} section updated from images.json`);
}
fs.writeFileSync(README, readme);
