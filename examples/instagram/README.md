### Displaying Instagram User Feeds in piSignage

The following steps will enable you to display an Instagram feed for a user 
* In your server UI select Assets in the left-side menu which will display the Available Assets.
* Click on the **+Add**  button in the top-right corner.
* Select *'Add a Link'*. This will open the *'Stream from Internet'* dialog.
* Enter a suitable file name, and select *''Media RSS (needs v1.7.0)* as the *'Type'* of the stream.
* Choose what RSS text you want to display.
* In the **Link Address** field, enter the url: *https://websta.me/rss/n/\<username\>* where \<username\> is the *username* of the Instagram user.
* Click the **Save** button to close the dialog.
* An asset with the file name of the newly created asset will be shown in the list of Available Assets, with a *.mrss* extension.
* Create a new playlist and add this asset to the newly created asset.
* Make this playlist the default playlist, or add this playlist to the group of players that are to display the Instagram feed.
* Deploy the playlist and the Instagram feed will be displayed on the players of the selected group.

