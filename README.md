##![](https://dl.dropboxusercontent.com/u/166564018/banner%20large.png) PiSignage-Smartphone controlled Digital Signage
________
#### New!!! 
***Manage your players using Local Server, More Details at https://github.com/ariemtech/pisignage-server***

#### Platform Image [ [Download](https://s3.amazonaws.com/pisignage/pisignage-images/pisignage_1.1.4.img.zip) ]
#### Documentation [ [Download](https://s3.amazonaws.com/pisignage/pisignage-images/Basic_install.pdf) ]

##[Basic Setup (Recommended)](#basic)

To use pisignage,

1. **[Download](https://s3.amazonaws.com/pisignage/pisignage-images/pisignage_1.1.4.img.zip)** the pisignagepro platform image 

2. Unzip the image, Burn the image to SD card as explained in below steps
  
  - ####For Linux
Install [ Image Writer ] (https://apps.ubuntu.com/cat/applications/precise/usb-imagewriter/)
  
  - ####For MAC
Download [Apple pi Baker](http://www.tweaking4all.com/hardware/raspberry-pi/macosx-apple-pi-baker/)
    Or use
    diskutil list and find out your sd card to be programmed.
 
    ```
    $ sudo dd bs=1m if=pisignage_1.1.4.img of=/dev/rdiskX   
    ```
  
  - ####For Windows
Use [Win32DiskImager](http://sourceforge.net/projects/win32diskimager/) utility in administator mode to bake the   image to sd card.

  - #### More Info on image Installation refer following link 
[Installing Pi Images](http://www.raspberrypi.org/documentation/installation/installing-images/README.md)

3. Once the above procedure complete, Insert SD card to pi and power ON.

4. Register your player-id on www.pisignage.com to deploy contents from cloud.

Get in touch with us at info@pisignage.com, if you need any assistance. Refer  [document on Basic setup](https://s3.amazonaws.com/pisignage/pisignage-images/Basic_install.pdf) for more details.

#### If you want prebuilt pisignage image, email us to order an 8GB/16GB micro SD card with low profile adaptor. 

## [Advanced Setup] (#advanced)
We recommend using basic setup. For "advanced" users with raspbian SD card, refer following instructions. In case of difficulty do get in touch with us.  

A.Connect keyboard and mouse to pi.

B.Use raspi-config for configuration and do the following
  1. Change User password for default User(pi) and chose password as "pi"
  2. Enable Boot to Desktop/Scratch and select "Boot to Desktop"
  3. Select Advanced Options and Enable SSH
  4. Expand the File System
  5. Save and Reboot the pi

C.Install piSignage Software by doing the following.
  1. Open Terminal app either by clicking the icon or from the Menu->Accessories-Terminal
  2. Issue the following commands on local terminal (DO NOT do this from ssh as it may timeout)
  3. Make sure network is connected (Ethernet Cable or wifi)
```sh
 wget http://pisignage.com/releases/pi-image.zip

 unzip pi-image.zip

 mv piImage piSignagePro

 cd piSignagePro/misc

 . install.sh 2>&1 | tee /home/pi/install.log
```
#### take a coffee break ...
#### Next steps.
1. Boot your pi-player
2. Signup on www.pisignage.com
3. Register the player id from player screen.
4. Upload assets
5. Create playlist
6. Assign the playlist and Deploy it to groups.
7. To locally manage the pi players using smartphone, download pisingage [android-app](https://play.google.com/store/apps/details?id=com.ariemtech.pisignage) 
8. Pi-Players, can be managed using [chrome-app](https://chrome.google.com/webstore/detail/pisignage-discovery-remot/fngfhanhnojhlclbokgllbejdhnajedo) too

### FAQ
[Refer our WiKi for more information and FAQ](https://github.com/ariemtech/piSignage/wiki) 
### Issues?
Raise your [issues here.](https://github.com/ariemtech/piSignage/issues) 

________
###What is PiSignage? 

PiSignage is a HD capable Digital Signage Player based on standard and off-the-shelf 
components. It connects to TV via HDMI port and can even turn on/off your TV! 
PiSignage is powered from any standard USB source. It is based on credit-card sized 
Raspberry Pi computer(Model B/B+/pi2) and completely solid-state. 

PiSignage can be controlled by connecting it directly to your Smartphone, or over a local 
wi-fi network from any Browser or by a Central server. 

Deployment is just a few steps. Upload pictures/videos from your smartphone, sync files 
from the central server, create notices from the available templates or even source content 
from your Social feeds! Control the order of play by simple drag and rearrange and 
optionally configure the duration of each asset. 

PiSignage decides what to play next based on the files present in the player and the playlist 
configuration. Hence it is very versatile to manage! Software can be remotely upgraded 
and has built-in features for resiliency. 

To control large number of players, create groups and assign players. Deploy playlists to 
groups. PiSignage will automatically sync and start playing the new content. You can still 
micro-manage individual players using Smartphone or Browser.

Interested? please drop an email to info@pisignage.com to know more.

### Benefits of PiSignage 
#### Affordable, Intelligent 
- HD capable Player based on off-the-shelf Raspberry Pi , a credit-card sized computer
- 100% Solid-state, low foot-print, USB powered - Modular Software built upon state-of-the-art mobile, server and sync technologies 
- Resilient Software decides what to play next based on content and playlist settings, auto upgrade, preserves 
state after power recycles 

#### Control from your Smartphone or any Browser 
- Multiple options for connectivity - Direct USB, Ethernet, Wi-Fi or over Internet from Server 
- Upload videos/images, Create notices and Edit Playlists from your mobile or browser 
- Configure and monitor PiSignage at feature level, turn on/off TV 

#### Create Content with ease 
- Upload videos/images from your phone or browser - Create Notices and Messages with the available templates 
- Sync Content from Central Servers, PiSignage seamlessly syncs content across Networks and Locations 
- Create feeds from your Social channels, web resources, Enterprise Servers or even Google Calendars




#### Get in Touch @ info@pisignage.com or raise an issue


