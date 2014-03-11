piSignage
========

Smartphone controlled Digital Signage


Features:
* Administer and Upload content using Smartphone or any Browser (USB or wifi)
* Create and display messages instantly
* Ability to create multiple playlists and schedule
* Reports showing TV usage, file play & upload stats, log messages, screenshots
* Internet is not necessary
* Uses off-the-shelf Raspberry Pi hardware, small footprint, uses any phone charger for power
* HDMI and HD capability
* Capability to expand for centrally controlled signage solutions over Internet
 

Interested? please drop an email to info@ariemtech.com to know more.

===================****basic setup for UZBL full screen****==============================

Open /boot/config.txt file and set the following parameter and uncomment the parameters
overscan_left=-8
overscan_right=-8
overscan_top=-24
overscan_bottom=-24

reboot the system

Open ~/.config/openbox/lxde-rc.xml and append following lines to the <applications> </applications> section
<applications>
    <application name="uzbl*">
        <fullscreen>yes</fulscreen>
    </application>
</applications>

reboot the system