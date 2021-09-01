const fetch = require('node-fetch');
const distance = require('gps-distance');

/**
 * @param pointA - Array of two Coordinates. Lat / Lng
 * @param pointB - Array of two Coordinates. Lat / Lng
 */
function calcDistance(pointA, pointB) {
  return distance(
    parseFloat(pointA[0]),
    parseFloat(pointA[1]),
    parseFloat(pointB[0]),
    parseFloat(pointB[1])
  ).toPrecision(4);
}

/**
 * This route is *mostly* obsolete
 * it makes 2 calls to ipinfo.io (rate limit described inline) to get end user ISP name and end user estimated distance to server
 * we can get ISP name once per IP address by calling ipInfo.io in the frontend
 * distance is not used
 * to viably use ipinfo.io in the backend requires the acquision of an api key
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export async function get(req, res, next) {
  console.log(req.headers);
  let requestIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.headers['HTTP_CLIENT_IP'] || req.headers['X-Real-IP'] || req.headers['HTTP_X_FORWARDED_FOR'];
  if (requestIP.substr(0, 7) === "::ffff:") {
    requestIP = requestIP.substr(7)
  }
  console.log(requestIP);
  let respString = requestIP;
  // ipinfo.io allows 500 free requests per day, so 250 users could speed test each day...
  let ipData = await fetch(`https://ipinfo.io/${requestIP}/json`);
  ipData = await ipData.json();
  let serverData = await fetch('https://ipinfo.io/json');
  serverData = await serverData.json();

  if (ipData.org && ipData.country) {
    respString += ` - ${ipData.org}, ${ipData.country}`;
  }
  if (ipData.loc && serverData.loc) {
    const d = calcDistance(ipData.loc.split(','), serverData.loc.split(','));
    respString += ` ${d}km`;
  }
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.write(respString);
  res.end();
}

export async function post(req, res, next) {
  // do nothing
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify( ));
}
