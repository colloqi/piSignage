#!/bin/bash

echo "Installing PiSignage"


echo "Updating/Upgrading system packages"
sudo apt-get -qq update
sudo apt-get -y -qq upgrade

echo "Installing dependencies..."
sudo apt-get -y install git-core  uzbl omxplayer x11-xserver-utils chkconfig unclutter watchdog

echo "Increasing swap space to 500MB..."
echo "CONF_SWAPSIZE=500" > ~/dphys-swapfile
sudo cp /etc/dphys-swapfile /etc/dphys-swapfile.bak
sudo mv ~/dphys-swapfile /etc/dphys-swapfile


echo "Adding pisignage auto startup"
cp ~/piSignage/misc/start.sh ~/
sudo mv /etc/xdg/lxsession/LXDE/autostart /etc/xdg/lxsession/LXDE/autostart.bak
sudo cp ~/piSignage/misc/autostart /etc/xdg/lxsession/LXDE/


echo "Making modifications to X..."
#[ -f ~/.gtkrc-2.0 ] && rm -f ~/.gtkrc-2.0
# Do we need this ????
#ln -s ~/piSignage/misc/gtkrc-2.0 ~/.gtkrc-2.0

[ -f ~/.config/openbox/lxde-rc.xml ] && mv ~/.config/openbox/lxde-rc.xml ~/.config/openbox/lxde-rc.xml.bak
[ -d ~/.config/openbox ] || mkdir -p ~/.config/openbox
ln -s ~/piSignage/misc/lxde-rc.xml ~/.config/openbox/lxde-rc.xml
[ -f ~/.config/lxpanel/LXDE/panels/panel ] && mv ~/.config/lxpanel/LXDE/panels/panel ~/.config/lxpanel/LXDE/panels/panel.bak
sudo sed -e 's/^#xserver-command=X$/xserver-command=X -nocursor/g' -i /etc/lightdm/lightdm.conf

echo "Enabling Watchdog..."
#sudo modprobe bcm2708_wdog > /dev/null
#sudo cp /etc/modules /etc/modules.bak
#sudo sed '$ i\bcm2708_wdog' -i /etc/modules
#sudo chkconfig watchdog on
#sudo cp /etc/watchdog.conf /etc/watchdog.conf.bak
#sudo sed -e 's/#watchdog-device/watchdog-device/g' -i /etc/watchdog.conf
#sudo /etc/init.d/watchdog start


# Make sure we have 32bit framebuffer depth; but alpha needs to go off due to bug.
#if grep -q framebuffer_depth /boot/config.txt; then
#  sudo sed 's/^framebuffer_depth.*/framebuffer_depth=32/' -i /boot/config.txt
#else
#  echo 'framebuffer_depth=32' | sudo tee -a /boot/config.txt > /dev/null
#fi

# Fix frame buffer bug
#if grep -q framebuffer_ignore_alpha /boot/config.txt; then
#  sudo sed 's/^framebuffer_ignore_alpha.*/framebuffer_ignore_alpha=1/' -i /boot/config.txt
#else
#      echo 'framebuffer_ignore_alpha=1' | sudo tee -a /boot/config.txt > /dev/null
#fi

echo "Installing nodejs 10.24
wget http://nodejs.org/dist/v0.10.24/node-v0.10.24-linux-arm-pi.tar.gz
tar -xvzf node-v0.10.24-linux-arm-pi.tar.gz
sudo mkdir /opt/node
sudo cp -R node-v0.10.24-linux-arm-pi/* /opt/node
rm -r node-v0.10.24-linux-arm-pi
sudo ln -s /opt/node/bin/node /usr/bin/node
sudo ln -s /opt/node/lib/node /usr/lib/node
sudo ln -s /opt/node/bin/npm /usr/bin/npm

echo "configure piSignage"
#git clone git://github.com/ariemtech/piSignage.git ~/piSignage
cd ~/piSignage
npm install

#create ~/.bash_profile file
[ -f ~/.bash_profile ] && mv ~/.bash_profile ~/.bash_profile.bak
sudo cp ~/piSignage/misc/bash_profile ~/.bash_profile


echo "getting forever to run the server"
sudo /opt/node/bin/npm install forever -g

echo "Enable Usb tethering"
sudo cp /etc/network/interfaces  /etc/network/interfaces.bak
sudo cp ~/piSignage/misc/interfaces /etc/network/interfaces

allow-hotplug wlan0
iface wlan0 inet manual
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
iface default inet dhcp


echo "Quiet the boot process..."
sudo cp /boot/cmdline.txt /boot/cmdline.txt.bak
sudo sed 's/$/ quiet/' -i /boot/cmdline.txt

echo "Restart the Pi"
sudo reboot

# need to remove recovery image screen.

