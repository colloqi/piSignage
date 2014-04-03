#Disable IPv6
sudo echo "net.ipv6.conf.all.disable_ipv6=1" > /etc/sysctl.d/disableipv6.conf
#Disable the kernel module
sudo echo 'blacklist ipv6' >> /etc/modprobe.d/blacklist

#Remove IPv6 hosts
sudo sed -i '/::/s%^%#%g' /etc/hosts

#Replace Deadline Scheduler with NOOP Scheduler
#NOOP scheduler is best used with solid state devices such as flash memory.
sudo sed -i 's/deadline/noop/g' /boot/cmdline.txt




# Enable zram compression to reduce swap usage.. To be studied.
#https://extremeshok.com/1081/raspberry-pi-raspbian-tuning-optimising-optimizing-for-reduced-memory-usage/
#Remove the extra tty / getty’s | Save: +3.5 MB RAM
sed -i '/[2-6]:23:respawn:\/sbin\/getty 38400 tty[2-6]/s%^%#%g' /etc/inittab
sed -i '/T0:23:respawn:\/sbin\/getty -L ttyAMA0 115200 vt100/s%^%#%g' /etc/inittab

#Enable better usage of the swap
#Default swappiness is 1, we will change this value to 10, which will allow for better memory usage at the expense of more swap usage.
#note: this could reduce the life of your sdcard.
sed -i 's/vm.swappiness=1/vm.swappiness=10/g'  /etc/sysctl.conf
#Purge cached block devices before cached filesystem entries
echo 'vm.vfs_cache_pressure=50' >> /etc/sysctl.conf

#Enable Preload to speed up load times
apt-get install -y preload
sed -i 's/sortstrategy = 3/sortstrategy = 0/g'  /etc/preload.conf

#optimize mount
sed -i 's/defaults,noatime/defaults,noatime,nodiratime/g' /etc/fstab





#webkitdfb for uzbl compilation.
#matchbox instead of openbox


#Overclock cpu, sdram and gpu core without increasing voltage