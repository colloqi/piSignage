# Release Notes for piSignage Player2 (4.x.x and 5.x.x)

This document covers Player2 — the rewritten player line that started at version 4.6.0. It spans the 4.x.x series and the current 5.x.x series.

For the original (legacy) player notes, see [RELEASE NOTES - Player 3.x.x.md](<RELEASE NOTES - Player 3.x.x.md>).
For server-side notes, see [RELEASE NOTES - Server.md](<RELEASE NOTES - Server.md>).

---

## Player2 (version 4.x.x onwards)  

### 5.6.0

A feature release on top of 5.5.4 that includes everything from the 5.5.5 to 5.5.8 builds. Players can keep
their playlists in step with each other, mirror a OneDrive or Google Drive folder, load a group from a USB
stick again and follow week-of-month schedules (such as the 3rd Thursday). Bookworm/Trixie players draw the
clock, logo, QR code, emergency message and hardware ticker natively, sized for the display. Video is more
reliable on Pi Zero 2 W, Pi 3 and Pi 4, and **the Pi 4 video freeze listed as a known issue in 5.5.4 is fixed**.
**Raspberry Pi players run a full OS upgrade during this update** — see the upgrade notes, including the
changes you will see on screen.

#### New features

1. **Synchronized playback** — With the new *Sync playback* group setting on, the main zone of a regular playlist follows the wall clock instead of simply playing the next item, so players with network-synced (NTP) clocks show the same asset at the same time without talking to each other or to the server. A player that boots, changes playlist or returns from an advert joins mid-slot and seeks into the running video (VLC and Chromium; the new media player starts the video from the beginning). Shuffle still works: all players use the same shuffled order, which changes every cycle. Players stay within about 0.3–1 s of each other; frame-accurate video walls are not the goal of this mode. Sync is skipped (with one log line) while the clock is not NTP-synchronized, when *time to stop video* is set, or when the playlist has an MRSS or cloud-folder row; video merging and looping are off while sync is on.
2. **Cloud folders (OneDrive and Google Drive) mirrored on the player** — A cloud-folder asset can be mirrored into the player's media directory and checked for changes about every 15 minutes, so a file dropped into the folder appears on screen without a deploy. The local copy keeps playing when the player is offline, the server is down or access to the folder is lost; files are deleted only when the folder listing was fetched successfully and no longer contains them. Renamed files are renamed on the player instead of downloaded again, videos play their full length, multi-page PDFs (including converted Google Docs and Office files) turn pages at the folder's duration, and a saved play order is honoured. Downloads stop with a logged event when less than 500 MB of disk would remain.
3. **USB import** — Load a group's content from a server *Export to USB* stick: insert the stick (or boot with it inserted) and the player copies the media, licences and settings, reboots and plays the exported group. Inserting the same stick again does nothing, the boot disk is never treated as an import stick, and a player imported offline does not download the same content again when it later connects. Requires an export made by an updated server.
4. **Week-of-month scheduling** — A playlist's schedule can list which occurrence of its weekday it plays on: 1st to 5th, or last — for example "the 3rd Thursday" or "the last Friday" of every month. "Last" is worked out for each month, including leap years. Schedules without it play every week, as before.
5. **Native widgets on Bookworm/Trixie (labwc)** — When hardware widgets are enabled, the clock, logo, QR code, emergency message and hardware ticker are drawn as overlay surfaces instead of feh/pqiv windows and the SDL ticker. They stay above fullscreen video, Chromium, PDFs and the new media player without window rules, tile mode gets one set per display, and the helper restarts itself if it exits. Each widget is sized for a 1080p screen and scaled to the actual display; a long emergency message is shrunk and wrapped instead of cut off; the ticker band spans the full width behind the clock (capped at 30 fps on Pi 0–3). X11 players keep the previous widgets.

#### Improvements

1. **Pi 4 video freeze fixed** — The OS upgrade installs the Raspberry Pi Chromium build that fixes the Pi 4 hardware video decoder hang that froze playlists with video in Chromium, or a web widget next to a video. [Background](https://help.pisignage.com/hc/en-us/articles/62126211028249-Raspberry-Pi-4-video-freezes-after-upgrading-to-5-5-x-Chromium-151-152-hardware-decode).
2. **Smoother browser ticker, sized for the display** — The scrolling ticker is animated by the browser's compositor at a fixed speed, so it no longer slows down on a 30 Hz 4K output or while a video zone changes, and an identical ticker push no longer restarts the scroll. Its height, font and speed are 1080p values scaled to the display; a bottom clock grows to the ticker's height, and video windows end exactly at the top of the band.
3. **Ticker stays visible over fullscreen VLC video on labwc** — Fullscreen VLC video fills the screen above the ticker band instead of covering it.
4. **"Keep aspect ratio" off now stretches VLC video** to fill its zone (on Pi Zero 2 W, and some files on Pi 4, VLC keeps small bars).
5. **DSI and DisplayPort displays** — On labwc, displays other than HDMI (a DSI touch panel on a Pi 5, DP/eDP on other boards) are detected and configured, and a panel that is portrait by nature is rotated relative to its own orientation.
6. **Mouse pointer stays hidden on labwc** after a display hotplug, a TV OFF/ON or a resolution change.

#### Fixes

###### Security

1. **Weblink and kiosk URLs on labwc** — A specially built weblink or kiosk URL could make the player run a shell command when it focused or hid that window. Window commands now run without a shell. Update players that take playlists or group settings from more than one administrator.

###### Video and images

1. **Pi 4: VLC video scaled to the screen again** — 5.5.4 drew every VLC video on Pi 4 at its native size (a 1080p clip showed only its top-left corner on a smaller screen). The workaround is now applied only to the files that need it.
2. **Pi Zero / Pi 3: no VLC crash on some H.264 files** that the Raspberry Pi VLC build reports as interlaced; they now play with hardware decoding.
3. **Pi Zero 2 W: VLC video visible** — VLC video was black on a Zero 2 W desktop; VLC now uses a drawing method that works on this board, with fewer decoder buffers.
4. **Pi 3: VLC video no longer black with widgets and kiosk** — fewer decoder buffers on Pi Zero and Pi 3, and the kiosk browser is started only when needed (see Kiosk).
5. **Pi Zero 2 W: images visible** — Images could stay black when graphics memory ran out; the player now runs the X server without GPU acceleration on Zero-class boards.
6. **Re-uploaded image with the same name shows the new copy** — Before, an image replaced under the same file name downloaded correctly but the old picture stayed on screen until a reboot.
7. **Image slot no longer freezes the playlist** — If the image viewer exited early the playlist could stay on that image for good; the zone now shows black for the rest of the slot and moves on.
8. **Radio row in the main zone plays for its row duration** — Before, a live stream played for 5 minutes and the main zone could stay blank that whole time.
9. **New media player recovers from a stuck video decoder** — If a kernel video-decoder fault left the media player process impossible to stop, the zone stayed frozen until someone rebooted the player. The player now reboots itself in that case.

###### Pi Zero and Pi 3 player selection

1. **Portrait on Pi Zero / Pi 3** — The new media player's console (KMS) mode cannot rotate, so a portrait Zero lost its rotation in 5.5.4. Pi 0–3 players set to portrait now stay on the desktop, where the screen is rotated. Lite images without a desktop keep KMS and play landscape.
2. **Explicit `cvlc` honoured on Pi Zero 2 W** — `chrome` and `default` still map to the new media player, but an explicit VLC selection is now kept and returns the board to a desktop boot.
3. **Screen goes black on TV OFF in console mode** — Players running the new media player without a desktop left the last video frame on screen during TV OFF when the TV ignored the CEC standby; the zones are now blanked.

###### Kiosk

1. **Touch swipes scroll on Raspberry Pi touch panels** — Raspberry Pi OS turns touches into mouse events, so a swipe selected text instead of scrolling. While the kiosk is on, the player switches this off for the panel, and back on when the kiosk is turned off.
2. **On-screen keyboard only with a touchscreen** — Players driven by a mouse or a remote no longer get a keyboard over the page.
3. **Pi Zero / Pi 3: kiosk browser started on demand** — The kiosk browser no longer runs in the background behind the playlist; the first tap, click or `/api/kioskui/show` call starts it, and it is closed after the inactivity timeout. Pi 4, Pi 5 and other boards are unchanged.
4. **Kiosk opens on the main screen of a two-display player** instead of whichever display had the hidden mouse pointer.

###### Weblinks

1. **Weblinks with JSON headers** — Weblink headers can be given as a JSON object, for example `{ "Origin": "...", "User-Agent": "..." }`. Before, JSON headers stopped the weblink from opening. Invalid header names are dropped and logged, and headers removed from a weblink are cleared on a reused page.
2. **Kiosk and weblink URLs containing `&`** no longer break the zone positions of every zone.
3. **Duplicated labwc window rules** — Raspberry Pi's `autotouch` tool reformatted the player's labwc rules at every login on single-display players with a touch device, so stale copies piled up. `autotouch` is now disabled for the player's session and the rule file is repaired at startup; rules you added yourself are kept.

###### Downloads and network

1. **Same deploy downloaded again and again** — A player whose clock disagreed with the server's could re-download the same deploy on every config push. The player now remembers which deploy it fetched, across reboots.
2. **Downloads held up by robots.txt** — A server reached by IP address could hold every download for up to about an hour; the sync no longer requests `robots.txt`.
3. **Provisioning hotspot on Trixie (Pi 3, Zero W, Zero 2 W)** — The fallback WIFI_AP hotspot failed to start on these radios ("key setting validation failed"). It is now created with Protected Management Frames disabled, and existing hotspot profiles are patched during the upgrade.

###### Install and upgrade

1. **Upgrades from old versions run every upgrade step** — One failed step used to skip all the steps after it. Each step now runs on its own, which matters most for players upgrading from 5.3.x or 5.4.x.
2. **Self-hosted server address kept after an interrupted upgrade** — An upgrade that stopped partway could bring a self-hosted player back on pisignage.com. Protects upgrades from 5.6.0 onwards (see Known issues).
3. **Fresh installs set Chromium as the default browser** correctly.
4. **Quieter logs** — no repeated "pi-runner not found", `ERR_HTTP_HEADERS_SENT` or harmless upgrade-script errors.

###### Upgrade notes

1. **Raspberry Pi players run `apt full-upgrade`** during the upgrade from 5.5.4, then reboot as usual. This brings in Chromium `152.0.7977.82-1~deb13u1+rpt2` or newer on Trixie, which fixes the Pi 4 video freeze. The download is large and the upgrade takes noticeably longer than usual; held packages are left alone. Intel/AMD, Radxa and ODROID players are not OS-upgraded.
2. **Pi 4 workaround removed automatically** — Once the fixed Chromium is installed, the software-decode drop-in from the Pi 4 help article (`/etc/chromium.d/zz-pisignage-video-decode`) is removed. A `gpu_mem` setting is left as it is. If you switched the group to VLC only as a workaround, you can switch it back.
3. **Changes you will see on screen after the upgrade:**
   - Radio rows at the default 10 s duration now play for 10 s, not 5 minutes. Set a duration on the row to play radio longer.
   - Ticker height and px `font-size`/`line-height` in the ticker's Optional CSS now mean their 1080p values and are scaled with the display (doubled on 4K, smaller below 1080p). At 1080p nothing changes.
   - At the default speed the browser ticker moves at 180 px/s on a 1080p screen (was 240), scaled with the display, so it scrolls more slowly on large screens.
   - Hardware widgets on labwc look different: drawn by the new helper, sized for the display, with a near-black ticker band.
   - VLC video ends at the top of the ticker band on labwc players, and videos with "keep aspect ratio" off are stretched to fill their zone.
   - On Pi Zero and Pi 3 the first kiosk tap takes several seconds (about 13 s on a Pi 3) while the browser starts.
   - No on-screen keyboard on players without a touchscreen.
4. **Server support** — Synchronized playback, cloud folders and week-of-month scheduling need server 5.6.0. Players that are not updated, and Android and web players, ignore week-of-month and play on every matching weekday.

###### Known issues

1. **An upgrade that stops partway** (seen once on a Pi Zero 2 W during the npm install step) skips the final upgrade step: the player misses the OS upgrade and Chromium fix, and a player on a self-hosted server comes back on pisignage.com. The upgrade to 5.6.0 still runs the previous version's upgrade script, so this can happen on this upgrade. Check upgraded players, especially Zeros and self-hosted ones. To recover, run `node ~/player2/pi-upgrade.mjs` on the player and reboot.

### 5.5.4

A fixes-only release on top of 5.5.3: dual-display tile mode shows both screens again on Bookworm/Trixie players,
Pi 3 and Zero 2 W boards play video again with the default player setting, zoomed weblinks stay in their zone,
TV wake problems can now be diagnosed from the player log, and dual-radio players no longer trigger
hardware-mismatch notices. No OS upgrade is performed.

#### Fixes

###### Dual displays (tile mode, Bookworm/Trixie)

1. **Both screens show content again** — On 5.5.3 a tiled dual-display player often lit only one screen: both browser windows ended up fullscreen on the same HDMI output, one on top of the other, and the other output stayed black. The compositor places a new window on the output under the (hidden) mouse pointer, and the fullscreen applied at that moment kept the window there. Each screen's window is now assigned to its output explicitly, so placement no longer depends on the pointer.
2. **Video in both zones with the VLC player** — With VLC selected and a video in the main and side (or bottom) zone, both VLC windows landed on the same output, overlapping. Each zone's VLC window now has its own placement rule, held for as long as the zone plays.

###### Video

1. **Black screen on Pi 3 / Zero 2 W with the `chrome` or `default` player setting** — Since 5.5.0 these boards route video and audio to VLC, but VLC was handed the browser URL instead of the file path, exited at once, and the playlist skipped through every video in seconds. Present in 5.5.0–5.5.3; 5.4.3 was not affected.
2. **Pi Zero 2 W: images render** — With any player selection other than `mpv`, image zones stayed blank on a Zero 2 W and a group setting push could knock the device out of the new media player mode. Low-memory boards now stay on the new media player regardless of the pushed player setting.
3. **Merged VLC playlists only merge videos of one resolution** — VLC's Wayland output loses its window when the frame size changes mid-playlist, leaving the zone black for the rest of the merged run. Consecutive videos are now merged only while they share a resolution. *(Already in 5.5.3 builds published from 17 Aug 2026.)*

###### Weblinks

1. **Zoomed weblinks positioned in their zone** — A weblink with a zoom factor played in a zone (or fullscreen) was placed and sized with the zoom-divided geometry, so a zoom-2 side-zone weblink appeared as a half-size window in the middle of the screen.
2. **Chromium translate bubble stays off** — Chromium 151 ignores the launch flag that disabled translation, so the "Translate this page?" bubble reappeared over weblinks in a language other than the player's locale. A managed Chromium policy now keeps it off for the kiosk, weblink and dashboard profiles alike. *(Already in 5.5.3 builds published from 17 Aug 2026; see the upgrade notes.)*

###### TV control (HDMI-CEC)

1. **The player log now says what the TV answered** — A TV OFF that the TV did not acknowledge used to log only "Error in CEC TV off command"; the line now carries the TV's response. At TV ON the wake command is checked for an acknowledgement, retried up to three times on a port with a configured display, and the result is logged either way. A vacant second HDMI port on a Pi 4/5 no longer produces the misleading "Unable to set the Display on /dev/cec1 as Active Source: f.f.f.f" warning on every TV ON.

###### Reporting

1. **Dual-radio players report both wifi MACs** — With an onboard radio plus a USB adapter the reported wifi MAC flipped between boots, which raised the server's hardware-mismatch notice on every flip. The second radio is now reported as `wifiMac2` and the server accepts either. Single-radio players are unchanged.

###### Upgrade notes

1. **Standard update** — The 5.5.3→5.5.4 upgrade replaces the player bundle only. No apt upgrade, no reboot-time OS changes.

###### Known issues

1. Raspberry Pi 4 - video freeze after the 5.5.x upgrade (Chromium 151/152) when multiple videos play 

- The dist-upgrade moves the OS to Chromium 152, whose reworked hardware decoder can hang the
  VideoCore on Pi 4 when several decoders are created and torn down (short looping clips, web
  zones that auto-play video). The screen freezes until a reboot. Raspberry Pi has reproduced it
  (trixie-feedback #101) and a Chromium fix is expected. [Workaround and details](https://help.pisignage.com/hc/en-us/articles/62126211028249-Raspberry-Pi-4-video-freezes-after-upgrading-to-5-5-x-Chromium-151-152-hardware-decode).
- Select VLC player under Group Settings as an immediate workaround 

### 5.5.3

This release does a full OS upgrade for bookworm and Trixie players, fixes Wifi issues of 5.4.3 and
introduces new video player in place of mpv for lower models of Pi.

#### New features

1. **WiFi auto-reconnect watchdog** — Replaced the ad-hoc reconnect dispatcher with a systemd watchdog timer. Fixes the 5.4.3 issue where a player stuck on the fallback AP never re-tried the configured network: correct AP-profile selection, automatic stuck-in-AP rescue, faster recovery when a fresh scan sees the SSID, and promotion of an already-broadcasting fallback AP when AP mode is requested.
2. **New Media Player for lower Pi models -Pi 02W/3 (experimental)** — Multi-zone playback on Raspberry Pi via the vendored GStreamer-based `pi-runner` engine, selected with the mpv player setting. The backend is resolved per board: KMS (DRM planes, whole player, no desktop session) on Pi 0–4 booted to console, wlr-layer-shell surfaces on Pi 4 and later under Wayland, and cvlc everywhere else. Includes a boot-target toggle that moves a Pi 0–3 desktop install to a console KMS boot and back, mixed layouts with runner zones on an overlay layer above the Chromium kiosk, audio through PipeWire, image and text rendering through the runner in KMS mode, a `gst-runner` supervisor with liveness watchdog and platform-wedge recovery, and play stats support. 64-bit and 32-bit boards are both covered, down to the Zero 2 W.
3. **Enrollment key for additional security during player reporting** — The server-issued enrollment key is now stored and shown on the player for device registration, and presented on HTTP downloads and on the websocket handshake.
4. **CEC on all HDMI ports** — TV on/off commands are sent to every connected HDMI port, with a dwell time enforced after TV off before displays are switched back on. TV on now refits the screen in place instead of rebooting. CEC commands use short timeouts, so a port without a CEC display (any PC monitor) can no longer stall TV ON by 20 s per adapter.
5. **File play stats for all zones** — Playback statistics are now reported for side/bottom/extra zones, not just the main zone.
6. **Cursor hiding on labwc/Wayland** — The mouse pointer is now hidden on Bookworm/Trixie labwc desktops.
7. **On-screen keyboard for kiosk mode** — squeekboard is shown for kiosk mode on touch screens, on fresh installs and on upgrading players.
8. **Weblink User-Agent** — The browser User-Agent can be set from the weblink's headers especially for dashboard viewing.

#### Fixes

###### Video and audio

1. **VLC player showing blank screen for certain videos** —  The player now selects VLC's gles2 video output on Pi 4 (Compute Module 4 included), which plays the same files with hardware decoding intact.
2. **VLC is pinned to its zone rectangle instead  of fullscreen** Earlier Video always played in fullscreen mode.
3. **Audio issues** - At startup the player now moves the default audio sink to HDMI. USB and Bluetooth speakers, deliberate jack setups (`AUDIO_OUTPUT=jack` in `~/.env`), already-correct HDMI defaults, Pi 5, and non-Pi boards are left untouched. Applies to Pi 3 and Pi 4; dual-HDMI players prefer HDMI0.
4. **Raspberry Pi 3** — Uses VLC for video and Evince for PDF (Chromium too heavy on 1GB devices).

###### Displays and TV control

1. **More reliable TV control**: TV ON/OFF via HDMI-CEC now works across all HDMI ports, turns the screen back on without rebooting the player, and no longer stalls when a monitor without CEC support is connected.
2. **Stable screen order on dual displays** — HDMI outputs are ordered by connector name, so HDMI-A-1 is always screen 0 and HDMI-A-2 screen 1. Chromium, Puppeteer weblinks, and cvlc all use the same monitor mapping.
3. **Partial display detection now heals itself** — Detection now retries the whole pass when it sees fewer screens than connected ports, and the resolution watch re-applies display settings after TV turned ON.
4. **A failed TV switch can no longer crash the player** — TV on/off errors from the scheduler or a server command are caught and logged instead of ending the node process.
5. **Dual display on Wayland** — Fixed tile crash for Portrait/Invert orientations; fixed stale memoization in the main/zone window-size selectors.

###### Browser and content

1. **Browser crash recovery is now self-healing** — Earlier screen used to turn blank after accumulated browser crashes.
2. **Chromium display issues** — Black pre-paint background applied to all Chromium launches (no white flash); weblink black screens caused by non-integer CDP window geometry; video not filling the screen (body now sized from the real viewport).
3. **Weblink windows resize to their zone** — Weblink windows are resized to the zone rectangle instead of only moved, fixing quarter-screen and clamped weblinks on displays whose mode changed after the window mapped.
4. **Tile-mode browser toolbar flash fixed** *(5.5.2)* — Tile-mode Chromium windows are fullscreened by the compositor at map time, so the browser toolbar no longer stays visible until the post-load fullscreen call.
5. **PDF pages no longer blank between pages** — Page rendering is double-buffered, removing the visible gap while the next page rasterizes.
6. **YouTube** — The YouTube iframe API is now loaded only when a YouTube asset actually plays (faster startup, no unnecessary network access).
7. **PDF / PWA** — PDF and YouTube playback fixes for the PWA player; pdf.js pinned back to v3.1.81 (CommonJS) for compatibility with older Android devices and browsers.
8. **Ticker** — Hidden during TV_OFF; guarded against configuration when no ticker zone exists.
9. **Adding custom flags for Chromium if needed** - Please refer https://help.pisignage.com/hc/en-us/articles/54869730944537-How-to-Add-Custom-Chromium-Flags-on-Raspberry-Pi-PiSignage

###### Device and platform

1. **Compute Modules are recognized as their real generation** — They now map to generations 3/4/5.
2. **Device ID collisions** — When MAC discovery fails, the fallback ID no longer collides across devices.
3. **License Download issue in https open source server players** — License download now preserves the HTTPS protocol.
4. **Downloads** — Zip extraction fixed for archives containing a single top-level folder; download failures in group-file sync are now logged with full error details.
5. **Content sync no longer disturbs playback** — The colorspace fix pass runs at idle CPU and I/O priority behind a per-directory verified cache, instead of re-probing and rewriting every video on each sync
6. **Colorspace-corrected videos no longer re-download on every sync**
7. **Deprecated timezone names now apply correctly**

###### Platform / OS

1. Build and install scripts aligned with Raspberry Pi OS 2026-06-18 (labwc 0.9.7).
2. Upgrade scripts included for in-place upgrades from earlier 5.x versions, split into an OS full-upgrade 
   stage and a post-boot config stage. Stage 1 is hardened against unattended-apt failures, stage 2 sets needed flags/executes scripts after reboot.
3. New media player install; the KMS CMA target is scaled by board RAM (a flat 256 MB starves 512 MB boards).
4. Remaining OS-level popups on Trixie (pprompt, USB autorun) are disabled, on fresh installs and on upgrading players.
5. gnome-keyring PAM profile is disabled instead of removing the package.

###### Upgrade notes

1. **MPV Selection** - Now use new media player instead of VLC, please change the Group media player setting to VLC if you need VLC.
2. **Dual-display players: check the main zone after upgrading.** Screen order is now pinned to connector names instead of whatever order each player happened to detect. On players where the old accidental order (or a Reverse monitors setting compensating for it) had put the main zone on HDMI-A-2, the main zone moves to HDMI-A-1 on the first restart after the upgrade. If the main zone should stay on the other monitor, flip **Reverse monitors** once in the server UI. Single-display players and X11 desktops are unaffected.

### 5.4.2/5.4.3   

1. Fixed - Issue of Wifi credentials with special characters not working in 5.4.1
2. Disable pi-player for now and map "mpv" to vlc with no-gap support
2. Upgrade pdf.js to 5.5.207(latest) and use that to show PDF slide show instead of evince player(which is based on X)
3. In lower models of Pi, HDMI interface was not detected after video -> image transition - Fixed
4. Screenshot support for GNOME-WAYLAND configuration of Debian/Ubuntu players
5. Added 32 bit Trixie support for lower models of Pi as 64 bit was running into resource issues

### 5.4.0/5.4.1

1. Bookworm OS upgrade to latest version for player images 5.1.2/5.2.0/5.3.2 and fixing broken updates
2. New 5.4.1 image based on Trixie (**needs SD card re-imaging**)
3. Playlist plays once instead of looping in certain cases - fixed
4. Crontab issues while group settings TV on/off selected - fixed
5. Audio
   - Fixed audio volume setting and default audio issues
   - Audio player for lounge music and audio assets changed to VLC from mpv
   - Issue of playing radio streams - fixed
6. Rewritten network-config using nmcli commands
   - Fixed network-config issues for static IP, DNS and wifi power management
   - Improved UI for Ctrl+N menu
   - Better reporting of network checks
   - Fallback AP behaviour when known wifi is not available to connect
   - Fixed unreliable wifi in some cases (wifi power management off)
7. Player2 scripts update
   - Fix issues while detecting Window Manager, Display Manager, Display Server
   - Wider support for Debian/Ubuntu versions
   - Hide panels to avoid white/black strips on top and bottom of the screen
   - Disable keyring popups
8. Weblinks fixes
   - Not getting closed in some cases after the duration - fixed
   - Page zoom issue - fixed
   - Added Translate flag to avoid Chromium popups
   - Support for adding custom Chromium flags - refer https://help.pisignage.com/hc/en-us/articles/54869730944537-How-to-Add-Custom-Chromium-Flags-on-Raspberry-Pi-PiSignage
9. YouTube play
   - Avoiding popups for allow camera by disabling portal services
   - Update yt-dlp for VLC YouTube support
   - Fixed known YouTube play issues
10. PDF play
    - Avoid crashes
    - Slide show support issues in Trixie - fixed
11. Performance improvements
    - State logic occupying too much memory in lower models - fixed
    - VLC flag issue fixes for different versions on Wayland
    - Non-play of certain videos - fix color-space issue after downloading videos
    - VLC play issues for Pi 3/Pi Zero 2W - fixed
    - Introduced a new GStreamer-based pi-player (when mpv is selected), still under beta
12. New image format support
    - Support for AVIF and WebP image formats
13. Licensing/download issues when the server name contains "/" at the end or installation name - fixed
14. Log flooding issues for RSS error and CEC mismatch - fixed
15. Send hardware info to the server


### 5.3.5
1. Fixed - After YouTube video playlist stops advancing
2. Fixed - Popups for translate and camera access sometimes appearing

### 5.3.4
1. Fixed - CEC not working after HDMI enable on TV on event, restarting the player to enable CEC upon TV on event

### 5.3.3
1. Fixed - certain case TV on/off not working

### 5.3.2
1. SD Card image supporting all models of Pi (*32 bit only for Pi 0,Pi 0 W,Pi 0,2W, 1,2*)
1. BETA - Introduce non-chromium linux players for Image, Text, Video and PDF players for Pi zero, Pi 1, Pi 2 models (32 bit Raspberry OS only)
1. Remove gap between PDF slides in presentation mode (evince player)
2. Fixed - RSS feed of few sites was not working
3. Fixed - Issue with Access point not working

Known issue

- While playing youtube video a camera allow popup may appear on the srreen. Issue following command on piShell/terminal &
reboot to avoid this(will be fixed in the next release)   
  `echo '--use-fake-device-for-media-stream' > /home/pi/.config/chromium-flags.conf` 
### 5.3.1
1. Fixed - 5.3.0 update causing screen not occupying full screen and toolbar being seen
2. Fixed - HDMI interface on/off issue present in 5.3.0 version
3. Ability to change boot log - copy splash.png to /boot folder
4. player-config.txt based configuration support on every boot (not just first boot)
5. Fixes for image generation

### 5.3.0
**Please note, this updates all bookworm OS based players(5.x.x platform version) to latest OS release dated Nov 2024 
and to a new Window Manager labwc, update may take 15-30 minutes**

1. New Window Manager labwc - supports widgets on front of the screen like ticker, logo, emergency message, clock etc.
2. Wayland windowing system support for Raspberry Pi 3 and Pi Zero models
2. Brings back support to kiosk, webpage link confined to zones and hardware widget support
3. Tile mode for 2 screens support is enabled for 5.x.x players
4. Autodetection of HDMI interfaces and reconfigures within 30 seconds
5. Support for SD card based configuration in player-config.txt file in the boot partition on every boot (not just 
   first boot)
6. Fixed - player update failing in some cases and player becoming unuseable
7. Fixed - Rare race condition causing repeated downloads
8. Fixed - cast icon showing up in videos

### 5.2.4
1. Update to latest OS release dated 28 Oct 2024
2. Remove labwc-prompt from autostart after upgrade

### 5.2.3
1. Fixed - Older version of bookworm players showing blank screen on poweron or stuck on pi logo 

### 5.2.2
1. Videos not playing when VLC is selected under group - Fixed
2. Applying OS updates

### 5.2.1
1. SD card image release support using Raspberry OS Debian 12 (bookworm) dated 4 July 2024
2. Supports both 64bit OS and 32bit OS with support for Pi 5,4 and 3 models
3. Support for both wayfire and X11 window managers
4. This release supports 4 zone weblink,PIO and interactive feature support on legacy relases based on bullseye OS(4.
   9.x, 5.1.0-legacy) 

### 5.2.0
1. Added support for 64bit bookworm OS (needs a new SD card image of 5.2.0)
1. Weblink positioning in case of multi-zone playlist - fixed (use zoom factor of 1 only)
1. Player webUI - start the last playing playlist on poweron
1. Mirrored the second HDMI port in case of 2 displays connected
1. More robust display detection and resolution detection
1. Support for GPIO based playlist play and media control keys (fwd,prev,pause/play)
   - More details at [GPIO media control instructions](https://github.com/colloqi/piSignage/blob/master/GPIO%20media%20control%20Instructions.md)
1. Support added for the Interactive features to be introduced soon

### 5.1.5
1. piSignage using lower resolution when switched on when TV is OFF - fixed
   - Fixed resolution at 1080p when TV settings are not readable, for more details please refer to 
     [TV Resolution issues](https://help.pisignage.com/hc/en-us/articles/32635692383641-piSignage-screen-displays-at-a-lower-resolution-or-incorrect-resolution-on-TV)
### 5.1.4
1. Login screen/piSignage restarting issue in case of weblinks - fixed 
   - bookworm OS upgrade as per https://forums.raspberrypi.com/viewtopic.php?p=2211369#p2211361

### 5.1.3
1. In case of session crash auto-restart, not all previous pisignage related programs were getting closed - fixed
2. When emergency message is empty, small rectangle is shown on center of screen - fixed
3. Added chromium flags to avoid browser metrics collection

### 5.1.2
1. Login screen appearing after some time while displaying weblinks - fixed using workaround of autologin
2. Disable AP issues for image 5.0.5 - fixed
3. Unable to set DNS and Static IP from player webUI - fixed
4. Added "vc4.force_hotplug=1" to cmdline.txt to emulate HDMI always connected
5. Removed unnecessary gtk.css 
6. Startup logo changed to more subtle one
7. When default playlist is combined with a multi-zone playlist, other zones are copied from scheduled playlist 1 to 
   default playlist zone so that non-main zones start playing from the beginning

### 5.1.1
1. Uopdates Raspberry OS  - sudo apt update && sudo apt full-upgrade
   - Fixes login screen issue when monitor is siwtched off (https://github.com/raspberrypi/bookworm-feedback/issues/217) 

### 5.1.0
1. Fixed - Wifi needing second configuration after connecting to server
1. Bookworm (5.0.5) release - CEC functionalities improved and screen off support added
1. Bookworm (5.0.5) release - force browser widgets only  
1. Fixed - Player name change was not reflected in hostname of device
1. Unlimited Browser crash messages in log - fixed
1. Recent OS updates for both bookworm and legacy releases pushed to player
1. Other bug fixes

### 5.0.6
1. Ticker not working properly - fixed
2. Hardware widgets for clock, logo and emergency message disabled to avoid flickering while changing assets

### 5.0.5
1. Wifi AP not reflecting player ID - fixed
2. Welcome screen to update connection status and IP address periodically

### 5.0.4
1. Wifi AP name was not reflecting last 4 digits of player ID - fixed
2. Auto connect to wifi was not working on poweron - fixed

### 5.0.3
1. cursor was showing up in 5.0.1 image - fixed

### 5.0.2
1. Player continuous crash (and not starting) in case of video file being added using "Add asset to playlist" feature
   under assets tab and the playlist is played in non-main zone - Fixed

### 5.0.1
1. New image based on Raspberry Bookworm release to support Pi 5 and Pi 4
   - Bookworm OS/wayland architecture
   - Upgraded nodejs to v20 and npm packages to latest(security updates)
   - ES6 module support
   - Hardware ticker and widgets moved to wayland/wayfire from X/mutter window manager
   - Network Manager added instead of dhcpcd for network management
   - Browser based PDF reader instead of evince program
   - Moved TV control (CEC) program to cec-ctl from cec-client
   - See [known issues](https://help.pisignage.com/hc/en-us/articles/26593998005785)
2. Fixed - webpage link show getting stuck and slide show not progressing
3. Fixed - ticker message showing "null"
4. Fixed - certain crashes making display black 
5. Fixed - issue of download in progress message appearing when hide system messages option was selected

### 4.9.5
1. Fixed issue of ticker not scrolling

### 4.9.4
1. Imported fixes from Android app branch for the issues faced
   - Video play/stop issues
   - Use screen parameters instead of innerHeight and innerWidth for resolution in templates
   - Fixes for stop Video for adverts
2. Fixed rare issue of two players having the same ID
3. API for showing Emergency message in full screen for player
4. Change server command from server to facilitate server name change of player from server
5. Force TV ON disable was not working - fixed
6. Added app install logic for player2 for customer app installation
   - Write code and upload as pisignage-app.zip to assets folder
   - This gets copied to /home/pi/pisignage-app folder after unzip
   - Entry point is start-app.sh which is executed on every poweron 

### 4.9.3
1.Avoid download of the file to player when timestamp is not new and content length is same

### 4.9.2
1. fix for download error (MEDIA_SETTINGS_SLICE not defined)

### 4.9.1
1. Including .htm extension for html files

### 4.9.0
1. Make greater resolution of the 2 (HDMI-1, HDMI-2) connected TVs as promary display
2. YouTube play support when the default player is selected using YouTube API
3. Reading TV power status and sending ON/OFF command as needed - added
4. Reporting CEC TV status as well CEC support status to server - added
5. Support for play-once option for keyboard playlists
6. Audio getting restarted every cycle - fixed
7. Auto-detect https/http protocol for server when not specified
8. Kiosk mode -propagate mouse events from inside iframe
9. custom_layout issue fixes
10. Playlist name missing in player tab during TV_OFF - fixed
11. Added 5 week scheduling support
12. wifi:  support for space character in SSID
12. Update install script for more platforms and fixed non-starting of piSignage on power on in few platforms
13. OS and yt-dlp upgrades along with software upgrade
14. Fixed few crashes, scroll bar in few cases

### 4.8.2/4.8.3
1. Making https as default for pisignage server for wget download
2. Fixing the issue of wifi Access Point disable as selected from Group settings
3. Support for both horizontal and vertical flip
4. Flickering due to double playlist change being called on power-on
5. Black screen when asset does not exist instead of skipping - fixed 

### 4.8.1
1. Advertizement video playling issue - resolved
2. Issue with break video duration to play adverts in between - resolved
3. Domination playlist duration incorrect - issue resolved
4. RTSP transport defaults to UDP for mpv option
5. Gap between CEC command "as" after "on"

### 4.8.0
1. Updates the Raspberry OS with apt full-upgrade command(takes around 10 minutes)
2. Disable auto-fill in kiosk and other forms
3. Added temperature and uptime support
4. Support VLC for You-tube videos as well
5. Several bug fixes

### 4.7.5
1. Handling of more cases to get available resolution like disconnected displays, resolution not available from
   xrandr etc.
2. Fixed issues related to TV ON/TV OFF and monitor resolution change operations
3. Browser crash in  cases where resolution is not available from screen - fixed
4. Avoid continuos pings to websocket of crashed browser
5. Continuous mediaCompletionPromise errors in forever_err.log - fixed 
6. Scheduling issue when start and stop time span across days - fixed
7. Playlist not getting scheduled sometimes during player poweron and tv on - fixed
8. Modified piShell history (up-arrow button) to include new commands like xrandr
9. Added adavanced settings for player webUI
10. Set system volume using Pulse Audio utilities
11. Use System audio output and volume for all audio and video players  (mpv,vlc,chromium)
12. Reboot everyday feature not working - fixed 
13. VLC video play - 5sec file caching added to avoid gaps between videos

### 4.7.4
1. webpage link and kiosk launch issue with 4.7.3 - fixed
2. Player webUI, wifi access points were not detected - fixed
3. Always use VLC player for mkv extensions(H.265) irrespective of video player selection
4. Zone size corrections for mpv,vlc for portrait mode
5. Welcome screen, emergency message and clock sizes based on screen resolution

### 4.7.3
1. Scheduling issue when start and stop times cross midnight - fixed
2. White label support for ticker message in case of non-license added
3. mpv option not playing in Rsspberry Pi - fixed

### 4.7.2/4.7.1
1. Dual display support 
   - Use 2c/2d/2bp layout, side or bottom layout is mapped to the second screen 
   - Use 4K for single screen mode to play 4K videos
   - Use mirror in case of 2 displays and need to duplicate the content
2. Video play a long gap - fixed
3. screenshot not working in Intel platforms - fixed
4. Side zone weblink not killed in some cases - fixed
5. Added resolution change watch to take care of TV resolution change after poweron

### 4.7.0
1. Support for 2 display in Pi 4 - mirror mode (content is replicated in both screens) and 4K mode (adds 4kp60 and 
   turbo_mode flag for vlc,single display only) 
2. Support for http headers in weblink (webpage type) for authentication support
3. Monitor resolution change, cable insertions and auto resolution adjustment 
4. Non-main zone asset flickering when main zone asset changes - fixed
5. After TV_OFF, playlist will not start - fixed
6. Fixed issues like playlist restart after API play, sleep times etc., logo title visibility
7. mpv -  audio fixes and added hwdec=auto flag for other platforms
8. Logo - text display issue fixed
9. Better handling of primary display when more than single display exist

### 4.6.5  
1. Black screen on boot-up in devices which do not have Ethernet interface
2. Few Keystrokes not working for weblink - fixed 

### 4.6.4  
1. YouTube Streaming support for mpv player using yt-dlp
2. Support for spaces in wi-fi access point name
3. keypress playlists support for player2, fixes in keycode for x86 architecture
4. Fixed issues with nodejs exit for license loading/settings change, event playlist, online playlists

### 4.6.3
1. Sleep and reboot were not resetting after set - Fixed

### 4.6.2
1. Checking and opening http websocket connections (in place of https websocket) for local servers when needed
2. Reducing unnecessary delay during upgrade process (using old node module packages wherever possible)
3. YouTube URL normalization for fullscreen autoplay from various share URLs
4. Download returning error if robot.txt is not present - Avoided & Fixed 
5. Locking of application and dark screen if browser load event was not  received - fixed

### 4.6.0
1. This player uses new code base, based on learnings of all these years and to take care of newer technologies of 
   Raspberry Pi OS.
2. Also, portable across various Linux Single Board computers, web platforms and Android PWA.
3. First version released for general availability with feature set of 3.1.1 as reference (there are few features 
   missing like keyboard playlists which will be documented soon)
