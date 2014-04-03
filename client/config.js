'use strict';

module.exports = {
    port:                       8000,
    root:                       __dirname,
    mediaDir:                   __dirname+'/media',
    mediaPath:                  __dirname+'/media/',
    defaultPlaylist:            __dirname+'/media/__default.json',
    poweronConfig:              __dirname + "/media/_config.json",
    defaultTemplateDir:         __dirname+ "/templates/",
    defaultTemplate:            __dirname+ "/templates/t1_template.jade",
    settingsFile:               __dirname + "/media/_settings.json",

    server:                     "http://localhost:3000"
}