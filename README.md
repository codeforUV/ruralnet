# RuralNet

## Developing

- make sure you have `node` and `npm` otherwise install it from [here](https://nodejs.g/en/) 
- `git clone https://github.com/codeforUV/ruralnet.git`
- `cd ruralnet`
- `npm install`
- `npm run dev` (to launch server)

## Todos

1. Make the output of the speed test prettier in the browser - *Monique*
2. Clean up and check speed test results on the server - *Craig*
3. Try to implement additional speed tests nows that we're going to be using a backend server. Currently we're using [speedtest-net](https://www.np.com/package/speedtest-net) which uses the Ookla speedtest CLI. Another option is the [fast-speedtest](https://www.npmjs.com/package/fast-speed-test) which uses the Netflix fast.com speed test 
4. Get the browser geolocation API working to collect user location and ip addresses
5. Setup a database for storing speed test results, ip addresses, etc 