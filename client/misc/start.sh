!/bin/bash
#midori -e Fullscreen -a www.bbc.co.uk &
#uzbl www.yahoo.com &
unclutter -idle 5 &
cd ~/piSignage
/opt/node/bin/node ~/piSignage/server.js
#forever start -l /var/log/forever.log -o /var/log/forever-out.log -e/var/log/forver-err.log ~/piSignage/server.js
#forever start -l /tmp/forever.log ~/piSignage/server.js
