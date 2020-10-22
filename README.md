# RuralNet

- [RuralNet](#ruralnet)
  - [Project Goals](#project-goals)
  - [Todos](#todos)
  - [App Development](#app-development)
    - [Setting up your development environment](#setting-up-your-development-environment)
    - [Working with the codebase](#working-with-the-codebase)
    - [Editing files](#editing-files)
  - [Deploying](#deploying)

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

The main files we want to edit are in `src/routes`. Each frontend route (page) should have a file named like: `filename.svelte`. The backend logic for that *specific* route should be in a file called `filename.json.js` and contain a `get()` function and a `post()`  function. These functions should contain the server logic for when the frontend makes GET or POST [HTTP requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) to that specific route. To make a request from the frontend you can use the `fetch` function available in most modern web browsers, e.g. `fetch(filename.json')` from within the frontend route file (e.g. from within `src/routes/filename.svelte`).  

See `src/routes/about.svelte` and `src/routes/about.json.js` for an example.


## Deploying

The app is live on heroku at: https://ruralnet.herokuapp.com/

The following steps were used to setup deployment:  

1. Install the heroku CLI tools. On macOS: `brew install heroku/brew/heroku`  
2. Login to your heroku account: `heroku login`  
3. Create a remote app: `heroku create`  
4. Associate it with this project: `heroku git:remote -a ruralnet`  
5. Tell heroku not to cache node modules: `heroku config:set NODE_MODULES_CACHE=false`  
6. Tell heroku not to prune dev dependencies: `heroku config:set NPM_CONFIG_PRODUCTION=false`
7. Setup the `Procfile` with a single line: `web: node __sapper__/build`  
8. Startup a single dyno: `heroku ps:scale web=1`  
9. Deploy the app: `git push heroku master`

*Note:* Steps 5,6 were also be set in the `Config Vars` section under app Settings on the heroku dashboard. This ensures that these variables are picked up with new auto-deploys from pushes to github master