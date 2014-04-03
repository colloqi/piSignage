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

#basic setup 

Install the Model B raspberry Pi with Raspbian wheezy.

Download latest raspbian image and unzip it.
http://downloads.raspberrypi.org/raspbian_latest
Imtiyajs-MacBook-Pro:Desktop imtiyaj$ diskutil list

diskutil unmountDisk /dev/disk1
(WARNING!!! Make sure that the disk1 is the one which is SD card to be programmed"

go to directory with raspbian*.img

sudo dd bs=4m if=2014-01-07-wheezy-raspbian.img of=/dev/disk1

while booting configure the raspi-config file 

* set Expand root partition to fill SD card
* set the username & password to '**pi**'
* set boot_behaviour to 'Start desktop on boot'
* enable SSH
* memory split 128 for gpu

press '**Finish**'

##piSignage installation

In desktop mode open the Terminal and insert following command one by one

sudo apt-get -y install git-core

git clone git://github.com/ariemtech/piSignage.git ~/piSignage

cd ~/piSignage/client/misc

. install.sh


