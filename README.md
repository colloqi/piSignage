# piSignage

piSignage is a digital signage platform for Raspberry Pi and other screens. You upload media, build
playlists and schedules on a server, and players connected to TVs and monitors play them. Players
download their content and keep playing it through network outages.

- **Player2** is the player software. It runs on every Raspberry Pi model (each needs the right image, see
  [below](#getting-the-player-ready)), on other Linux hardware such as an Intel NUC running Debian or Ubuntu,
  on Android and Amazon Signage Stick, and in a web browser.
- **Server**: you manage players from the cloud at [pisignage.com](https://pisignage.com), from a self-hosted
  piSignage server, from the open-source server, or one at a time from the player's own web UI
  (`http://player-ip:8000`). See [Ways to manage players](#ways-to-manage-players).

A player connects to the screen over HDMI (or DSI/DisplayPort) and needs a network connection to reach
pisignage.com or your own server.

## New: piSignage 5.6.3

Player2 5.6.3 and Server 5.6.3 are out:
- **Raspberry Pi and Linux:** update existing players from the server. New installs start from the
  [5.6.1 images](#latest-images-561-based-on-raspberry-pi-os-trixie) and update from the server afterwards
- **Android and Amazon Signage Stick:** the apps remain on 5.6.1

**Player2 5.6.3** is a fix release:
- **Replaced files show up without a redeploy.** A PDF, PowerPoint or image replaced by a new file with the
  same name, in a synced or local folder, now shows the new version the next time it plays.
- **PDFs** turn pages at the right times after a zone change, and use less memory.

It includes **Player2 5.6.2**:
- **Slide countdown.** A playlist can show how long the current slide stays up, for example "Next in 0:09".
- **Blend is a true cross-dissolve**, and all transitions take 0.5 s instead of 1 s.
- **Fixes** for the RSS ticker item duration, license download on some self-hosted servers, and keyboards
  plugged in after the player starts.

**Server 5.6.3** includes:
- Software updates are sent only to players that can install them, and the server shows the reason when
  an update is not sent
- A group setting that makes players ignore touch and click input on the screen
- An account setting that plays playlists and groups with the same label as a player or its group
- A player's additional playlists and groups no longer affect the other players of its group on deploy
- From 5.6.2: resolution, orientation and other display settings for a single player, and settings for
  several groups at once

> **Before you upgrade:**
> - Player2 releases after 5.5.4 need a player running Node 20. A player on the older Node 14 build is not
>   updated and stays on its current release.
> - A Player2 older than 5.4.0 on an OS before Debian 12 (Bookworm) is first updated to 5.5.4. Update it
>   again afterwards to reach 5.6.3.
> - All transitions now take 0.5 s, and there is no setting to restore 1 s.
> - Players updating from a version before 5.6.0 also run the 5.6.0 upgrade steps, including a full OS
>   upgrade on Raspberry Pi.
>
> See the [Player2 release notes](<RELEASE NOTES - Player 5.x.x.md>) and the
> [Server release notes](<RELEASE NOTES - Server.md>) for details.

## Contents

- [New: piSignage 5.6.3](#new-pisignage-563)
- [Managing screens in four steps](#managing-screens-in-four-steps)
- [Features](#features)
- [Ways to manage players](#ways-to-manage-players)
- [Getting the player ready](#getting-the-player-ready)
- [Android, Amazon Signage Stick and web players](#android-amazon-signage-stick-and-web-players)
- [Quick reference](#quick-reference)
- [Release notes](#release-notes)
- [In this repository](#in-this-repository)
- [Support](#support)

## Managing screens in four steps

1. **Add assets.** Upload images, videos, audio and PDFs. Add web links, live streams and YouTube videos.
   You can also upload HTML zips, connect cloud folders and documents, or pick apps from the App Store.
2. **Build playlists.** Pick a built-in layout, or design your own in the template designer. Arrange the
   assets and set how long each one plays. You can add a ticker, and playlists for ads, domination
   content, lounge music or events.
3. **Group your players.** Put players that show the same content in a group. Give the group its playlists
   and schedules, its display settings and its TV on/off times, then deploy with one click.
4. **Monitor.** Check from the dashboard that each player is online and see a recent screenshot of its
   screen. You can also get play reports, update player software and run piShell commands to debug.

## Features

**Content**
- Images (including WebP and AVIF), video, audio, PDF, web pages and dashboards, live streams and radio,
  YouTube, and HTML zip packages
- Microsoft 365 and Google accounts, connected once and used everywhere:
  - Outlook and Google calendars, and meeting-room screens
  - Word, PowerPoint, Excel, Google Slides and Google Sheets documents
  - OneDrive and Google Drive folders that sync into the asset library
- Power BI reports and an App Store of ready-made apps, such as YouTube Live
- Asset validity dates, so content plays only between a start and an end date

**Playback and scheduling**
- Multi-zone layouts with a main zone, side and bottom zones, a ticker, and custom layouts
- Daily, weekly and week-of-month schedules, for example "the 3rd Thursday" or "the last Friday"
- Synchronized playback, so players in a group show the same asset at the same moment
- Playlists for ads, domination content, lounge music and events, plus key or GPIO triggered playlists
- Kiosk mode with touch support: a web page is shown when someone touches the screen, and normal playlists
  play the rest of the time

**Screens and devices**
- TV ON/OFF schedules over HDMI-CEC, with DDC/CI standby for monitors that don't support CEC
- Portrait and inverted orientation, dual displays and tile mode
- Clock, logo, QR code, emergency message and ticker overlays
- USB import, which loads a group's exported content from a USB stick for players without a network
- Network setup on the player (`Ctrl+N`), and a fallback Wi-Fi hotspot for first-time setup

**Management**
- Groups, deploys, a dashboard with screenshots, play reports and remote software updates
- Collaborators with per-group rights, and SAML single sign-on
- Bulk tools such as player autoconfiguration

Some features need a recent server and player. For example, synchronized playback, cloud folders and
week-of-month scheduling need server and Player2 5.6.0 or later. Android and web players ignore
week-of-month and play on every matching weekday. The [release notes](#release-notes) say what each
version needs.

Visit [pisignage.com](https://www.pisignage.com) for more about features and plans.

## Ways to manage players

| Option | What it is |
|--------|------------|
| [pisignage.com](https://pisignage.com) | Managed cloud service. Register a player with its player ID and manage it from anywhere. |
| Self-hosted piSignage server | The 5.x piSignage server, run on your own infrastructure under a licence. Contact [sales](mailto:sales@pisignage.com). |
| [Open-source server](https://github.com/colloqi/pisignage-server) | The legacy 3.x server, free to run on your own network, also on [Docker Hub](https://hub.docker.com/r/pisignage/pisignage-server). Newer features such as synchronized playback, Microsoft 365 and Google integrations and week-of-month scheduling are not available. |
| Player web UI | `http://player-ip:8000` on any player, to manage that one player on its own. |

## Getting the player ready

> **Note:** By downloading and using piSignage Player software, you agree to our [Terms of Service](https://s3.amazonaws.com/pisignage/legal/piSignage-TOS.html).

There are two ways to get the piSignage player software.

### Method 1: Download an image and program the SD card

Use an SD card of at least 16 GB, class 10 or above.
[Watch a video on how to set up a Raspberry Pi as a piSignage player](https://youtu.be/Ky7uGwc7pdY?si=dUUF4UMV3r1Uj0PW).

#### 1. Download the player image for your Raspberry Pi

| Raspberry Pi model | Image to use |
|--------------------|--------------|
| Pi 4, Pi 5 and their variants | Latest 64-bit image |
| Pi 3, Pi 3B+, Pi Zero 2 W | Latest 32-bit image |
| Pi Zero, Zero W, Pi 1, Pi 2 | 5.3.2 32-bit (armv6) image, or the 3.2.9-armv6 legacy image |

##### Latest images: 5.6.1, based on Raspberry Pi OS Trixie

**New:** 5.6.3 is installed by updating from the server; see [what's in 5.6.3](#new-pisignage-563).

- [Version 5.6.1 (64-bit)](https://pisignage.s3.us-east-1.amazonaws.com/pisignage-images/pisignage_5.6.1.img.zip)
  for Pi 4, Pi 5 and their variants, based on Raspberry Pi OS Trixie (released 6 October 2026)
- [Version 5.6.1 (32-bit)](https://pisignage.s3.us-east-1.amazonaws.com/pisignage-images/pisignage_5.6.1_32bit.img.zip)
  for Pi 3, Pi 3B+ and Pi Zero 2 W, based on Raspberry Pi OS Trixie (released 6 October 2026)

##### Images based on older Raspberry Pi OS versions

- [Version 5.4.3 (64-bit)](https://pisignage.s3.us-east-1.amazonaws.com/pisignage-images/pisignage_5.4.3.img.zip)
  for Pi 4, Pi 5 and their variants, based on Raspberry Pi OS Trixie (December 2025)
  | [Gdrive link](https://drive.google.com/file/d/10kGYxHO2NgbZeuK1EyHPxBo9YInY-2uW/view?usp=sharing)
- [Version 5.4.3 (32-bit)](https://pisignage.s3.us-east-1.amazonaws.com/pisignage-images/pisignage_5.4.3_32bit.img.zip)
  for Pi 3, Pi 3B+ and Pi Zero 2 W, based on Raspberry Pi OS Trixie (December 2025)
  | [Gdrive link](https://drive.google.com/file/d/1m2wcdo-FLZklOi2A81OHL98qZ5x3lul2/view?usp=sharing)
- [Version 5.3.2 (64-bit)](https://pisignage.s3.us-east-1.amazonaws.com/pisignage-images/pisignage_5.3.2-64bit.img.zip)
  for all Raspberry Pi models except Pi Zero, Zero W, Pi 1 and Pi 2, based on Raspberry Pi OS Bookworm (November 2024)
  | [Gdrive link](https://drive.google.com/file/d/1gLutfgVIsxL12GpznRhX3q_aQQAOCNqf/view?usp=drive_link)
- [Version 5.3.2 (32-bit, armv6)](https://pisignage.s3.us-east-1.amazonaws.com/pisignage-images/pisignage_5.3.2_32bit_nodearmv6.img.zip)
  for Pi Zero, Zero W, Pi 1 and Pi 2, based on Raspberry Pi OS Bookworm (November 2024) with armv6 Node.js
  | [Gdrive link](https://drive.google.com/file/d/1kQnsmYkRcxLZtfF-ipfRjLW0KHk-kQhR/view?usp=drive_link)

##### Legacy images: 3.2.9, based on 32-bit Raspberry Pi OS Legacy (Buster)

These use the proprietary omxplayer for video and still perform very well on Pi 4 (1 GB) and Pi 3.

- [Version 3.2.9](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_3.2.9.img.zip) for Pi 3 and Pi 4
  | [Gdrive link](https://drive.google.com/file/d/1LlM0DHkmS2YLwTkemZocCvcdxi0c8PTZ/view?usp=sharing)
- [Version 3.2.9-armv6](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_3.2.9-armv6.img.zip)
  for Pi Zero, Zero W, Pi 1 and Pi 2

*Let us know at support@pisignage.com if you need help with imaging or another version.*

#### 2. Program the downloaded image to the SD card

> Copying the file onto the SD card will not work. Use an imaging tool.

Use one of these tools:
- [Raspberry Pi Imager](https://www.raspberrypi.com/software/). Choose the custom OS option and **leave all
  OS customisations off** (SSH, Wi-Fi, autologin and so on). piSignage configures these itself.
- [balena Etcher](https://www.balena.io/etcher/)

#### 3. Insert the SD card into the Raspberry Pi and power it on

The player shows its player ID on screen. To set up Wi-Fi or a static IP address, or to point the player at
your own server, plug in a USB keyboard and press `Ctrl+N` (or `F6`).

#### 4. Register the player

Register the player with its player ID at [pisignage.com](https://pisignage.com/players) to manage it from
the cloud, or register it on your own server.

#### 5. Need help?

Contact us at support@pisignage.com.

### Method 2: Install on Raspberry Pi OS, Debian or Ubuntu

You can install Player2 yourself on standard Raspberry Pi OS, or on Debian or Ubuntu for other hardware.
Follow the [installation instructions](https://pisignage.com/releases/Player2_installation_procedure.html).

## Android, Amazon Signage Stick and web players

- **Android:** the piSignage app, now on 5.6.1, is on the [Google Play Store](https://play.google.com/store/apps/details?id=com.pisignage.player2&hl=en&gl=US).
  The player is also available as a [custom APK (5.5.3)](https://drive.google.com/file/d/1SgxgvJJ31gPjJzPbcdBATz_FjjQr-_tO/view?usp=drive_link)
  that supports future over-the-air updates.
- **Amazon Signage Stick:** piSignage 5.6.1 is available on the [Amazon Signage Stick](https://signage.amazon.com/cms-partners/pisignage)
  ([setup instructions](https://signage.amazon.com/support/getting-started)).
- **Web app:** the [web app](https://pisignage.com/player2/) runs the player in any modern browser. It is
  useful for trying piSignage out, or for screens that already have a browser.

## Quick reference

| Item | Value |
|------|-------|
| Default username / password | `pi` / `pi` (also the player web UI login) |
| Player web UI | `http://player-ip:8000` |
| Fallback Wi-Fi hotspot SSID | `piplayer_xxxx` (the exact name is shown on the player's screen) |
| Hotspot password | `piplayer` |
| Network and server settings | `Ctrl+N` or `F6` on a USB keyboard |
| Terminal | `Ctrl+Alt+T` |

## Release notes

- [Server](<RELEASE NOTES - Server.md>): the current 5.x server (pisignage.com and self-hosted) and the
  legacy 3.x server
- [Player2 4.x and 5.x](<RELEASE NOTES - Player 5.x.x.md>): current player for Bookworm and Trixie images,
  Linux, Android and web
- [Player 3.x and earlier](<RELEASE NOTES - Player 3.x.x.md>): legacy player for Buster images

Read the upgrade notes before updating a large fleet. Some releases upgrade the OS or change how content
looks on screen.

## In this repository

| Path | Contents |
|------|----------|
| [`examples/`](examples) | Sample HTML assets and custom layouts: clocks, weather, RSS, tickers, menus, countdown timers and more |
| [GPIO media control Instructions.md](<GPIO media control Instructions.md>) | Wiring push buttons to GPIO pins to control playback and playlists |
| [`translation-files/`](translation-files) | Translation template (`template.pot`) for the legacy piSignage web app UI |
| [`robotjs-keys/`](robotjs-keys) | RobotJS key syntax for sending keystrokes to web pages |
| [Privacy Policy piSignage Remote App.md](<Privacy Policy piSignage Remote App.md>) | Privacy policy of the piSignage Remote app |
| `pisignage_*.pdf` | Older installation and layout guides |

## Videos

Visit the [piSignage YouTube channel](https://www.youtube.com/channel/UCyeItfgq72JUtzkQgcxYkKg) for more
videos.

## Support

- Help center: [help.pisignage.com](https://help.pisignage.com/hc/en-us)
- Raise an issue on the [contact page](https://www.pisignage.com/homepage/contact.html) or email
  support@pisignage.com
