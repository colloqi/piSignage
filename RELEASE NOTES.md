# Release Notes for piSignage Player image 
***Important: Skip to original player for upto 3.x.x releases***

## Player2 (version 4.x.x onwards)  

*Known issue with upgrade from 4.6.2 image: first time upgrade takes 10-15 minutes due to fresh npm install*

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

## Original Player - Recommended as of now
#### 3.2.0
1. Player can be assigned with additional groups and playlists under player settings (beta)
   - Can be used only in conjunction with "Combine content of all scheduled playlists"
2. Report did not include count of files played in non-main zones - fixed
3. Media RSS - support for showing title and description fields together
4. When Group is renamed, players still showed old group names - fixed
5. Support for GPIO based media control keys (fwd,prev,pause/play)
   - More details at [GPIO media control instructions](https://github.com/colloqi/piSignage/blob/master/GPIO%20media%20control%20Instructions.md)
6. New French translation file and Vietnamese language support
7. Player Status filters added to Dashboard
8. Group collaboration rights viewonly issue fixed
9. tvUpTime included in reports
10. Auto deploy to all players when auth credentails are changed in settings
11. Other issue fixes like thumbnails not showing up in filtered assets
12. **In addition, all deprecated packages have been updated to latest to address possible security risks**

#####3.2.0a server release
13. Dual display support UI under Group settings for player2 4.7.0 release onwards
14. Fixed issue of playlist search and categories bar missing
15. Increased limit of schedulable playlists to 150 (from 100)

#### 3.1.3
1. Added yt-dlp as an option instead of youtube-dl for YouTube videos, this has better performance in some cases
2. Selective deploy to a player from piShell
3. Auto deploy to player when a group is changed
4. Missing select icon from scheduler dropdowns - fixed
5. Auto deploy when password or user settings changed

#### 3.1.2
1. For randomization option, update log to tell which file is playing now

#### 3.1.1
1. chromium-browser showing new Tab in front of signage - fixed by adding "--no-startup-window"  flag

#### 3.1.0
1. Added keyPress playlist type - play when a key is pressed till next key is pressed or deploy from server
   - Note, please use the keycode which you can check from player log and not character
2. Do not change image during upload if there is no size reduction needed or orientation change

#### 3.0.6
1. Enabled non-websocket communication for old socket.io client for reliability

#### 3.0.5
1. Fixed week of year issue in scheduling

#### 3.0.4
1. License issue when server URL in player configuration contains username along with domain - fixed
2. Kiosk URL starts from homepage for next user after inactivity timeout
3. Alternate week schedule for playlists (upto modulo 4 based on week number starting from Jan 1)
4. Provision to disable download files when eth0/wlan0 interfaces are not available (to save modem usage costs)

#### 3.0.3
1. Disabled this feature for open-source servers: 
   Forcing socket.io to use only websocket protocol for performance and avoiding alert emails 

#### 3.0.0/3.0.1/3.0.2
1. Occasional browser crash and asset validity ignored while changing player group - fixed
1. Forcing socket.io to use only websocket protocol for performance and avoiding alert emails
1. weblink keep in memory option not working after 1 hour - fixed
1. License revoke issue for managed players - fixed
1. TV_OFF playlist was not schedule-able - fixed
1. Provision to add notes to players
1. Progressive thumbnail load and disabling of playlist wise asset listing feature to avoid screen freeze

#### 2.9.9
1. Fixed custom layout issues with fullscreen
1. Ticker and clock adjustment as per custom layout size
1. Player list download as csv file
1. Few bug fixes on webUI

#### 2.9.8
1. Ticker height can be changed in ticker popup for larger ticker messages
2. Ticker speed was always default - fixed
1. Playlists stop playing when Domination playlist together with option playAllEligiblePlaylists - fixed
1. SD player-config.txt - timezone option added
1. SD player-config.txt - auto license generation added
1. SD player-config.txt - wi-fi config not working in certain cases - fixed
1. Stripe payment gateway option added for credit card payment
1. playlist ui - remember last option used feature added and UI changes
1. Deploy not working with large number of playlists - fixed
1. Asset download list - link asset type issues fixed
1. German translations - updated

#### 2.9.7
1. Fixed upgrade not going through error of 2.9.6

#### 2.9.6 & 2.9.5
1. Subscribe for alert emails when players go offline or online (aggregated every 15 minutes)
2. Support for multiple RSS feeds in ticker and Media RSS (separate links by ;)
3. Disable player in settings to avoid billing from next month (instead of completely deleting)
4. PayPal API integration- migration to newer server apis
4. Credit card payment to server integration for instant update
4. Player API support for get volume level and mute, few custom API additions
4. Minor fixes

#### 2.9.4
1. Text over image/video was not showing in non-main zones - fixed
1. Ability to rename non-main zones in settings and also in template designer, the same name will appear in playlist screen
1. Show only zones enabled in custom layout under playlist screen
1. Playlist list screen - Show group names which are using the playlist
1. Ability to download assets list with details under asset screen
1. Ability to select Group filter under Consolidated reports screen
1. Server scaling improvements
   - Enable cluster technology for load balancing
   - Enable worker threads for upload file processing
   - Enable logs (morgan)

#### 2.9.3
1. Player UI and API enhancements
    - Added wi-fi country selection and hidden AP support
    - Player 2 UI support for multiple interfaces
    - 4 APIs to player to control playlist scheduling
1. Auto refresh for weblink - define key and interval, for e.g. control+r,repeat=10 (every 10 seconds send control+r key)
1. Playlist navigation, weblink was not closing - fixed
1. Server scaling enhancement 
     - idle timeout tuning
     - avoiding unnecessary in-memory sort operations
     - query fixes
     - Deploy everyday fixes 
1. Added year to asset details
1. Report selection per group

#### 2.9.2
1. Reverted "websocket as the first option for socket.io" as it was causing connectivity issue in few OS cases
2. Restart after server name change or license change needed power cycling - fixed
 
#### 2.9.1
1. weblink will not close(always in front) after 1 hour if cached - fixed
 
### 2.9.0 

1. OS update and upgrade (may take 10-20 minutes to complete) for video playing issue especially in portrait mode
1. youtube-dl update 
1. Server support for player2 
1. Preparation for node14 version and upgrade path to player2
1. support for mpv Audio delay option under Group settings
1. weblink links in memory, update every hour
1. When resolutions are fixed, add ignore edid based resolution flag in config.txt file
1. Avoid wget fail in few cases where server certificate validation fails
1. websocket as the first option for socket.io
1. Report download issues - fixed

#### 2.8.6
1. Streaming issue in side zones, video not playing - fixed

#### 2.8.4
1. Video in non-main zones not getting stopped when the main asset changes - fixed

#### 2.8.3
1. Streaming videos - added support for TCP streaming (--avdict rtsp_transport:tcp)
2. Autoplay flag for weblinks added for chromium-browser

#### 2.8.2
1. Corrected - 2.8.0 introduced an issue wherein resolution was always set to TV settings rather than Group settings (Forced auto resolution always)

### 2.8.0 

1. Auto copying zone parameters for video window sizes from custom template (avoiding re-entering of values in layout popup)
1. Option to display date in clock widget
1. Fixed - Certain images were not shown in Media RSS feeds
1. Playlist navigation and pause using player USB keyboard ( right-arrow or F  for next asset, left-arrow or B for prev asset and P or up-arrow or down-arrow to pause)
1. Ability to add a fixed default custom template for a group which is applied to all playlists for that group for custom displays
1. Ability to hide download buttons and right click option for assets  (under installation settings)
1. Fixed - Licenses purchased were credited to collaborator account instead of main account 
1. Other UI enhancements and fixes

#### 2.7.4

1. Kiosk mode not getting disabled after enable - fixed

#### 2.7.3

1. Support for RCA (PAL/NTSC) for Raspberry Pi 4
1. Restart kiosk UI in case of any crash
1. "Can´t update Chromium...." popup with 2.7.1 image - avoided

#### 2.7.1 Release For SD card image 

1. Auto registration of players by adding installation, group, name and player_pin in player-config.txt
1. Wi-fi disabled in some cases - added rfkill unblock wi-fi in startup script
1. Emergency message and logo not seen on top non-main zone videos in Pi 4 - fixed
1. Chromium-browser, removed deprecated disable-web-security flag
1. Disabled collaborator login issue - fixed
1. UI changes - Refresh button on players, dashboard screen, more meaningful message for player wi-fi setting
1. SD card image based on Raspbian OS,  2020-02-05-raspbian-buster-lite

### 2.7.0 Media control for Playlist play and prev/pause/next from server, common categories across tabs, many fixes & more

**Player**

1. Play a different playlist once option under piShell for a player
2. Playlist media control - prev, play/pause, next under piShell and under player webUI
1. Support for German Umlauts in file names with conversion of characters as mentioned below
    - "ä":"ae", "ö":"oe", "ß":"ss", "ü":"ue", "æ":"ae", "ø":"oe", "å":"aa", "é":"e", "è":"e" 
1. Addition of delay in milli-seconds to the key send sequence of weblink (for e.g. u,s,e,r,tab,2000ms,n,e,x,t should end with ms)
1. Avoid of weblink crash for invalid keys 
1. Settings to disable TV power check under user settings
1. Ability to play event playlist once
1. Shuffle playlist every cycle instead of just once in the beginning
1. Audio Playlist supports single Radio Streaming link
1. Non piSignage Cron jobs were getting deleted on poweron - fixed
1. Local folder single file path, player was crashing - fixed
1. USB import error if _timestamp.txt is not present in /home/pi directory
1. Framework for Screen brightness control based on schedule as well sensor input 
1. Ticker not shown after exit from kiosk UI - fixed

**Server**

1. Norwegian (Bokmål) translation (thanks to Asbjørn Stokka)
1. Categories can be common across assets, players, groups and playlists (makes categories shareable under user settings)
1. Registering players with no group attached and deletion of stale player specific groups
1. Drag and drop improvements under playlist screen - scroll while dragging
1. Ability to download (uploaded) assets in assets tab of server UI 
1. Option to cancel updateAll schedule  (just delete the time)
1. Report section was broken in server - fixed
1. Custom logo for server UI issues - fixed
1. Redirection to the correct URL when user logs in (instead of login screen)- fixed
1. Removed livestreamer option for Youtube play as it is no longer maintained

### 2.6.0 Pi 4 Added missing support for emergency message, hardware ticker, clock, weblink caching for faster switch, weblink support for other zones, settings

#### 2.6.5 
- When piSignage player boots, it used to kill all python startup programs - fixed
- Player crash in certain CEC cases - fixed
- Live-streamer crash in Pi 4  - fixed
- White label server support for new installations 

#### 2.6.4   
- Firmware update for Pi 4 video freeze & black screen issue
- Media RSS item duration was always 10 seconds and not picked from UI value - fixed
- Security vulnerability in player API for log download - fixed

#### 2.6.3   
- Group setting to enable/disable weblink caching in memory

#### 2.6.2   
- Daily deploy issue when the playlist contains zero assets during initial saving
- Ad index getting reset to zero during domination playlist play - fixed
- Filter local folder assets to supported assets only and sort them to play
- weblink zoom used to shift the window in some cases - fixed
- Convert to 1080p video if the mp4 video dimensions is more than 1920x1080 pixels
- Reduced the duration of initial second display screen "not supported" to 30 seconds
- Increased show player count limit to 2000 in players screen
- exit the USB import script if any command gives error
- Clear cache in side and bottom zone weblinks on poweron
- Added Credit card payment option other than PayPal

#### 2.6.1
- Clock memory leak issue fixed

#### 2.6.0

**Enhanced weblink support**
- Caching upto 3 links in main zone (program keeps running in background and only window is minimized)
- 3rd window is used for loading all the rest of the links if there are more than 3 links (1 & 2 are always cached)
- Enabling weblink type asset in side and bottom zones 
- Auto scroll feature for weblink sites

**Server settings per group to**  
- Disable Player webUI interface
- Disable Player wi-fi Access Point
- Disable Player hardware warning symbols for power supply, temperature (use with caution)

**Pi 4 and Buster OS features**
1. SDL based hardware ticker support for buster OS (Pi 4 support)
1. Emergency message, debug messages and clock support in Pi 4 (buster OS)
1. Upgrade of buster OS to latest while 2.6.0 update (may take upto 15 minutes with good Internet speed)
1. "Switch display" message on second display of Pi 4 for 2 minutes on startup  
1. 12 hour format clock display not working in Pi 4 - fixed

**Other enhancements**
1. Collaborators can view the screenshot even if piShell access is disabled
1. Added ability to add all types of images to custom template
1. CEC support for certain types of TVs (which do not return CEC version) was not detected - fixed
1. Added time-wise sorting of Assets 

**Fixes**
1. Viewing and deletion of player specific groups under Groups view
1. Group API request with string name not working - fixed
1. Playlist rename - name was not reflected in JSON structure - fixed
1. API support for collaborator access not working - fixed
1. Under players screen, sometimes buttons are  disabled on initial load - fixed

### 2.5.4 - mpv support for buster

1. mpv availability for 2.5.0 image for continuous video change-over
1. Fixed domination scheduling issue on date roll-over
1. Fixed server software update check for Pi 4
1. Previous image shown under zone videos and during next switch - fixed
1. Transparent modal for long lists - fixed

### 2.5.3 - Reseller support, Security Headers, Privacy Policy and other fixes

1. Increase number of files upload limit to 100 
1. Lexicographic sorting of lists for assets, playlists, groups, players, labels & others
    - for e.g. Slide1.png, Slide4.png, Slide10.png are sorted numerically
1. Security Headers & fixes 
    - Render 404 pages for not found groups, labels, players
    - Addition of security headers in http responses (CSP,XSS protection, HSTS, nosniff)
1. Reseller portal support
    - Do not show piSignage homepage upon logout
    - Email made optional for reseller-client and collaborator additions
    - Use reseller email for reseller-client communications (renewal requests, sending license )
    - Use reseller logo for reseller-clients
    - Do not show piSignage title, banner images
    - Do not show twitter message link
    - Details of subscription page hidden for reseller-clients
    - Reseller purchases and assigns licenses/credits to clinets, right now done by piSignage team manually
1. Privacy policy added and Terms of Service updated 
1. Player software
    - Make sure logs and events for previous hour are not deleted for first five minutes of the hour in the player
    - Fix the issue of side/bottom zones not changing in case of continuous video assets in main zone  & mpv option is selected
    - In Custom layout, fullscreen option not working if main zone was starting at non-zero positions - fixed 
    - OpenVG crash avoided in some cases of TV not supporting CEC 
    

### 2.5.1

1. Added style support for media RSS link in Add link popup

### 2.5.0

1. 4K support for Pi 4
1. Auto mode resolution selection based on HDMI EDID code
1. Layouts support for all resolutions 

### 2.4.6

1. Pi 4 Support with the following changes 
    - OpenVG is not supported in Pi 4 and hence disabled. So emergency message won't be supported till we publish alternative method
    - Device ID for Pi 4 will start from "9" (instead of "1") to avoid clash with piSignage chrome based players
    - Change of chromium browser path (internal note)
    
1. Reseller portal support - ability to add clients, manage their clients and custom domain support
1. Add collaborator without prior user signup

### 2.4.5

1. Asset validity extended to hours- specify start hour and end hour to start/expire at the specified hour on the validity start/end date
1. Ability to show the text message on video and image - specify the banner text in the playlist asset row 
1. Asset specific text can be shown in ticker instead of overlay - enable "show asset associated text" in the ticker popup for this

### 2.4.4

1. When the playlist contains a single video, sometimes adverts are not playing, broken in 2.4.0 - fixed

### 2.4.2

1. Daily reboot job was not getting removed when it was rescheduled or disabled under Group settings - fixed
2. Side and Bottom zone videos were getting terminated after 5 minutes if the duration was longer - fixed
3. Future valid files were shown as expired in playlist creation screen - fixed
4. License check for white label server validity

### 2.4.1

1. Fixed side/bottom zone mrss/local folder issues

## 2.4.0  Feature enhancements,fixes, Media RSS support for video, Local folder support

1. Local folder/file play support (including network folders) 
1. Native support for media RSS with video, image and links
    - Reads various fields (image,enclsoures,links) from the feed and duration
    - Can be used to create a playlist of items to play as an alternative of uploading of assets
    - Ticker is hidden when media RSS text is shown
    - If duration is not provided in link popup or RSS feed, playlist duration is taken for each item
    - RSS default image is removed
    - Player crash if protocol(http/https) is not present in the link - fixed
1. When TV_OFF is scheduled, playlist not being stopped - fixed
1. Option for Random shuffle of assets in the player before start of play
1. Option to interleave assets from different playlists while combining assets from multiple scheduled playlists(instead of sequential add) 
1. Custom layout background image not shown - fixed
1. Youtube-dl update to latest version
1. Youtube play - option for mpv player included with increased I/O buffer
1. Enhancement of portrait mode snapshot
1. Adjust the weblink window size based on zoom factor
1. Categories 
    - Feature added to playlists and groups in addition to assets and players
    - Remove deleted category from assets, players and other databases
    - Bulk assigning of categories for assets, playlists and groups added
1. Group 
    - Selection of playlist which is to be added as default for scheduling rows
    - Auto adjustment of end-date when start-date is changed to the same date if not later
    - Group settings rearranged for clarity 
1. Debug mode is added which can be enabled from player webUI or piShell popup (reboot removes the debug mode)
    - Debug mode enables enhanced logging and onscreen display of asset/duration
    - Use only for debugging issues and reporting
1. Support for pi Shell and snapshot from player webUI
1. Playlist detail screen highlights validity expired assets along with deleted assets
1. Fixed issues related to  playlists assignment to groups (for collaborators) 
1. Logging of player deletion event
1. Default resolution of new groups changed to 1080p
1. Clear weblink cache on poweron
1. Upload limit enhanced to 5GB for a file
1. Display CPU temperature both in Centigrade and Fahrenheit

##### Fixes

1. Welcome notice display duration linked to browser load 
    - fixed issue of weblink/pdf assets not being shown on poweron when welcome screen is disabled
1. Ticker text getting truncated  when special characters present (in OpenVG mode) - fixed
1. Stop the previous audio asset before starting the next audio asset in background mode - fixed 
1. MPV player audio volume not working - fixed 
1. Domination content scheduling issue when not eligible - fixed
1. Wrong count of managed players after player deletion and re-addition - fixed 
1. Upon server restart, scheduled jobs for group deploy and player updates were not started - fixed
1. Unable to delete filenames with "%" - fixed
1. Possibility to add empty label in upload assets popup - fixed

##### White label

1. Users next billing date is shown under admin panel
1. Collaborator accounts not working in case of no subdomain - fixed
1. Support for custom-hs.css  for server UI (copy instruction in make.sh)
1. Change password not working - fixed
1. User sessions removed upon change of password or deletion
1. Player license file not attached to email - fixed
1. Cookie usage notice added

    
##### Known issues

1. Aux port support for mpv player


### 2.3.1  Four zone video stream support, new weather widget and fixes for many issues


1. Video support in zone4 in addition to main, side, bottom zones (zone4 only in custom template & video window definition needed)
1. Ability to play Streaming video in main, side, bottom and zone4 zones (only main was possible earlier)
1. Mute option for video streaming and youtube links added
1. Video playing in full screen upon first deploy of other layouts - fixed
1. Issue of CSS for text messages in nested Playlist - fixed
1. Glitch while showing text message in side/bottom bar - fixed
1. Fullscreen transition during blend animation synchroinized
1. Add piplayer name for mdns discovery  (name is changed to remove special characters and space is replaced by -)
1. Dark Sky weather api and example added 
1. Increase addition of playlists to a Group upto 100
1. Kiosk asset show timeout has been increased to 5 minutes from inactivity timeout (30 seconds default)
1. Error in showing ticker after TV on in Openvg option - fixed
1. Livestreamer or Youtube-dl selection not working - fixed

1. Show update image till video is shown and add delays to improve reliability of upgrade 
1. youtube-dl update
1. Brand image made bigger on navbar
1. Add logout redirect and smooth logout
1. Logout in mobile screens was not shown - fixed

1. Clear cache of chromium-browser on poweron
1. Double ticker issue for uzbl browser - fixed
1. Mongoose query for detailed report, non existant ts field - fixed

1. HS customize script and instructions for image generation added
1. Ability to execute custom script after update complete to copy custom assets
1. Remove port information from license generation for HS


## 2.3.0  Kiosk UI, Gapless Video Play(beta), offline loading with USB, Android remote app, third party login ....

*** Needs Internet access for the player to upgrade ***

1. Kiosk UI (either in-built or provide url/zip of your UI app)
    - Built-in UI: Press any key to show Assets list, touch an asset to play and go back after a inactive timeout
    - Instead of default UI, custom UI also can be loaded, use open-sourced React UI app as the starting point
    - SIGUSR2 event also triggers UI if event playlist is not present
1. Gapless video play (BETA)
    - Use of hardware accelerated mpv(https://mpv.io/) player (select through group option selection)
    - Audio is only through HDMI (not aux or both) as of now 
1. USB export and import (for offline players)
    - Deploy under Group and export asset repository to USB stick. 
    - Connect the USB stick to Pi player to import and deploy automatically
    - player will reboot after copying assets and settings from USB
1. Under schedule, date scheduling works for extended times of next day
    - For e.g. 2 Jan 2019 6PM - 2AM works from 2 Jan 2019 6PM till 3 Jan 2019 2AM
1. Revamped Android app for piSignage remote launched - https://play.google.com/store/apps/details?id=com.pisignage.pisignageremote
1. Reduced player network data consumption
    - reduced unwanted logs, objects transfer
    - increased default reporting interval from 3 minutes to 5 minutes, can be further increased under server settings  
1. Auto login using token obtained through API - allow third party server authentication and redirection
1. Allowing special characters in SSH password setting - fixed

Other features         
--------------
1. Snapshot taking capability in player webUI and API
1. Network Diagnostics disabled if "Do not show startup welcome screen" is selected
    - Avoids DHCPDISCOVER request for the MAC Address de:ad:c0:de:ca:fe
1. Option to enable/disable network access point in player webUI
1. Programmable delay for sending keystrokes to webpage link screen instead of fixed 10 seconds
1. Play file API - added duration as query parameter for play 
1. Port 8001 http request sends pi player signature
1. Decouple TV on/off scripts from CEC support of TV - execute them all times
1. Monthly report enhancement to select a player

Fixes
-----
1. Make youtube-dl as the default program for Youtube playing, updates to latest during upgrade
1. Multiple playlist delete not working from dropdown menu - fixed
1. Ctrl+N (F6) menu 
    - unable to give server with http or https prefix - fixed
    - hidden API - default option in ctrl+N changed to NO
1. Software update video used to stop and black screen during update - fixed partially
1. .repo directory deletion in player if zip file is removed from playlist
1. Show only current active licenses
1. Player not starting with 2.2.1 in case of certain socket.io errors - fixed
1. White label license - support for port number in server domain
1. OpenVG ticker - fixes to avoid ticker freeze


## 2.2.1  Pi overheating issue

1. Chromium browser taking too much processing time & sometimes overheating of Pis - fixed
1. licensing issues when server name had http:// or port - fixed
1. player uptime shown in player screen
1. added "disable-pinch" flag to disable zooming in kiosk mode
1. Unable to upgrade player in cases of player behind firewall  - fixed
1. API change - query assets based on a label, api/files?label=xxxxx

## 2.2.0  New socket.io for increased reliability and faster events for player-server communication, online only playlists

1. Faster events and increased reliability on player to server connectivity - Upgraded to latest socket.io with backward compatibility
2. Option to schedule a playlist only if player is online, this way fallback playlists when player is offline can be scheduled
1. Availability of variables \_\_cpuid\_\_, \_\_group\_\_, \_\_playername\_\_ and \_\_ipaddress\_\_ for use in links and messages (can be used to get player specific content)

Fixes
-----
1. Issue of video fullscreen playing when custom layouts had customized video window size - fixed
1. Player getStatus API returns deployed playlist names
1. Minimum advert playlist interval reduced to 5 seconds from existing 30 seconds
1. Increased reliability in case of OpenVG based tickers
1. Few player crash fixes
1. License related fixes for redemption of licenses

## 2.1.7

1. RCA Video playing slow - fixed

## 2.1.6

1. window.print not working in HTML repos - fixed

## 2.1.5

1. openVG ticker makes piSignage software crash in old OS images - fixed

## 2.1.4

1. Fix issues related to openvg based ticker
1. zip repositoriy index.html files are served from the local server rather than file loading in the server
    - Helps to load repositories based on web apps

## 2.1.1 Option to play Ticker messages in Hardware GPL(Open VG) and rolling text feature

1. Option to play ticker in GPL(OpenVG) to avoid freezing
1. Same ticker option can be used to play rolling text with configurable font-size, position and width


## 2.1.0 Daily scheduled deploy, Upgrade all, Dashboard, Auto rotate, CEC, validity and other player fixes

Server
--------
1. Auto daily deploy moved to group settings and takes care of playlist changes for group assets update
1. Daily deploy for all groups under group list screen
1. Dashboard to see player status and configurations
1. Assign assets and playlists to groups for collaborator use
1. Assign default schedule for playlist which gets copied to groups when assigned
1. Default dates and times assigned to group schedule in schedule calendar popup
1. Player reported and synced time shows time ago (tooltip shows actual time)
1. Bulk delete option under playlists screen and avoid TV_OFF copy
1. Bulk update of players to a version - schedule to issue upgrade command at scheduled time or there-after when player comes online
1. Collaborator had access to group default playlist change even when not given permission - fixed
1. Lists are sorted alphabetically instead of last created for Assets, Playlists, Categories and Groups
1. Scrollbar to appear if needed for touch access
1. Bulk delete under assets had issues - fixed
1. Usage of time object for time inputs and fixing issues with schedule time displays in Group schedule
1. Under assets screen, show more button missing - fixed
1. Avoid sending duplicate emails for purchase request - fixed


Player
------
1. Auto rotate image based on image header values during upload
1. Show player CPU temperature in server player screen
1. Provision to play audio playlist through HDMI port under playlist settings
1. Play weblink using API in player one after another without issuing stop command
1. When CEC is not supported by TV, cec-client processes were not terminated in Pi - fixed
1. Do not send periodic TV OFF messages unless configured under settings - fixed
1. When multiple instances of the asset in playlist, asset validity was not working - fixed
1. Zip repository playing issues for filenames with space and folder zips - fixed
1. Translation popup in weblinks - New chromium flag added to avoid translation popup in future releases
1. Issue of full screen not-working after nested playlist in side/bottom zone - fixed
1. Not able to change playlists under zone4/zone5/zone6 with deploy - fixed
1. In player webUI, sleep timer should reflect server settings - fixed


## 2.0.0 PDF slide mode, RSS text only mode 

2.0.5
-----
1. Ability to play a link with play API  of player
(for e.g. curl --user pi:pi -X POST --header 'Content-Type: application/json' --header 'Accept: text/html' 'http://localhost:8000/api/play/files/play?file=https://www.google.com/search?q=piSignage')
1. Option to reboot the player everyday at fixed time (although this is not needed)
1. Inform users to select the video window size when custom layout is chosen

2.0.4
-----
1. Ticker logic changed to use transform property of CSS
1. Download option for custom layout for manual edit and upload

Server
------
1. Notification when credits are low in menu bar
1. Provision to deploy everyday to a group

2.0.3a
------
1. fixed - wireless reconnection issue in case of disconnect
2. fixed - webUI was broken in 2.0.2

2.0.2
-----
1. If domination playlist has a single video, it will continue to play in a loop - fixed

2.0.1
-----
1. Playlist not starting on startup(black screen) if welcome screen is disabled and player is offline -fixed

2.0.0
-----
1. Experimental PDF reader with evince - full screen mode without ticker, displays each page for the set duration
    - use it to display multiple slides from the PDF
1. Media RSS - display text only option without image
1. Blend mode, iframes not shown in some cases - fixed 
1. Bulk delete and assign categories in assets screen 
1. Categories display 20 characters instead of current 10 in button
1. Incorrect display of licenses available - fixed
1. Customized logo in server UI for collaborators was not displayed - fixed



## 1.9.9  Letterboxed mode, blend animation, support for latest stretch OS  and Pi 3 B+ hardware


**1.9.9d**

1. Added cursor back to screen when the mouse is moved
1. Removed Google Calendar type - instead refer to help article to display calendar
1. Multiple Media RSS issues fixed and load image from image.url,image.link,enclosure.url,enclosures[0].url fields, 
if other field please modify /home/pi/piSignagePro/templates/media-rss.html file accordingly
1. When logo and clock displayed, making TV OFF and ON will not display videos & images - fixed
1. Added variable for link for identifying the player, \_\_playername\_\_,\_\_group\_\_,\_\_ipaddress\_\_,
\_\_cpuid\_\_
1. Force TV ON setting used to switch on TV even when TV was supposed to be OFF - fixed
1. RSS empty title or empty description used to return "No feed available" - fixed
1. Disabled chromium pop-up for device discovery notifications
1. Ignore second SIGUSR2 event within the duration of event playlist
1. Option to disable welcome screen on poweron
1. Asset and Playlist access control per group added
1. Forcibly terminate cec-client program after 20 seconds if not terminated
1. Blank overlay when emergency message is enabled and no message has been added - fixed

**1.9.9b**

1. Tool for designing custom template added (pisignage.com/custom-template)
1. Addition of total online, but not playing count for players
1. Unable to add Google Calendar asset - refer to help article

**1.9.9**
1. Added support for latest Raspbian OS (Strecth, March 2018) based image
1. Moved to DHCPCD based network configuration(/etc/dhcpcd.conf)  and dropping /etc/network/interfaces based configuration
2. Commenting Overscan value lines in case of disable_overscan mode is selected, otherwise overscan values are taken even though overscan mode is disabled
3. Support for letterboxed mode for Image display (scaled to full screen keeping the aspect ratio intact)
3. Added Blend transition support for images and HTML pages
3. Added blend transition for media RSS images
4. Showing Mac address was not working  for newer releases - fixed
5. Asset validity extended to advert and audio playlist assets as well
9. Fix a bug where first playlist is not scheduled if default playlist was an advert, domination or audio playlist
10. Support for line breaks in text message display
11. RSS ticker broken in 1.8.9c - fixed in 1.9.9aa


## 1.9.8 Play a playlist at selected intervals, play multiple items of advt playlist, zoom & send keystrokes to weblink

**1.9.8c**  

1. Support for capital letters and special characters in keystrokes for webpage links (use shift+b,shift+2 etc.)

**1.9.8b**  

1. Start socket.io every 3 minutes if network is not available earlier (used to take 12 minutes to start earlier)
1. Issue of player not-starting when playlists are empty - fixed 

**1.9.8a**  

1. In certain cases, change of Playlist is not reflected in the player - fixed 
1. Media RSS and Ticker RSS feed, links with query parameters were not working - fixed

**1.9.8**  

1. Provision to send keystorkes for the webpage after launch (10 sec delay), add keystrokes in Add Link details page
2. Ability to play multiple advt items at once during advt insertion
3. Introduction to domination playlist which plays once at prescribed intervals
4. Change channel to HDMI when TV ON command is issued
5. Show the type of playlist in Group details page

**1.9.7f**
1. Added youtube-dl program as a second option for youtube video streaming, select this option under user settings tab if youtube videos do not work
2. Support for zoom option while launching webpage links, works only for 1.0 or greater, default is 1.0
3. Issue CEC TV on command when emergency message is updated
4. Disable scrolling of signage window to blank - fixed
5. wi-fi access point names standardised to piplayer_xxxx (last 4 digits of player id)


## 1.9.7  Emergency Message, separate audio playlist, enhanced clock widget support,domination playlist,youtube fix and fixes 

**1.9.7d**
1. Emergency message display issue - fixed

**1.9.7c**     
1. Changed the address of wireless access point to 192.168.100.0 to avoid clash with router addresses
1. Fixed issue of scheduling not working in case of empty default playlists and other such errors
1. Added validity check for nested playlist assets also

**Server changes in 1.9.7c**   
1. Possibility for delayed sync by scheduling at a later time
1. Speed up of playlist and asset screens by delayed rendering of list items
1. Show asset details and editing for more text type
1. Search  and category selection  options under Asset Edit screen
1. Flag to setup default for license type (managed or license only)  under settings
1. mongodb driver update 

**1.9.7b**
1. Introduced Emergency message feature per group which will displayed on the current signage content. 
1. Clock widget enhancement - shown on top of video as well, two positions and 12/24 hour format support
2. Added support for separate audio playlist which can be played on audio jack in addition to the normal signage on HDMI port
3. Added a flag to support CEC TV on
4. Video on side zone continues to play for the next asset in case of fullscreen - fixed

## 1.9.6 Event Playlist, Ticker Speed, ssh password, CEC status, wi-fi access point, fixes 

**Fixes in 1.9.6a**

1. image generation and wi-fi access point related issues - fixed
1. access point address changed to 192.168.0.1 
1. Player UI - non chrome warning message removed



**New Features**  

1. Variable ticker speed support - full, medium(66% of full), slow(33% of full)
1. Introduction of event playlist for IoT applications
    - send SIGUSR2 event to process "node pi-server.js" and event playlist will be played for a fixed duration or till next event (0 sec duration)
    - Make any playlist as event playlist under playlist -> settings and add it to the group
1. Ability to change ssh password of player from Server UI (under Settings Tab)
1. Added fifo and streaming timeout flags for audio streams
1. Boot logo(Raspberry) disable option under Ctrl+N
1. Individual audio song play support under Player webUI
1. Send CEC TV On command every 5 minutes if TV is off 
1. Read CEC TV on status and report to server (under Player status)   
1. Execute python script file if present for TV on/off commands
    - TVoff.py while TV OFF
    - TVon.py while TV ON
1. 1.9.6 SD card image additions  
    - player acts like wi-fi access point to facilitate network configuration with wi-fi upon first time boot
    - configure using a file stored in boot partition from laptop (server name and wi-fi options)


**Fixes**  

1. Disabled wireless power management to increase reliability of wi-fi connection
1. Playlist content not in sync with players in some cases - fixed
1. Change playlist at the end of current cycle made to work for current single video playlist - fixed
1. Playlist drag and drop screen, duplicate item was not displayed correctly - fixed
1. Remove special characters like "#" from the playlist name while adding since "#" is not supported for playlist name
1. Asset validity date was not properly displayed - fixed
1. In some cases server name getting changed to example.com under Ctrl+N configuration - fixed
1. Show registered email for the username under "Welcome user" button
1. Confusion of Add with Search box in List Group and Playlist screens - Added Serach bar
1. Remove Report icon in home screen of player webUI
1. Accept username in forgot password - done
1. Stop sending license messages and wrong calculation in case of license-only options
1. Disable right click on web-page links for Layout 1 and 2a (use of kiosk flag) - fixed 
1. Add a separator between ticker messages in case of scroll mode



## 1.9.4/1.9.5 Asset Expiry, Audio Features, Independent playlist support for non-main zones, New UI, Server performance and more...

**Features in 1.9.5/1.9.5a**

2. Make beta UI as the main UI and option to go back to old UI under settings
4. Added duration for each RSS item for media RSS link and RSS ticker 
1. pi Player - Support for DNS server configuration under DHCP (both in ctrl+N and webUI)
5. pi Player - Log files download under player webUI for debugging purposes
6. pi Player - Settings file editing under player webUI - for advanced usage
3. Fixed issue- scheduling playlists in the player completely offline will not work
7. Fixed issue- Restart chromium if it has crashed and refusing to take commands
7. Fixed issue- Scheduling start and end date not shown correctly under Group details
1. (1.9.5a) RSS maximum number of items increased to 100 
1. (1.9.5a) Player UI issues fixed with respect to Add file, CSS colors 

**New Features**

1. Enhanced Audio support
    - Recognises extensions .mp3,.m4a,.mp4a,.aac as Audio files
    - Songs can be played to completion in addition being used as background music
    - Videos can be muted to use background music (or video from other zones)
    - New type of link for Audio Streaming has been added (can be used in place of Audio files for background music)
    - Priority for Sound selection is Main zone > side zone > bottom zone > background music
    - Background music will continue till one of the zones has audio 
    - Background music option is supported only for playlists that are played in the main zone
    
1. Streamlining of nested playlist and other zone content play
    - Audio and Video play play in loop for other zones (instead of stopping after end) till the main zone moves to next asset
    - Switching between fullscreen and multi-zone layout corrected for advert playlists, nested playlists and video-to-image transitions with the following notes
        - If full screen video is used, add side and bottom zone assets for the next asset again
        - If an image is needed in fullscreen and the previous side zone contains a video, add an image to the sidezone to clear the previous video
        - Background music does not play across all the assets in nested playlists (use in the main playlist instead)
        - Livestream and CORS link are supported only in main-zone
        - Video interruption to play adverts is supported only in main-zone
        
1. Independent playlists for non-main zones (select play independently while selecting playlists for these zones)

1. Validity period for asset can be added to automatically start/stop playing the asset. Useful for content which has limited period like sales promotions.

1. PDF documents are shown without toolbar

1. New UI (you can switch to the old UI under settings-scroll down to end)

1. RSS description field can be used instead of title in RSS ticker and Media RSS 

1. Support uploading brand_intro_portrait.mp4 video for portrait displays (and made names case-insensitive)

1. Auto save when the playlist is changed

1. Shuffle option while preparing playlist

1. Category Names can be seen by hovering the mouse(tooltip)



**Fixes**
1. Full screen transition issues in multi-zone layouts - fixed
1. Livestreaming and video termination - smoothened
1. Resize images bigger than 1920x1920 to within keeping aspect ratio to prevent pi from heating up
1. Connection to server disconnect in some cases - fixed
1. CORS weblink screen size has been fixed for all landscape and portrait modes 
1. Pi heating if the playlist goes in tight loop - added a 1 second timeout to avoid such cases
1. Restore bubble popup in case of browser crashes - fixed
1. Addition of chrome flags to CORS webpage like disable translation
1. Accidental registration of already registered pi in a different account - avoided
1. Issues with ctrl+N static address selection - fixed
1. Server performance improvements to handle large number of players


## 1.8.0 Chromium Browser based signage introduced, UI changes, local file support from webUI, Restricted Collaborator access 

***1.9.3***
1. Fixed - webUI for player was broken in 1.9.2 

***1.9.2***
1. Fixed - Assets and playlists of the same size were not getting synced to the player - fixed 

***1.9.1***
1. Fixed - Chromium caching image in every cycle when url reload option is selected, leading to memory leak 

***1.9.0***
1. Fixed - Hardware portrait mode, resolution was not getting set properly
1. Fixed - Continuous download of asset in case of network error, limited to 5 retries at varying intervals
1. Fixed - URL reload every time not working
1. Fixed - Once enabled, pause video feature was not getting disabled (setting 0 to Time to Stop Video)
1. boot video play in loop for short videos
1. Fixed - Setting volume of video to zero
1. Introduced a time gap of 30 second between issuing CEC command and switching off HDMI interface (for TV OFF and TV ON commands)

*Server side*
1. Playlist Preview mode - we are still working on it, RTSP,YouTube, RSS & weblinks are not working
1. Playlist UI toolbar changes
1. Warn if no regular playlists assigned to Group
1. Fixed - Change password not working

***1.8.9***

1. Fixed - unable to keep the original size for images

***1.8.8***

1. Fixed - with new Raspbian updates,popup on poweron mentioning  "Restore pages? Chromium didn't shut down correctly."
2. HTML repo, if index.html is not present, entry point auto selection as first html file in the directory.
3. If there is an RSS feed fetch error, use previous messages instead of displaying "no messages or feed error".
3. Option to retain video aspect ratio under Group settings (default is fill the screen).
3. For images, fill zone option is made as default.
3. UI changes for Group settings popup.
4. Fixed some issues with chromium-browser height calculations.
5. License download upon re-registration.

***1.8.7***

1. Display default logo if the pi player contains logo.png at ~piSignagePro/public/app/img/logo.png

***1.8.6***

*Major Features*

1. Ability to add Text messages along with CSS style under Assets
1. Option to Combine assets of all scheduled playlists to play (layout is fixed to that of first scheduled playlist)
1. Support for multiple Advertisement Playlists to be added to a Group (For e.g. you can have one playlists at 60 second interval and other at 5 minute interval)
1. Pause the video and insert advertisement after certain interval (select ineterval under Group settings)
1. PDF support (only with chromium-browser available in image 1.8.5 onwards)
1. Ticker option to scroll from left to right
1. 3gp video format support

*Minor Features and fixes*

1. Hide url bar in weblink window
1. Quick reconnect to server (in less than 3 minutes) after network reconnect  
1. Snapshot quality improvement ( more buffer size allocation)
1. Fixed issue - Possibility of blank screen on poweron if uzbl is not installed
1. Next advertisement timer to start after completion of current ad play (instead of start of ad play)
1. Hide system message option for empty playlist and rss ticker error
1. Clock widget shifted to 24 hour format
1. In deploy all, avoid unnecessary error messages
1. Delete brand intro from players if deleted in server
1. Screen background color selection using html5 color widget
1. Thumbnail fix for videos of duration less than 8 seconds

***1.8.5***

1. Drag and Drop files and links to upload them to pisignage.com
2. Knowledge base with prediction(beta) added
3. Clock widget added which can be enabled under Group Settings
4. Rearranging scripts to take care of latest Raspbian release
5. UI changes (delete button for assets, playlists & groups)
6. Issue fixes

***1.8.4***

1. Ctrl+N server name getting changed to example.com when ESC key os pressed
1. Chrome browser crash issues fixed
1. Collaborator access to multiple groups
1. Minor bug fixes

***1.8.3***

1. Shoutcast support under streaming link
1. Removed tvon command on poweron (as it is given in boot already)
1. Issue with nested playlist when the media file is not present
1. Fixed - Custom layout template loading error in Chrome 
1. Fixed - Player crash if ticker message is empty and ticker is enabled in slide mode 


***1.8.2***

1. Fixed - Youtube videos were not playing in 1.8.0/1.8.1
1. Fixed - custom layout not working 1.8.0/1.8.1

***1.8.1***

1.  SVG animation with more styles added (for both uzbl & chrome versions)
1.  Multiple custom_layouts can be defined 
    - File name should be custom_layout*.html (* can be anything), for e.g. custom_layout_weather.html
    - Assign in the layout popup to a playlist
1.  Asset delete - wrong deletion of asset file fixed
1.  Unable to select assets for side and bottom zones - fixed
1.  Uniqueness of thumbnail across installation - issue fixed
1.  Player settings screen made as a pop-up
1.  Minor UI & bug fixes

New Features
------------
1. Chromium browser(needs latest image for pi or running /home/pi/piSignagePro/misc/get_chrome.sh to install)
1. Chrome supports transient eevnts and faster loading of URLs 
   (people who complained their URLs not loading can now try with Chrome)
1. Ability to interrupt the playlist and play files from Player using webUI
1. Restrict collaborator to a single group and various other permissions added
1. Support basic animation if Chromium-Browser is present 
   (for advanced animations please convert the images to video and use, for e.g. in Powerpoint save slides as video)
1. getstatus API for Player returns Current playing file  
1. Player settings UI made more informative 
1. Option to resize images to occupy full screen under Group>Display mode 
2. Suppress "download in progress" messages using option under Group>Display mode 
1. Scripts modified to support various Raspbian release (Sep 2016) and misc/get_chrome.sh added to install Chromium Browser
1. Server UI enhanced based on various feedback
1. Home screen of webUI - playlist selection for playing introduced
1. Support for mpg/mpeg format Video and bmp format Image
1. Protractor based system testing added for Release testing
    
Fixes
-----
1. Instead of error object (500) send rest error for not found URLs
1. Error fix in combining default playlist check
1. Player disk usage stats - wrong reporting issue fixed 
1. For resized assets, correct filesize was not reflected - corrected
1. converting to yuv420p profile in case of yuv422p profile videos (certain videos were not playing)
1. x-access-token allowed in APIs
1. Assets filter under Playlist creation issues resolved


## 1.7.0 Independent playlist support for side/bottom zones, media RSS, open wi-fi, player level deploy,scheduling enhancements, UI improvements, Volume control 

***1.7.9***    

1. FIXED - Sometimes large video file gets corrupted due to 2 wget processes running    
2. FIXED - corrupt image files halt the browser from displaying subsequent images    

***1.7.8***

1. Delete old files after playlist change if not needed
2. Option to wait till the end of the playlist loop to load new playlist
 
***1.7.6***

1. Nested playlist support with video
2. 6 zone support in custom layout 
3. Skip empty playlists while scheduling (except default which will be used in any case)
4. Side and Bottom zone videos are played at layer 5

***1.7.5***

1. Issue in scheduling ad playlist fixed

***1.7.4***

1. Added option not to show Media RSS title
1. Scheduling logic added for Advertisement playlists as well

***1.7.2***

1. Added Cookie & Session-Cookie support for the http requests
2. Fixed a player crash related to Media RSS support

***New Features***

1. Support independent playlists for side and bottom zones (supports images, html files, links)  (simply add a playlist to the side 
or bottom zone in playlist screen)
1. Directly deploy to players without creating group(Choose none under group selection)
1. Media RSS support (select under Assets link for default template or use html file from github examples directory)
1. Combine assets of default playlist with the scheduled playlist (select under Group Details screen)
1. Scheduling for multiple week days or month days
1. local API support for media RSS in usage for html files
1. Open wi-fi network support
1. Support for space characters in wi-fi name
1. Pi Volume control under Group settings
1. Allow upto 20 scheduled playlists under Group
1. UI Changes
   - Assign Asset directly to multiple playlists from Asset screen or Asset details screen
   - Delete option in Asset Details screen
   - Deploy playlist directly from Playlist screen
   - Sync All Groups button under Group list screen
   - Display MAC address both in welcome screen and under players screen (click the IP address of the player)
   - Allow minimum duraton of 2 second for images and 10 second for other types of assets
1. Reliability
   - Retry download after 5 minutes of network error
   - Occasional Screen going blank on poweron due to browser not starting - Fixed
   - Restrict image sizes to 2560x2560 for large images upload
   - Faster load times for player and admin screens
   - webUI, font files served locally instead from Google site
   - Fine tuning of parameters for cache, gzip compression 
1. Licensing - support for domain name level licenses
1. Increased upload file size allowed to 3GB (subject to user account size limit)
1. Billing report added 
1. Avoid http auth for the APIs originating from localhost to player
1. Started work on supporting Firefox and Safari browsers for server UI

    
***Fixes***

1. Remove special characters from the file name to avoid non-playing of assets which contain #,' characters
1. RSS issue when the RSS feed contained ' character
1. Allow upto 500 groups and labels
1. Bug fixes under Group Deploy,player wi-fi immediate connection, immediate refelction of Group settings upon sync,
1. Player WebUI playing since field was showing wrong time - Corrected
1. Shceduling issue when start time was greater than start time - Fixed
1. Removed Seek message upon video loop for single videos, software upgrade video
1. API not accessible due to token object - fixed
1. html zip file support issue (when file name contained string zip other than .zip)
1. File created date was not updated when the file was uploaded again
1. CEC message for TV OFF was sent after HDMI shut off - corrected
1. regex issue while checking file names - fixed
1. 1 pixel border issue - removed
1. Favicon added to webUI
1. CSS rotation based on screen size, no hard coding for 2ap, 2bp layouts

## 1.6.0 Website link support, New Browser release, Custom Layout, Player Snapshots, UI changes, fixes for Ctrl-N issue and Youtube link not playing

***1.6.3 Features and Fixes***

1. When there is a single item playlist with video, video is played in a loop with no loading time (no ad playlists should be present)
2. Bootup video & update software screen videos changed
3. Issues fixed in install scripts related to screenshot, uzbl and wi-fi interface
4. Ctrl-N interface made fullscreen

***1.6.2 Features and Fixes***

1. Ability to overlay a png logo at group level (configure in Set Display Mode under Groups)
2. Modify Video duration in playlist (default is displayed and it can be changed if the duration is not proper)
3. Upgrade issues fix for snapshot feature not working
4. Node restart during upgrade - fixed
5. Custom layout support in Portrait mode 

New Features
------------
1. 3 new Layouts - custom, custom portrait right and custom portrait left, they enable to upload a custom_layout.html file 
and display. Use id fields main, side, bottom and ticker to display respective content
1. Take Snapshot of the player available in the shell popup screen for the player
1. Use weblink to display websites which were earlier not shown due to Cross Origin issues
1. Newer version of browser added which is faster and plays video files too (select weblink and add a youtube link)
1. Allow category selection in Edit links and Notice Creation screens
1. UI Changes
    - Default duration (10 seconds) can be changed under Settings
    - User can upload his own logo and url for the brand logo on the left side of top msnu bar under settings 
    - Display accounts links for which the user is collaborator under User dropdown menu
    - Show associated playlists for a particular asset in Show Assets and Edit Assets screens (For this you need to go to 
    Playlist details screen and save the playlist for previous playlists
    - Display thumbnail in Edit Assets screen to identify assets easily
    - Sort selection for players either latest reported or Alphabetic
    - Alphabetic ordering of Assets, Playlists and Groups in List screens
    - More details added to Group and Playlist list screens
    - Licensed status is available at server, player name color is based on licensed
    - Player shell popup is always enabled to view the previous snapshot
1. Build and install 
    - sudo install.sh(in place of install.sh) is checked to avoid permisson issues after piSignage install on top of Rasbian
    - Avoid overwriting of cmdline.txt during install
    - Creation of white-labelled server images
    - Reduce image size by removing unwanted packages
    - increase reliability while generation
    - Script to upgrade players manually after downloading the image
1. piSignage image size - overall size of the image is reduced
    
Fixes
-----

1. Ctrl-N and Player settings screens, DNS addition to the interfaces file and avoid screen going blank
1. Send 404 error for files which are not present (if the asset is deleted and still present in playlist)
1. Thumbnail creation issue for videos
1. Youtube videos not playing - issue fixed
1. Config Server copied from the previous version (instead overwriting as pisignage.com)
1. Playlist copy used to copy wrong layout - fixed

----------------------------------------------------------

***1.5.3 Minor Release***

1. Apply Advanced Video Window  paratameters even in case of fullscreen & layout "1"
2. Upgrade installation script to support pi 3 (rpi-update)

***1.5.2 Minor Release***

1. Occasional screen going blank during deploy while Youtube link is playing
 

***1.5.1 Minor Release***

1. Scheduling check at 0th second of every minute to roughly synchronise playlists across players
2. Fixed the issue - Accidental power ON command on bootup in case RCA modes, this used cause distortions in TV signal from Pi

## 1.5.0 CSS Portrait Mode, Group Ticker, TV OFF Playlist & more

**New features**

*A. Server*

1. Chromecast support as pisignage player, Just connect Chromecast and press "cast" button in the menubar to add
1. File upload size increased to 1.5GB
1. Make link editable from Read-only in Assets

*B. Player Software*
 
1. Support for both HTML/CSS Portrait mode (Just select Layouts 2ap,2bp,2ap270,2bp270) and Hardware portrait mode
1. Support for both "Right" and "Left" Portrait
1. Introduction TV-Off playlist which can be scheduled or as used default to switch off TV when not used
1. Group level Ticker messages which will be played if there is no Playlist level Ticker
1. Change to the next slide only after URL load in case of links
1. Switch to next Playlist only after complete download
1. Display Player-ID in web UI for convenience

**Bug fixes**

1. Portrait video not playing in fullscreen in layout "2b"
1. Fixed - Same day Scheduling not working for Timezones "behind" GMT 
1. Add Collaborator accepts username as well as the registered email of the user
1. Portrait HD (1080x1920) video playing issue - rpi-update reverted to 4.1.12
1. Accidental turn-on when playlist is deployed
1. Fixed - Unsaved changes, Cancel was not working 
1. Avoid Deploying playlists while Group editing, Deploy only upon exit or pressing Deploy
1. Avoid unnecessary Deploy every time group edit exit


## 1.4.1

**New features**


*A. Server*

1. Server Accounting and purchasing Player Licenses, Managed Licenses and Renewals streamlined
1. Calendar view for multiple playlists scheduling under Group
1. Auto deploy when group config screen is exited
1. File upload size increased to 990MB

*B. Player Software*
 
1. Added server address and connection status to welcome screen
1. variable \_\_connectionstatus\_\_ added to ticker
1. CEC support added for TV ON/OFF commands in addition to HDMI signal control 
1. Custom template upload for notice (notice_template.ejs)
1. HTML tags support in notice title, description and footer
1. RCA Cable support with addition of NTSC and PAL modes
1. fullscreen support for individual assets and for adverts in multi-zone playlists
1. Option to set name & location for each player
1. manual TV ON/OFF in shell command screen 
1. Player settings (webUI) enhancements to support DNS, SDTV, Schedule ON/OFF, Factory Reset

**Bug fixes**

1. Ad playlist was getting scheduled under group as regular playlist - fixed
1. Smoothening Player startup screens, showing welcome screen & playlist changes
1. show system notice instead of black screen in case of errors or player not registered unless playlist is explicitly stopped (webUI, tvOff)
1. Do not restart background music if already playing
1. Previous image not cleared when Youtube links are loaded
1. Notice template fixed width changed to 100% to fit into all layouts 
2. Simultaneous 2 videos playing - Fixed in 1.4.1

**Image based on Jessie version of Rasbian**

1. Build and install scripts to support both Jessie and Wheezy version of Rasbian



## 1.3.0

*New Features*

1. Duplicate and add the same asset multiple times to a playlist
2. Ability to change the background color of Signage Player under Group Display Settings
3. Introduction of new layouts 2c,2d and 2bp
4. Ability to play full screen Portrait Video 
5. Schedule TV ON and OFF times under Group Display Settings
6. Ability to Control PLayer Playlist locally after Deploy/Group Change at server
7. Sync Pi time to server time in case of NTP non-availability, solves issues related to syncing
8. Introduction of \_\_cpuid\_\_ and \_\_myipaddress\_\_ variables in Ticker messages to display CPU ID and IP address
9. Change in welcome notice format
10. Show the previous image till YouTube link loads
11. Stats for files played changed to make it more scalable
12. Option for not reloading link under Group Display Settings for uzbl browser


*Bug fixes*  

1. When player resolution is changed, overscan parameters used to change - Fixed  
2. Bootup Video to fill the entire screen both in Landscape and Portrait mode  
3. Portrait mode issues   
4. Asset following livestream video used to be skipped - Fixed  



**Server Specific**

*New Features*

1. Increased File Size limit for Upload to 500MB
3. Rename Assets, Playlists and Groups under EDIT mode
4. Duplicate Playlists and Groups
5. Select All/None assets feature for a playlist

*Bug fixes*

1. Issue with Deploy of few files were not downloaded or playlist changes were not reflected - Fixed
2. Refresh the screen after link addition to reflect the addition
3. Custom Video window size used to change after playlist change - Fixed


## 1.2.6(minor, can be skipped)  

1. Fixed the issue of "Crash under certain socket.io error condition"
2. Timeout in case of animation event does not trigger

##1.2.5

1. Issue fixed: if network is unavailable and youtube link is being played, playlist stops
2. Player is unable to upgrade 1.2.4
3. Fixed the issue of player localName being not sent to server

##1.2.4

1. Improved reliability in case of wi-fi networks   
    - restart wi-fi if IP address is not present after every 12 minutes in case of not connected   
    - independent timer to retart network connection after 1 hour of no server connection    

##1.2.3

1. piSignage Player playlist UI fix which was broken in 1.2.2
2. layout check to see if the player supports the layout (needed for future releases)
3. logger error reporting bug


## 1.2.2  

1. Introduced 4 new layouts with main zone at the bottom and banner zone on the top 
(please enable in settings, needs ALL group players at version 1.2.2 or more)  
2. Fixed the issue - Player not getting synced with the new deployment if it was offline while deploying and then came online
3. more robust server communication
4. Fixed the issue - Unable to deploy file named index.html 


## 1.2.1  

1. 12 hour format for Calendar events and format improvements  
2. Enabled Google Calendar support for all installations


## 1.2.0

***Please edit the existing Scheduled Playlist times in Group Tab & Deploy again, otherwise scheduled playlists may not be 
played as per schedule after update***

**New Features & Fixes**

1. Scheduling Playlists 
    - Start and Stop date had to be one day before and after - fixed
    - Increase the number of playlists count to 10 (from 4)
    - More Scheduling features (Day of the Week, Date of the month)
    - More explanations to avoid confusion for the UI
    - Warn if schedule changes are not deployed 
    
2. Show all IP addresses in welcome screen and server players status page
3. wi-fi Connection status and IP
4. Support for Other languages
5. Added French support (Thanks to Gionatan Fazio)
6. Few issues fixed related to Ticker appearing accidentally in the beginning, many switches during playlist change
7. Allow re-registration of the device to change the name without losing license


## 1.1.9  

**New Features**   

1. Player settings enhanced  
    - Ability to change http username/password   
    - Ability to change config/media server   
2. Ticker Enhancements  
    - Vertical alignment of ticker to the middle  
    - Advanced users can add CSS for Ticker   
3. Provision to create new categories in Asset Upload popup  
4. You can add your welcome screen using html or ejs template (e.g. provided in GitHub)  
5. File play logs re-introduced with provision to enable/disable  
6. HTML link and zip file support extended to side & bottom zones  
7. Provision to create custom Video window sizes for advanced users in Layout selection screen  
8. API Support with Token based authentication for server  
9. Ability to delete the account in server  
10. Browser JavaScript code streamlined to reduce node.js communication and div elements  

**Bug fixes** 
   
1. Removed duplicate Ticker set/clear message and start/stop playlists  
2. Welcome screen not showing up when animation enabled - fixed  
3. Added hardware scroll disable flag to enhance browser reliability during startup  

## 1.1.8  
1. After power on Ticker used to appear in some cases even though it was not configured
2. For older browser releases, memory check and reload the URL if memory exceeds certain limit.
3. rss feed non-english character display issue

## 1.1.7  
**New Features**     

1. Fix for timezone issue, set the timezone to that of Browser upon registration,provision for changing in registration and player screens  
2. Change htpasswd to that of settings to protect players access from others  
3. Animation support for transitions in pi 2 onwards hardware  
4. Ticker enhancements  
    - RSS feed support to display upto 10 messages from feed  
    - Support for both Scroll and Slide  
    - Multi line Ticker Message Support 
5. Add Button in Playlists and Group tabs brought outside from EDIT screen to list screen  
6. Test log added for player for testing automation, streamlined player logging with category  
7. Token based authentication for API framework preparation  

**Known issues**  
 
1. Chrome and Android apps currently work with default password for players, upgrade for password change will be soon released.  
2. Set the player timezones for the schedule playlist feature to work properly in Playlist Tab
3. Player needs to reboot for Timezone and password changes to take effect
3. pisignage-server features are yet to be updated for 1.1.7 release  
4. Animation works only pi 2 hardware due to performance requirements  



## 1.1.6
1. Fixed off-line licensing issue


## 1.1.5
1. RTSP support in Add link of assets
2. Delaying server communications till local configuration is done
3. Chrome browser check on power-on

## 1.1.4
1. New release of uzbl from current branch of uzbl repository which fixes a memory leak issue and many improvements
2. Canvas based image display with instant image change (no black screen in between)
3. Support for MP3 files to act as background music for images/html display
4. Free player licenses have been increased to 3 per installation
5. Addition of links from player web interface
6. Removing error "Version mismatch" while deploying from pisignage.com
7. Correction of install.sh so that image can be built on top of Raspbian instead of entire download
8. Fixes for Network settings screen on Console (Ctrl-N)
9. Small fixes

## 1.1.1/1.2.0
1. Audio out in both ports
2. Resolution - 720p HD and 1080p Full HD modes
3. Portrait and Landscape mode
4. Zones Support (1,2 and 3 in various dimensions)
5. Insert Ad playlist in between
6. Android App support with play, pause and stop for playing demo videos
7. Chrome app for discovery, remote and manage
8. HTML repo upload support (.zip file can be uploaded with entry point as index.html)
9. URL support for streaming and displaying in iframe
10.Streaming support (experimental) for video
12. various bug fixes
13. Added Software License feature (auto generation, manual generation, download & check)
14. Keyboard support for configuration of network and admin/content server
15. Configurable admin server and media server (can be separate)
16. Memory leak in uzbl for background image load - removed
17. reconnect after network errors and watchdog to attempt reconnect (if no updates) after 60 minutes

## 1.0.5/1.2.0  
a. added connected and playlist log in dailystats  
b. change playlist only if exists  
c. send message only if Websocket is ready  
d. stop logging of file change event  
e. issue with async nature of connected check in players  
f. report overhaul and addition of monthly reports  
g. convert flv h.264 videos too  
e. bug fixes with upgrade  
f. UI changes for assets/playlists  
g. updated mongoose npm package  
h. Chrome app also supports multiple playlists and report logging   
i. support for Google Calendar  

**Known issues**

a.socket.io error not fully resolved (as per the window below,mcollina/mosca#69 )
b.disk space due to .xsession-errors large size and forever_out.log

## 1.0.4/1.2.0
1. Events, Logs, Files Played reporting to server and Reporting structure 
2. Streamlined updates
3. File system check every power on for robustness
4.TV power on check for CEC supported TVs 
5. IST timezone issue correction
6. bootstrap framework for TV notices
7.moved to ejs templating for faster boot
8.downloading status and stats display on both pi and server
9. support for multiple playlists and scheduling
10. file deletion and playlist change after successful download
11. Audio and background music support
12. video conversions for more formats
13.asset and playlist screen UI changes
14. playlist scheduling moved to group

**Known issues**

- gcal is broken
- PC connection support (1-1): eth0:1 interface acted as default gateway (removed)
- wget failed to resolve pisignage for firmware upgrade
- add exit in upgrade.sh if wget gives error
- downgrade.sh make cp instead of mv from pre directory
- socket.io error appears (as per the window below,mcollina/mosca#69 )
- disk space due to .xsession-errors large size and forever_out.log

## 0.8.9/1.1.0
This release is used as Software for production of first 60 devices. The assembly instructions for the same is given below.

**Assembly**

1. Assemble B+ board inside enclosure and add a plastic blurb to avoid shaking
2. Attach the power supply going to be shipped
3. Get a HDMI cable and Ethernet cable
4. Program a SD card
5. Poweron the device with SD card inserted
6. Note the CPU ID and print a sticker with the same
7. Stick the CPUID sticker and pisignage sticker to the device enclosure
8. Register the device at www.pisignage.com with the name "Unassigned xxxx" (last 4 digits of CPU iD) and group as Factory test
9. Watch the ticker and 2 videos / 1 logo being played
10. Check for last sync time, green circle and software version
11. Sign OK on sticker
12. Put waranty void seal on the SD card and ensure SD card is fastened properly
13. Pack the Ethernet cable, HDMI cable and add a separator
14. Pack the device in a plastic wrapper
15. Wrap the power supply in a plastic wrapper
16. Add the clamp inside the box
17. Seal the box and ensure no shaking of the contents
18. Put a seal and make a entry of the Device ID (Put a sticker of device ID on the box also)

**Known issues**

- Need to work on overscan_scale, framebuffer height and width to map videos and images to full screen
- TV control commands
- Format of empty screen

## 0.8.8/1.1.0

## 0.7.5/1.0.0
First Release of PiSignage

First Production Release of PiSignage images

platform v1.0.0 for Raspberry Pi
v0.7.5 for pi server software
v0.0.1 for central server software

**Known Issues**

If piSignage is not set for installation, it sends "default" installation whereas the server expects "admin". Will not be an issue if Pi is assigned to an installation.

