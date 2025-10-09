## What is PiSignage? 

PiSignage is a very popular Digital Signage Solution primarily used along with Raspberry Pi boards (but can also 
work on other Linux based hardware platforms,for e.g. Intel NUC, see [here](https://pisignage.com/releases/Player2_installation_procedure.html)). 
In addition, piSignage is also available on [Android devices](https://play.google.com/store/apps/details?id=com.pisignage.player2&hl=en&gl=US) and as an [web 
app](https://pisignage.com/player2/)  

All Raspberry Pi models are supported (please use specific image for the various models as mentioned [below](https://github.com/colloqi/piSignage#getting-the-player-ready)).

Raspberry Pi connects to TV through HDMI interface and needs network connectivity to reach pisignage.com or any 
other piSignage server locally configured. 

PiSignage players can be managed centrally using managed services at [pisignage.com](https://pisignage.com) or using a 
separate server using [open sourced server software](https://github.com/colloqi/pisignage-server) or independently using player webUI (http://player-ip:8000).   

**Managing Screens is just a few steps**
 
1. **Upload images/videos**, provide web or streaming links, design and upload HTML assets as a zip file  
2. **Create playlists** by selecting one of the built-in layouts or custom layouts created using the template designer,
   add assets(drag and rearrange for the desired order), enter duration of play for each asset. You can also add a ticker feed and 
   define special playlists for adverts insertion, domination content, lounge music and content play based on events  
3. **Create Groups and assign players** to a group which needs to play the same playlists. Then you can assign and schedule multiple 
    playlists to a group. You can also define display settings, schedule TV on/off and other properties of the group. 
   Whenever ready, Deploy playlists at the 
    click of a button to all the players in the group.  
4. You can **centrally monitor the players** in the dashboard/player screens,view current snapshot of TV, get reports, update software 
    and also issue debug piShell commands.  

**More functions and utilities**

1. You can play/pause playlists, play individual assets from both player and server UIs.
2. Players can operate in kiosk mode pointing to the URL provided and play normal playlists when no key is pressed.
3. Autoconfiguration of players and many such features for bulk management of players.

Please visit [pisignage.com](https://www.pisignage.com) to know more about features and benefits.

## Getting the Player ready
  
  
*Note: By downloading and using piSignage Player software, you agree to our [Terms of Service](https://s3.amazonaws.com/pisignage/legal/piSignage-TOS.html)*  
  
There are 2 ways you can get the piSignage Player Software

<a id="basic"></a>
### Method 1: Download image and Prepare the SD card (minimum 16GB, class 10 or above)

  [Watch a video on how to setup the Raspberry Pi as piSignage player](https://youtu.be/Ky7uGwc7pdY?si=dUUF4UMV3r1Uj0PW) 

#### 1. Download the complete player iso image  

##### For all Raspberry Pi models **except** Pi Zero (including 0W, 02W),Pi 1,Pi 2  
   - [Version 5.3.2](https://pisignage.s3.us-east-1.amazonaws.com/pisignage-images/pisignage_5.3.2-64bit.img.zip) 
     (based on 64bit Raspberry  OS released on Nov 2024) or 
      [Gdrive link](https://drive.google.com/file/d/1gLutfgVIsxL12GpznRhX3q_aQQAOCNqf/view?usp=drive_link) 

*For Raspberry Pi 3, consider 3.2.9 as chromium-browser slows down on 1GB*

##### For Raspberry Pi Zero (including 0W, 02W),1,2
   - [Version 5.3.2](https://pisignage.s3.us-east-1.amazonaws.com/pisignage-images/pisignage_5.3.2_32bit_nodearmv6.img.zip) (based on 32bit Raspberry  OS released on Nov 2024 with armv6-nodejs)
 or [Gdrive link](https://drive.google.com/file/d/1kQnsmYkRcxLZtfF-ipfRjLW0KHk-kQhR/view?usp=drive_link)

*Please see [known issues](https://help.pisignage.com/hc/en-us/articles/26593998005785) for version 5.x.x*

##### Other images based on older Raspberry OS versions
   - Our recommended version for Raspberry Pi 3 & Pi 4 1GB model even today!, uses propreitory omxplayer to display 
     video   
    [3.2.9 based on Raspberry Buster OS ](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_3.2.9.img.zip)
   or [3.2.9 Gdrive link](https://drive.google.com/file/d/1LlM0DHkmS2YLwTkemZocCvcdxi0c8PTZ/view?usp=sharing) 
   - [Version 5.1.0_legacy(also called 4.9.0 earlier)](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_5.1.0-legacy.img.zip)
     Based on 32bit Raspberry  Legacy OS(X) released on Dec 2023 and uses X windows as display manager.
   - [3.2.9-armv6 image for Pi 0/0W/1/2](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_3.2.9-armv6.img.zip)
   - [4.9.0 image for Radxa Rock 4C+ ONLY](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_4.9.0_rock4Cplus.img.gz)  

#### 2. Program the downloaded image to a SD card (*Simple copy-paste of the file into the SD card will not work!*)
   Use application such as 
   - [Raspberry Pi Imager](https://www.raspberrypi.com/software/),use custom option for 
OS and *do not use additional customizations like ssh, wifi, autologin etc., it will beconfigured by piSignage* 
   - or [balena Etcher](https://www.balena.io/etcher/)  

#### 3. Insert the programmed SD card into the Raspberry Pi and power ON.

#### 4. Register your player with player id at [pisignage.com](https://pisignage.com/players) to manage from the cloud.

#### 5. Get in touch with us at support@pisignage.com for any assistance. 

<a id="advanced"></a>
### Method 2: Manual installation on top of Raspbian OS/Debian/Ubuntu variants

You could install player2 on top of standard Raspberry OS or Debian/Ubuntu OS for other platforms yourselves. 
  - [Please click this link for instructions on how to install](https://pisignage.com/releases/Player2_installation_procedure.html). 

### More Resources

1. To manage players using your own local Server use [piSignage open-source server code](https://github.com/colloqi/pisignage-server)
2. To experience piSignage player in the browser, you could load [webapp](https://pisignage.com/player2/) in browser

### Android app
We encourage you to download the Android app for piSignage from Google Play Store. [Download link](https://play.google.com/store/apps/details?id=com.pisignage.player2&hl=en&gl=US)

But you need APK for some reason you can download from here [4.9.4.3](https://drive.google.com/file/d/18fIyejeg8_a6QmcOD4_u5dD4k_pw_4XF/view?usp=sharing)

### Visit our piSignage channel in YouTube for more videos
 
[Overview of piSignage](https://www.youtube.com/channel/UCyeItfgq72JUtzkQgcxYkKg)

### Few Points to remember

- Default Username & Password: use pi & pi 
- Player webUI: http://player-ip:8000
- Ctrl+N or F6: for network/server config from USB keyboard
- Ctrl+Alt+T or F2 for terminal

### SUPPORT

Refer [piSignage support page](https://help.pisignage.com/hc/en-us)

### Issues?

Raise your [issues here](https://www.pisignage.com/homepage/contact.html) or write to us at support@pisignage.com. 





