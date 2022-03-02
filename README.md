## What is PiSignage? 

PiSignage is a very popular Digital Signage Player Software primarily for Raspberry Pi boards and *now* supports other Debian based 
hardware platforms as well. 

All Raspberry Pi models are supported (please use specific image for Raspberry Pi zero and zero w models).

Raspberry Pi connects to TV through HDMI interface and runs on a standard USB power supply. 

The new player2 software (v4.x.x onwards) supports mainly Raspberry Pi and also other platforms based on Debian/Ubuntu (for e.g. Intel NUC).

PiSignage players can be managed centrally using managed services at pisignage.com or using a separate server using [open sourced server 
software](https://github.com/colloqi/pisignage-server) or independently using player webUI (http://player-ip:8000).   

**Managing Screens is just a few steps**
 
1. Upload images/videos, provide web or streaming links, design and upload HTML assets as a zip file  
2. Create playlists by selecting one of the built-in layouts or custom layouts created using the template designer,
   add assets(drag and rearrange for the desired order), enter duration of play for each asset. You can also add a ticker feed and 
   define special playlists for adverts insertion, domination content, lounge music and comtent play based on events  
3. Create Groups and assign players to a group which needs to play the same playlists. Then you can assign and schedule multiple 
    playlists to a group. You can also define display settings and other properties of the group. Whenever ready, Deploy playlists at the 
    click of a button to all the players in the group.  
4. You can centrally monitor the players in the dashboard/player screens,view current snapshot of TV, get reports, update software 
    and also issue debug piShell commands.  

**More functions and utilities**

1. You can play/pause playlists, play individual assets from both player and server UIs.
2. Players can operate in kiosk mode pointing to the URL provided and play normal playlists when no key is pressed.
3. Auto configuration of players and mmany such features for bulk management of players.

Please visit [pisignage.com](https://www.pisignage.com) to know more about features and benefits.

## Getting the Player ready
  
  
*Note: By downloading and using piSignage Player software, you agree to our [Terms Of Service](https://s3.amazonaws.com/pisignage/legal/piSignage-TOS.html)*  
  
There are 2 ways you can get the piSignage Player Software

<a id="basic"></a>
### Method 1: Download image and Prepare the SD card

[Download PDF Guide](https://s3.amazonaws.com/pisignage/pisignage-images/Basic_install.pdf)

You can get a fresh 8GB or more class 10 micro-SD card and burn the image to it as follows.

1. Download the complete piSignage player iso image    
   A. Recommended Original Player Software    
       - **[Raspberry Pi Models 2/3/4/Compute Model support (3.0.4) based on May 2021 Raspberry Pi OS ](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_3.0.4.img.zip)**   
           -  [Gdrive link for 3.0.4](https://drive.google.com/file/d/1TjvcVLIE0eBag2RM9PV4JWZMUFLQoAXs/view?usp=sharing)  
       - [For Pi Zero/Pi 1/Compute-Model-1, 2.9.7 image is available here](https://drive.google.com/file/d/1w3xcL0xFHU486bzzriImTuiwg9NHjudq/view?usp=sharing)  
       - **[ 2.4.1 based on april 2019 raspbian os, does NOT work with Pi 4 ](https://s3.amazonaws.com/pisignage/pisignage-images/pisignage_2.4.1.img.zip)**  
            - [GDrive link for 2.4.1](https://drive.google.com/open?id=1auC4LcO-z9md4XtdfXOiDS-atF3jZYkd)


   B. Player2 Software which is a brand new player code base - Supports latest releases of Rasbian OS (bulls eye, Jan 2022 release) and new architecture,
   Raspberry Pi 4 recommended
      - **[4.6.0 based on Jan 2022 Raspbian OS release](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_4.6.0.img.zip)**
           -  [Gdrive link for 4.6.0](https://drive.google.com/file/d/1TjvcVLIE0eBag2RM9PV4JWZMUFLQoAXs/view?usp=sharing)
   
3. Use a standard program such as [Raspberry Pi Imager](https://www.raspberrypi.com/software/), [balena Etcher](https://www.balena.io/etcher/) to program
    the image to a SD card(minimum 8GB and of speed class 10). *Simple copy file will not work.*
  
4. Insert the programmed SD card into the Raspberry Pi and power ON.

5. Register your player with player id at www.pisignage.com to manage from the cloud.

***Get in touch with us at support@pisignage.com for any assistance or to order prebuilt piSignage image SD card.*** 

<a id="advanced"></a>
### Method 2: Install on top of latest Raspbian OS or Debian/Ubuntu variant for other platforms

You could install player2 on top of standard RAspberry OS or Debian OS for other platforms yourselves. The instructions 
on how to install are given [here](https://pisignage.com/releases/Player2_installation_procedure.html). 

### More Resources

1. To manage players using your own local Server use [piSignage open-source server code](https://github.com/colloqi/pisignage-server)
2. To experience piSignage player in the browser, you could load https://pisignage.com/getplayer in chromium browser

## Installing piSignage video 
 
[![Installing piSignage Video](http://img.youtube.com/vi/0o5cSq3Lwcg/0.jpg)](https://www.youtube.com/channel/UCyeItfgq72JUtzkQgcxYkKg)

### Keyboard Shortcuts 

1. Use Ctrl-T to go to terminal when piSignage is running
2. Use F6 or Ctrl-N to configure Network settings and config/media servers

### Default Username & Password

- use pi & pi 

### FAQ

Refer [piSignage support page](https://help.pisignage.com/hc/en-us)

### Issues?

Raise your [issues here.](https://github.com/colloqi/piSignage/issues) or write to us at support@pisignage.com. 





