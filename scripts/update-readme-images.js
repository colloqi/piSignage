#!/usr/bin/env node
// Rebuilds the generated sections of README.md (Raspberry Pi images, Linux, More Resources
// and Android) from images.json. images.json is also read by the pisignage-website
// downloads and hardware pages, so edit images.json first and then run: npm run update-readme
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const README = path.join(ROOT, "README.md");

const images = JSON.parse(fs.readFileSync(path.join(ROOT, "images.json"), "utf8"));

function line(image) {
    let text = `- [Version ${image.version} (${image.arch})](${image.href}) for ${image.models},\n` +
        `  based on ${image.os} (${image.size})`;
    if (image.gdriveHref) text += `\n  | [Gdrive link](${image.gdriveHref})`;
    return text;
}

// pi3 and piZero2W can share one image, list each file once
const current = [];
for (const key of ["pi64", "pi3", "piZero2W"]) {
    if (!current.some((image) => image.href === images[key].href)) current.push(images[key]);
}

const { linux, openSourceServer, selfHostedServer, webApp, androidPlayStore, amazonSignageStick, androidApk } = images;

// Each section names the images.json keys it is built from; the README comments list them too
const sections = {
    images: { keys: "pi64, pi3, piZero2W, older, legacy", lines: [
        `##### Trixie OS based ${images.pi64.version} image (NEW)`,
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
    ] },
    linux: { keys: "linux", lines: [
        `You could install player2 (currently ${linux.version}) on top of standard Raspberry OS or Debian/Ubuntu OS for other platforms yourselves.`,
        "",
        `- [Instructions on how to install](${linux.href})`
    ] },
    resources: { keys: "openSourceServer, selfHostedServer, webApp", lines: [
        `- To manage players using your own local server, use [piSignage open-source server code](${openSourceServer.href})` +
            ` (version ${openSourceServer.version}, also on [Docker Hub](${openSourceServer.dockerHref}))`,
        `- For the self-hosted piSignage server (version ${selfHostedServer.version}), contact [sales](${selfHostedServer.href})`,
        `- To experience piSignage player in the browser, load the [web app](${webApp.href})`
    ] },
    android: { keys: "androidPlayStore, amazonSignageStick, androidApk", lines: [
        `Android app for piSignage is available at [Google Play Store](${androidPlayStore.href})` +
            ` and on [Amazon Signage Stick](${amazonSignageStick.href})` +
            ` ([setup instructions](${amazonSignageStick.setupHref}))`,
        "",
        "Now piSignage player is also available in custom apk format with support for future OTA updates," +
            ` you can download the same here: [${androidApk.version}](${androidApk.href})`
    ] }
};

let readme = fs.readFileSync(README, "utf8");
for (const [name, { keys, lines }] of Object.entries(sections)) {
    // Find the markers by name, so older wording inside the start comment is replaced too
    const start = readme.indexOf(`<!-- ${name}:start`);
    const startEnd = readme.indexOf("-->", start) + "-->".length;
    const END = `<!-- ${name}:end -->`;
    const end = readme.indexOf(END, startEnd);
    if (start === -1 || end === -1) {
        console.warn(`Skipping ${name}: README.md has no <!-- ${name}:start --> and ${END} markers`);
        continue;
    }
    const START = `<!-- ${name}:start - generated, do not edit here. Update ${keys} in images.json, then run: npm run update-readme -->`;
    readme = readme.slice(0, start) + [START, "", ...lines, "", END].join("\n") + readme.slice(end + END.length);
    console.log(`README.md ${name} section updated from images.json (${keys})`);
}
fs.writeFileSync(README, readme);
