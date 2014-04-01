#!/bin/sh
YOUTUBE_LINK=`youtube-dl -gv $1`
echo 'your link'$YOUTUBE_LINK
echo `omxplayer -o hdmi $YOUTUBE_LINK`

