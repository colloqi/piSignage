'use strict';

exports.config = {
    port: 8000,
    root: __dirname,
    mediaDir: this.root+'/media',
    mediaPath: this.mediaDir+'/',
    defaultPlaylist: this.mediaPath+'_playlist.json'
}