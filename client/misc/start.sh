!/bin/bash
#midori -e Fullscreen -a www.bbc.co.uk &
#uzbl www.yahoo.com &
unclutter -idle 5 &
cd ~/piSignage/client/
#/opt/node/bin/node server.js
#forever start -l /var/log/forever.log -o /var/log/forever-out.log -e/var/log/forever-err.log server.js
forever start -l /tmp/forever.log server.js
