> New!, Prepare your own Local Server for managing players using [open-source server code](https://github.com/ariemtech/pisignage-server)

##What is PiSignage? 

PiSignage is a HD video capable Digital Signage Player based on standard and off-the-shelf 
components. It connects to TV via HDMI port and is powered from any standard USB source(~0.75A). 
It is based on credit-card sized Raspberry Pi computer(Model B/B+/pi2) and completely solid-state. 

PiSignage can be managed individually by a Browser(Chrome preferred) or centrally by a Server or using the hosted 
service at pisignage.com. 

**Deployment is just a few steps.** 
1. Upload images/videos, provide web or streaming links, design and upload HTML assets as a zip file
2. Create playlists by selecting files, drag and rearrange, select duration. You can select one of the 8 layouts 
    provided for playlist, add a ticker feed and insert contents of playlists in between other playlist(advertisement)
3. Group players, schedule multiple playlists based on time or events and change display settings. Deploy playlists at the 
    click of a button to all the players in the group
4. Get status and reports about player, upgrade software centrally to all players, issue debug commands from the server.

**Android and Chrome apps for more functions**
- Discover players in the local network and manage individually
- Browse the content and present individual video or a slideshow

Please visit [pisignage.com](http://pisignage.com) to know more about features and benefits.

##Getting the Player ready

There are 2 ways you can get the piSignage Player Software.

###Download image and Prepare the SD card[](#basic)

[Download Documentation](https://s3.amazonaws.com/pisignage/pisignage-images/Basic_install.pdf)

You can get a fresh 8GB or more class 10 micro-SD card and burn the image to it as follows.

1. **[Download](https://s3.amazonaws.com/pisignage/pisignage-images/pisignage_1.1.5.img.zip)** the complete piSignage player image 

2. Unzip the file 

3. Burn the image to a minimum 8GB class 10 SD card using one of the following options
  
  - **Linux**
Use [ Image Writer ] (https://apps.ubuntu.com/cat/applications/precise/usb-imagewriter/)
  
  - **For MAC**
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

4. Insert the programmed SD card to pi and power ON.

5. Register your player with player id at www.pisignage.com to manage from the cloud.

***Get in touch with us at support@pisignage.com for any assistance or to order prebuilt pisignage image SD card.*** 

###Install piSignage Software using install.sh on top of Raspbian [](#advanced)
If you have a Raspberry Pi running latest Raspbian OS, you can install piSignage software using the following steps.  

A.Connect keyboard and mouse to pi.

B.Use raspi-config for configuration and do the following
  1. Change User password for default User(pi) and chose password as "pi"
  2. Enable Boot to Desktop/Scratch and select "Boot to Desktop"
  3. Select Advanced Options and Enable SSH
  4. Expand the File System
  5. Save and Reboot the pi

C.Install piSignage Software by doing the following.
  1. Open Terminal app either by clicking the icon or from the Menu->Accessories-Terminal
  2. Make sure network is connected (Ethernet Cable or wifi)
  3. Issue the following commands on local terminal
```sh
 wget http://pisignage.com/releases/pi-image.zip

 unzip pi-image.zip

 mv piImage piSignagePro

 cd piSignagePro/misc

 . install.sh 2>&1 | tee /home/pi/install.log
```
#### take a coffee break ...
#### Next steps
1. Boot your pi-player
2. Signup on www.pisignage.com
3. Register the player id from player screen
4. Upload assets
5. Create playlist
6. Assign the playlist and Deploy it to groups
 

###More Resources
1. To locally discover and manage piSignage players use [chrome-app](https://chrome.google.com/webstore/detail/pisignage-discovery-remot/fngfhanhnojhlclbokgllbejdhnajedo)
2. To control the player using smartphone, download pisingage [android-app](https://play.google.com/store/apps/details?id=com.ariemtech.pisignage) 
3. To manage players using your own local Server use [piSignage open-source server code](https://github.com/ariemtech/pisignage-server)

###FAQ
[Refer our WiKi for more information and FAQ](https://github.com/ariemtech/piSignage/wiki) 

###Issues?
Raise your [issues here.](https://github.com/ariemtech/piSignage/issues) 



