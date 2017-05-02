# Green Abyss #

The simple life is threatened when progress knocks on your door. The life you've known is over, and so you must venture into the Green Abyss.

## Technical ##

Green Abyss is web game that uses google play services.

This repo is simply the starting point of the project. By running `npm i`, this repo unpack itself by cloning itself 3 more times, one each for client, server and assets. This way, you can control the version of the client, the server and assets independently. Pay special attention to the branches therein, and use syntax like `client/master` or `client/feature/panning` when naming branches.

### Client ###

`./client`

The client is a simple javascript bundle compiled with browserify. Google play services provide much of the game backend functionality.

### Server ###

`./server`

The server is a simple node server that serves the client.

### Assets ###

`./assets`

The assets are stored with GIT LFS.
