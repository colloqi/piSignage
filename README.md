# What is PiSignage?

PiSignage is a very popular Digital Signage Solution primarily used along with Raspberry Pi boards (but can also
work on other Linux based hardware platforms, for e.g. Intel NUC, see [here](https://pisignage.com/releases/Player2_installation_procedure.html)).
In addition, piSignage is also available on [Android devices](https://play.google.com/store/apps/details?id=com.pisignage.player2&hl=en&gl=US) and as a [web app](https://pisignage.com/player2/).

All Raspberry Pi models are supported (please use specific image for the various models as mentioned [below](#getting-the-player-ready)).

Raspberry Pi connects to TV through HDMI interface and needs network connectivity to reach pisignage.com or any
other piSignage server locally configured.

PiSignage players can be managed centrally using managed services at [pisignage.com](https://pisignage.com) or using a
separate server using [open sourced server software](https://github.com/colloqi/pisignage-server) or independently using player webUI (http://player-ip:8000).

### Managing Screens is just a few steps

1. **Upload images/videos**, provide web or streaming links, design and upload HTML assets as a zip file.
2. **Create playlists** by selecting one of the built-in layouts or custom layouts created using the template designer,
   add assets (drag and rearrange for the desired order), enter duration of play for each asset. You can also add a ticker feed and
   define special playlists for adverts insertion, domination content, lounge music and content play based on events.
3. **Create Groups and assign players** to a group which needs to play the same playlists. Then you can assign and schedule multiple
   playlists to a group. You can also define display settings, schedule TV on/off and other properties of the group.
   Whenever ready, deploy playlists at the click of a button to all the players in the group.
4. You can **centrally monitor the players** in the dashboard/player screens, view current snapshot of TV, get reports, update software
   and also issue debug piShell commands.

### More functions and utilities

1. You can play/pause playlists, play individual assets from both player and server UIs.
2. Players can operate in kiosk mode pointing to the URL provided and play normal playlists when no key is pressed.
3. Autoconfiguration of players and many such features for bulk management of players.

Please visit [pisignage.com](https://www.pisignage.com) to know more about features and benefits.

## Getting the Player ready

> **Note:** By downloading and using piSignage Player software, you agree to our [Terms of Service](https://s3.amazonaws.com/pisignage/legal/piSignage-TOS.html).

There are 2 ways you can get the piSignage Player Software:

### Method 1: Download image and prepare the SD card (minimum 16GB, class 10 or above)

[Watch a video on how to setup the Raspberry Pi as piSignage player](https://youtu.be/Ky7uGwc7pdY?si=dUUF4UMV3r1Uj0PW)

#### i. Download the complete player ISO image

##### Trixie OS based 5.4.1 image (NEW)

For all models of Pi including Pi 3B, Pi 02 W (except Pi 0, Pi 0W, Pi 1, Pi 2):

- [Version 5.4.1](https://pisignage.s3.us-east-1.amazonaws.com/pisignage-images/pisignage_5.4.1.img.zip) based on 64bit Raspberry OS released on Dec 2025
  | [Gdrive link](https://drive.google.com/file/d/1VAuXFeRpv__8Z3nRUYlWOtcNEdz9r8Kg/view?usp=sharing)

##### Other images based on older Raspberry OS versions

- [Version 5.3.2](https://pisignage.s3.us-east-1.amazonaws.com/pisignage-images/pisignage_5.3.2-64bit.img.zip)
  (For all Raspberry Pi models except Pi Zero, 0W, Pi 1, Pi 2, based on 64bit Raspberry OS released on Nov 2024)
  | [Gdrive link](https://drive.google.com/file/d/1gLutfgVIsxL12GpznRhX3q_aQQAOCNqf/view?usp=drive_link)
- [Version 5.3.2](https://pisignage.s3.us-east-1.amazonaws.com/pisignage-images/pisignage_5.3.2_32bit_nodearmv6.img.zip)
  (For Raspberry Pi Zero, 0W, 1, 2, based on 32bit Raspberry OS released on Nov 2024 with armv6-nodejs)
  | [Gdrive link](https://drive.google.com/file/d/1kQnsmYkRcxLZtfF-ipfRjLW0KHk-kQhR/view?usp=drive_link)

##### Based on 32bit Raspberry Legacy OS(X) released on Dec 2023, uses proprietary omxplayer to display video, still star performer for Pi4/1GB, PI3!
- [3.2.9 based on Raspberry Buster OS](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_3.2.9.img.zip)
  | [Gdrive link](https://drive.google.com/file/d/1LlM0DHkmS2YLwTkemZocCvcdxi0c8PTZ/view?usp=sharing)
- [3.2.9-armv6 image for Pi 0/0W/1/2](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_3.2.9-armv6.img.zip)

*Let us know if you are looking for imaging help or other versions*(support at pisignage.com)

#### ii. Program the downloaded image to a SD card

> *Simple copy-paste of the file into the SD card will not work!*

Use an application such as:
- [Raspberry Pi Imager](https://www.raspberrypi.com/software/) — use custom option for OS and *do not use additional customizations like ssh, wifi, autologin etc., it will be configured by piSignage*
- [balena Etcher](https://www.balena.io/etcher/)

#### iii. Insert the programmed SD card into the Raspberry Pi and power ON

#### iv. Register your player with player id at [pisignage.com](https://pisignage.com/players) to manage from the cloud

#### v. Get in touch with us at support at pisignage.com for any assistance

### Method 2: Manual installation on top of Raspbian OS/Debian/Ubuntu variants

You could install player2 on top of standard Raspberry OS or Debian/Ubuntu OS for other platforms yourselves.

- [Instructions on how to install](https://pisignage.com/releases/Player2_installation_procedure.html)

## More Resources

- To manage players using your own local server, use [piSignage open-source server code](https://github.com/colloqi/pisignage-server)
- To experience piSignage player in the browser, load the [web app](https://pisignage.com/player2/)

## Android App

We encourage you to download the Android app for piSignage from [Google Play Store](https://play.google.com/store/apps/details?id=com.pisignage.player2&hl=en&gl=US).

If you need the APK directly, you can download it from here: [4.9.4.5](https://drive.google.com/drive/folders/1aF-n778l_FQC1w6KmGdNIFhENV5dWKMk?usp=sharing)

## Videos

Visit our [piSignage YouTube channel](https://www.youtube.com/channel/UCyeItfgq72JUtzkQgcxYkKg) for more videos.

## Quick Reference

| Item | Value |
|------|-------|
| Default Username | `pi` |
| Default Password | `pi` |
| Player webUI | `http://player-ip:8000` |
| AP SSID | `piplayer-xxxx` (last 4 digits of player ID) |
| AP Password | `piplayer` |
| Network/Server config | `Ctrl+N` or `F6` (USB keyboard) |
| Terminal | `Ctrl+Alt+T` or `F2` |

## Support

Refer to the [piSignage support page](https://help.pisignage.com/hc/en-us).

Raise your [issues here](https://www.pisignage.com/homepage/contact.html) or write to us at support@pisignage.com.
