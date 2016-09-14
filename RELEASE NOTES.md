#Release Notes for piSignage Player image

##1.7.0 Independent playlist support for side/bottom zones, media RSS, open wifi, player level deploy,scheduling enhancements, UI improvements, Volume control 

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
1. Open Wifi network support
1. Support for space characters in wifi name
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
1. Bug fixes under Group Deploy,player Wifi immediate connection, immediate refelction of Group settings upon sync,
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

##1.6.0 Website link support, New Browser release, Custom Layout, Player Snapshots, UI changes, fixes for Ctrl-N issue and Youtube link not playing

***1.6.3 Features and Fixes***

1. When there is a single item playlist with video, video is played in a loop with no loading time (no ad playlists should be present)
2. Bootup video & update software screen videos changed
3. Issues fixed in install scripts related to screenshot, uzbl and wifi interface
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

##1.5.0 CSS Portrait Mode, Group Ticker, TV OFF Playlist & more

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


##1.4.1

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



##1.3.0

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


##1.2.6(minor, can be skipped)  

1. Fixed the issue of "Crash under certain socket.io error condition"
2. Timeout in case of animation event does not trigger

##1.2.5

1. Issue fixed: if network is unavailable and youtube link is being played, playlist stops
2. Player is unable to upgrade 1.2.4
3. Fixed the issue of player localName being not sent to server

##1.2.4

1. Improved reliability in case of wifi networks   
    - restart wifi if IP address is not present after every 12 minutes in case of not connected   
    - independent timer to retart network connection after 1 hour of no server connection    

##1.2.3

1. piSignage Player playlist UI fix which was broken in 1.2.2
2. layout check to see if the player supports the layout (needed for future releases)
3. logger error reporting bug


##1.2.2  

1. Introduced 4 new layouts with main zone at the bottom and banner zone on the top 
(please enable in settings, needs ALL group players at version 1.2.2 or more)  
2. Fixed the issue - Player not getting synced with the new deployment if it was offline while deploying and then came online
3. more robust server communication
4. Fixed the issue - Unable to deploy file named index.html 


##1.2.1  

1. 12 hour format for Calendar events and format improvements  
2. Enabled Google Calendar support for all installations


##1.2.0

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
3. Wifi Connection status and IP
4. Support for Other languages
5. Added French support (Thanks to Gionatan Fazio)
6. Few issues fixed related to Ticker appearing accidentally in the beginning, many switches during playlist change
7. Allow re-registration of the device to change the name without losing license


##1.1.9  

**New Features**   

1. Player settings enhanced  
    - Ability to change http username/password   
    - Ability to change config/media server   
2. Ticker Enhancements  
    - Vertical alignment of ticker to the middle  
    - Advanced users can add CSS for Ticker   
3. Provision to create new categories in Asset Upload popup  
4. You can add your welcome screen using html or ejs template (e.g. provided in github)  
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

##1.1.8  
1. After power on Ticker used to appear in some cases even though it was not configured
2. For older browser releases, memory check and reload the URL if memory exceeds certain limit.
3. rss feed non-english character display issue

##1.1.7  
**New Features**     

1. Fix for timezone issue, set the timezone to that of Browser upon registration,provison for changing in registration and player screens  
2. Change htpasswd to that of settings to protect players access from others  
3. Animation support for transitions in pi 2 onwards hardware  
4. Ticker enhancements  
    - RSS feed support to display upto 10 messages from feed  
    - Support for both Scroll and Slide  
    - Multi line Ticker Message Support 
5. Add Button in Playlists and Group tabs brought outside from EDIT screen to list screen  
6. Testlog added for player for testing automation, streamlined player logging with category  
7. Token based authentication for API framework preparation  

**Known issues**  
 
1. Chrome and Android apps currently work with default password for players, upgrade for password change will be soon released.  
2. Set the player timezones for the schedule playlist feature to work properly in Playlist Tab
3. Player needs to reboot for Timezone and password changes to take effect
3. pisignage-server features are yet to be updated for 1.1.7 release  
4. Animation works only pi 2 hardware due to performance requirements  



##1.1.6
1. Fixed off-line licensing issue


##1.1.5
1. RTSP support in Add link of assets
2. Delaying server communications till local configuration is done
3. Chrome browser check on poweron

##1.1.4
1. New release of uzbl from current branch of uzbl repository which fixes a memory leak issue and many improvements
2. Canvas based image display with instant image change (no black screen in between)
3. Support for MP3 files to act as background music for images/html display
4. Free player licenses have been increased to 3 per installation
5. Addition of links from player web interface
6. Removing error "Version mismatch" while deploying from pisignage.com
7. Correction of install.sh so that image can be built on top of Rasbian instead of entire download
8. Fixes for Network settings screen on Console (Ctrl-N)
9. Small fixes

##1.1.1/1.2.0
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

##1.0.5/1.2.0  
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

##1.0.4/1.2.0
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

##0.8.9/1.1.0
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

##0.8.8/1.1.0

##0.7.5/1.0.0
First Release of PiSignage

First Production Release of PiSignage images

platform v1.0.0 for Raspberry Pi
v0.7.5 for pi server software
v0.0.1 for central server software

**Known Issues**

If piSignage is not set for installation, it sends "default" installation whereas the server expects "admin". Will not be an issue if Pi is assigned to an installation.

