## What is PiSignage? 

PiSignage is a very popular Digital Signage Solution primarily used along with Raspberry Pi boards (but can also 
work on other Linux based hardware platforms,for e.g. Intel NUC, see [here](https://pisignage.com/releases/Player2_installation_procedure.html)). 
In addition, piSignage is also available on [Android devices](https://play.google.com/store/apps/details?id=com.pisignage.player2&hl=en&gl=US) and as an [web 
app](https://pisignage.com/player2)  

All Raspberry Pi models are supported (please use specific image for the various models as mentioned below).

Raspberry Pi connects to TV through HDMI interface and needs network connectivity to reach pisignage.com or any 
other piSignage server locally configured. 

PiSignage players can be managed centrally using managed services at [pisignage.com](https://pisignage.com) or using a 
separate server using [open sourced server software](https://github.com/colloqi/pisignage-server) or independently using player webUI (http://player-ip:8000).   

**Managing Screens is just a few steps**
 
1. Upload images/videos, provide web or streaming links, design and upload HTML assets as a zip file  
2. Create playlists by selecting one of the built-in layouts or custom layouts created using the template designer,
   add assets(drag and rearrange for the desired order), enter duration of play for each asset. You can also add a ticker feed and 
   define special playlists for adverts insertion, domination content, lounge music and content play based on events  
3. Create Groups and assign players to a group which needs to play the same playlists. Then you can assign and schedule multiple 
    playlists to a group. You can also define display settings, schedule TV on/off and other properties of the group. 
   Whenever ready, Deploy playlists at the 
    click of a button to all the players in the group.  
4. You can centrally monitor the players in the dashboard/player screens,view current snapshot of TV, get reports, update software 
    and also issue debug piShell commands.  

**More functions and utilities**

1. You can play/pause playlists, play individual assets from both player and server UIs.
2. Players can operate in kiosk mode pointing to the URL provided and play normal playlists when no key is pressed.
3. Autoconfiguration of players and many such features for bulk management of players.

Please visit [pisignage.com](https://www.pisignage.com) to know more about features and benefits.

## Getting the Player ready
  
  
*Note: By downloading and using piSignage Player software, you agree to our [Terms Of Service](https://s3.amazonaws.com/pisignage/legal/piSignage-TOS.html)*  
  
There are 2 ways you can get the piSignage Player Software

<a id="basic"></a>
### Method 1: Download image and Prepare the SD card (minimum 16GB, class 10 or above)

[Download PDF Guide](https://s3.amazonaws.com/pisignage/pisignage-images/Basic_install.pdf) (little outdated)

1. Download the complete player iso image     
   - For **Raspberry Pi model 5 and model 4**, use [5.0.1 based on Dec 2023 Debian Bookworm Raspberry OS](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_5.0.1.img.zip) or
      [5.0.1 Gdrive link](https://drive.google.com/file/d/1JuKgC46KhMNlIDILXavgeFVotK1flZoe/view?usp=sharing)
        - OS is based on new [wayland architecture](https://www.raspberrypi.com/news/bookworm-the-new-version-of-raspberry-pi-os/), please see [known issues](https://help.pisignage.com/hc/en-us/articles/26593998005785) and alternatives if it effects you.
        - Legacy release is available at [4.9.0 based on Feb 2023 Raspberry OS release](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_4.9.0.img.zip) or
          use [4.9.0 Gdrive link](https://drive.google.com/file/d/1T1MMtd_3VvT42e-1yiXeeuVDYFDbBCHh/view?usp=share_link)

   - For **Raspberry Pi model 3 and model Pi Zero 2 W**, use [3.2.0 based on Raspberry Buster OS ](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_3.2.0.img.zip) or [3.2.0 Gdrive link](https://drive.google.com/file/d/1MEKYzg3fJ6LZzeKthv_6DKuhlA0vICfb/view?usp=sharing) 

   - For **Pi Zero/Pi 1/Compute-Model-1/Pi 2**, [use 2.9.7 image](https://drive.google.com/file/d/1w3xcL0xFHU486bzzriImTuiwg9NHjudq/view?usp=sharing)
   
   - For **[Radxa Rock 4C+ ONLY](https://za.rs-online.com/web/p/rock-sbc-boards/2493158) use ** [4.9.0 image](https://pisignage.s3.amazonaws.com/pisignage-images/pisignage_4.9.0_rock4Cplus.img.gz)


2. Use an application such as [Raspberry Pi Imager](https://www.raspberrypi.com/software/)(use custom option for OS) 
   or [balena Etcher](https://www.balena.io/etcher/) to program the downloaded image to a SD card. 
   - *Simple copy file will not work.*
  
3. Insert the programmed SD card into the Raspberry Pi and power ON.

4. Register your player with player id at www.pisignage.com to manage from the cloud.

5. Get in touch with us at support@pisignage.com for any assistance or to order prebuilt piSignage image SD card. 

<a id="advanced"></a>
### Method 2: Mainual install on top of Raspbian OS/Debian/Ubuntu variants

You could install player2 on top of standard Raspberry OS or Debian/Ubuntu OS for other platforms yourselves. 
  - [Please click this link for instructions on how to install](https://pisignage.com/releases/Player2_installation_procedure.html). 

### More Resources

1. To manage players using your own local Server use [piSignage open-source server code](https://github.com/colloqi/pisignage-server)
2. To experience piSignage player in the browser, you could load https://pisignage.com/getplayer in chromium browser

## Installing piSignage video 
 
[![Installing piSignage Video](http://img.youtube.com/vi/0o5cSq3Lwcg/0.jpg)](https://www.youtube.com/channel/UCyeItfgq72JUtzkQgcxYkKg)

### Few Points to remember

- Default Username & Password: use pi & pi 
- Player webUI: http://player-ip:8000
- Ctrl+N or F6: for network/server config from USB keyboard
- Ctrl+Alt+T or F2 for terminal

### SUPPORT

Refer [piSignage support page](https://help.pisignage.com/hc/en-us)

### Issues?

Raise your [issues here](https://www.pisignage.com/homepage/contact.html) or write to us at support@pisignage.com. 





