## What is PiSignage? 

PiSignage is a HD video capable Digital Signage Player based on standard and off-the-shelf 
components. It connects to TV via HDMI port and is powered from any standard USB source (~0.75A). 
It is based on credit-card sized Raspberry Pi computer(Model B/B+/pi2) and completely solid-state. 

PiSignage can be managed individually by a Browser(Chrome preferred) or centrally by a Server or using the hosted 
service at pisignage.com. 

**Managing Screens is just a few steps**
 
1. Upload images/videos, provide web or streaming links, design and upload HTML assets as a zip file
2. Create playlists by selecting files, drag and rearrange, select duration. You can select one of the 8 layouts 
    provided for playlist, add a ticker feed and insert contents of playlists in between other playlist(advertisement)
3. Group players, schedule multiple playlists based on time or events and change display settings. Deploy playlists at the 
    click of a button to all the players in the group
4. Get status and reports about player, upgrade software centrally to all players, issue debug commands from the server.

**Android and Chrome apps for more functions**

- Discover players in the local network and manage individually
- Browse the content and present individual video or a slideshow

Please visit [pisignage.com](https://www.pisignage.com) to know more about features and benefits.

## Getting the Player ready
  
  
***Note: By downloading and using piSignage Player software, you agree to our [Terms Of Service](https://s3.amazonaws.com/pisignage/legal/piSignage-TOS.html)***  
  
  
    
There are 2 ways you can get the piSignage Player Software (Pi 3 is supported)

<a id="basic"></a>
### Method 1: Download image and Prepare the SD card

[Download PDF Guide](https://s3.amazonaws.com/pisignage/pisignage-images/Basic_install.pdf)

You can get a fresh 8GB or more class 10 micro-SD card and burn the image to it as follows.

1. Download the complete piSignage player iso image, both support pi 3B+ (please unzip and program the SD card)
    -  **[ 2.4.1 based on april 2019 raspbian os ](https://s3.amazonaws.com/pisignage/pisignage-images/pisignage_2.4.1.img.zip)**
        -   [GDrive link for 2.4.1](https://drive.google.com/open?id=1auC4LcO-z9md4XtdfXOiDS-atF3jZYkd)
    -  **[Raspberry Pi 4 support (2.7.1) based on Feb 2020 buster rasbian os ](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_2.7.1.img.zip)**
        -  [Gdrive link for 2.7.1](https://drive.google.com/file/d/1Z5z1Huh6hHW20A46_cgrNgTWVcCLoChy/view?usp=sharing)
        -  Notes for Pi 4:   
            - **4K support** Although Pi 4 and piSignage support 4K resolution, omxplayer and current mpv players only support H.264 hardware decoding which is limited
            to 1080p video. Only **H.265 (HEVC) videos** can be hardware decoded upto 4K resolutions in Pi GPU and currently is **not** supported by these two players  
            - **Second HDMI display** is not supported
            - Under Group settings, selection of landscape mode is recommended,  Under portrait modes auto mode resolution
            defaults to 1080x1920 & GPL driver gets changed to legacy
         

2. Unzip the file 

3. Burn the image to a minimum 8GB class 10 SD card using one of the following options
  
  - **For Linux**

    Use [ Image Writer ] (https://apps.ubuntu.com/cat/applications/precise/usb-imagewriter/)
  
  - **For Mac**

    Use [Apple pi Baker](http://www.tweaking4all.com/hardware/raspberry-pi/macosx-apple-pi-baker/)

    Or 

    Find out your sd card to be programmed using `diskutil list` and program using the following command.
 
    ```
    $ sudo dd bs=1m if=pisignage_1.1.5.img of=/dev/rdiskX   
    ```
  
  - **For Windows**
    
    Use [Win32DiskImager](http://sourceforge.net/projects/win32diskimager/) utility in administator mode.

  - **More Info on image Installation refer to** 
    
    [Installing Pi Images](http://www.raspberrypi.org/documentation/installation/installing-images/README.md)

4. Insert the programmed SD card into the Raspberry Pi and power ON.

5. Register your player with player id at www.pisignage.com to manage from the cloud.

***Get in touch with us at support@pisignage.com for any assistance or to order prebuilt piSignage image SD card.*** 

<a id="advanced"></a>
### Method 2: Install on top of latest Raspbian OS

*We have discontinued this method of installation, please use the piSignage image to prepare the SD card. If 
you have specific requirements to install piSignage image on top of your OS, 
please contact us at support@pisignage.com*

### More Resources

1. To locally discover and manage piSignage players use [chrome-app](https://chrome.google.com/webstore/detail/pisignage-discovery-remot/fngfhanhnojhlclbokgllbejdhnajedo)
2. To control the player using smartphone, download pisignage [android-app](https://play.google.com/store/apps/details?id=com.pisignage.pisignageremote)
3. To manage players using your own local Server use [piSignage open-source server code](https://github.com/colloqi/pisignage-server)
4. To experience piSignage player in the browser, you can download chrome app from [Chrome store](https://chrome.google.com/webstore/detail/pisignage-on-chrome/jakohoehdiplfomnmgpmolbelplkgnpa)

## Installing piSignage video 
 
[![Installing piSignage Video](http://img.youtube.com/vi/0o5cSq3Lwcg/0.jpg)](https://www.youtube.com/channel/UCyeItfgq72JUtzkQgcxYkKg)

### Keyboard Shortcuts 

1. Use Ctrl-T to go to terminal when piSignage is running
2. Use F6 or Ctrl-N to configure Network settings and config/media servers

### Default Username & Password

1. use pi & pi 
2. Change the username and password for http login in file ~piSignagePro/htpasswd


### FAQ

Refer [piSignage support page](https://www.pisignage.com/homepage/support.html)

### Issues?

Raise your [issues here.](https://github.com/colloqi/piSignage/issues) or write to us at support@pisignage.com. 





