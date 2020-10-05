# RuralNet

## About this Branch

This branch uses code from [Librespeed's speedtest.js](https://github.com/librespeed/speedtest) to create a custom speedtest with the server. The frontend uses `speedtest.js` and `speedtest_worker.js` to interface with a server and estimate internet speed. The backend is based off the [`node` branch](https://github.com/librespeed/speedtest/tree/node) of the speedtest repo, which the creators advise against using, without specifying any reasoning. So far, this is very much "proof of concept" - not sure how accurate the speed results are, but here are the preliminary results over my local home network: 

* testing from the same laptop that ruralnet is running on: Ping: 8.41 ms, Down: 1018.42 Mbps, Up: 5226.52 Mbps (wildly innacurate results, but mildly funny and worth sharing)
* testing from a remote laptop: Ping: 6.16 ms, Down: 219.84 Mbps, Up: 301.55 Mbps (My router has a bandwidth of 400 Mbps on the frequency the server laptop was connceted to, so these results seem reasonable with room for improvement)

Using this implementation for yourself is easy - go to the "Custom Test" tab and click the only button. 

Files added:
* In src/routes:
    * custom.svelte - a super basic UI for this speedtest implementation
    * garbage.json.js - backend to generate random binary blobs to measure download speed
    * empty.json.js - backend to test ping and upload speed, replys with nothing
    * getIP.json.js - backend to produce info about client's IP, and distance to server (but not over local network)
* in static:
    * speedtest.json
    * speedtest_worker.json - both are json files that allow us to easily plug-and-play a self-hosted speed test frontend. 
* LICENSE - SHOULD BE ADDED to comply with the LGPL3 License that the Speedtest code is provided under

--- 

## Project Goals

The main goals of this project are to develop a web app that measures a user's internet speed and allows us to visualize this speed against the reported speed of their Internet Service Provider (ISP). At the same time we would like to survey users about how they typically use their internet and how satisfied they are with their current service.

This information would allow municipalities to apply for grants and funding to improve their local internet infrastructure and/or hold ISPs accountable for providing subpar service.

## Todos

For simplicity and tracking checkout the [Taskboard](https://github.com/codeforUV/ruralnet/projects/1) on Github.

## App Development 

The current version of the app is built using HTML, CSS, Javascript, and NodeJS (a Javascript based web-server). It uses [SvelteJS](https://svelte.dev/) as a frontend framework for the UI and [SapperJS](https://svelte.dev/) as a backend framework (built on top of NodeJS). 
To conduct the speedtest itself, we have several options. Currently, we're using [speedtest-net](https://www.npmjs.com/package/speedtest-net) which uses the Ookla speedtest CLI. Another option is the [fast-speedtest](https://www.npmjs.com/package/fast-speed-test) which uses the Netflix fast.com speed test 

### Setting up your development environment

You will need to make sure that you have [NodeJS](https://nodejs.org/en/) setup on your computer. This will give you access to several command line programs. The primary one we'll be using is `npm` which a package manager and application runner for NodeJS web applications. 

### Working with the codebase

Open up a terminal and copy or type the following commands:

1. `git clone https://github.com/codeforUV/ruralnet.git` (download the codebase)
2. `cd ruralnet` (move into the downloaded folder)
3. `npm install` (install all the project dependencies in this folder)
4. `npm run dev` (launch the server)
5. Open `http://localhost:3000` in your web browser to see the app

You can inspect variables and logs from the frontend by opening your browser's javascript console (View > Developer > Javascript Console on Chrome-based browsers).

Logs and messages from the backend (server) will print out in the terminal window you used to run the `npm run dev` command

### Editing files

The main files we want to edit are in `src/routes`. Each frontend route (page) should have a file named like: `filename.svelte`. The backend logic for that *specific* route should be in a file called `filename.json.js` and contain a `get()` function and a `post()`  function. These functions should contain the server logic for when the frontend makes GET or POST [HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) to that specific route. To make a request from the frontend you can use the `fetch` function available in most modern web browsers, e.g. `fetch('filename.json')` from within the frontend route file (e.g. from within `src/routes/filename.svelte`).  

See `src/routes/about.svelte` and `src/routes/about.json.js` for an example.
