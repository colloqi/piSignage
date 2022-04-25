GPIO Control
================

This Uses https://www.npmjs.com/package/onoff npm module to read input from GPIO

Hardware Connections on breadboard
---------------------------------
1. Connect **Pin1(3.3v)** (or pin17) of raspberry pi to a **1k** resistor.
2. From the 1k resistor take three wires and connect to **three different switches**
3. Connect from switches to **pin 11(GPIO 17), pin 12(GPIO 18) and pin 13(GPIO 27)**.
4. Now the switch connected to 
    * pin11(gpio 17) acts as **forward** button if evince pdf reader is not running. If evince pdf reader is running then this switch acts as **show next slide** .
    * pin12(gpio 18) acts as **backward** button if the evince pdf reader is not running. **show previuos slide** otherwise.
    * pin13(gpio 27) acts as **pause/play** playlist button.




