import { SpeedTest } from '../models';

export async function get(req, res, next) {
  let requestIP =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.headers['HTTP_CLIENT_IP'] ||
    req.headers['X-Real-IP'] ||
    req.headers['HTTP_X_FORWARDED_FOR'];
  if (requestIP.substr(0, 7) === '::ffff:') {
    requestIP = requestIP.substr(7);
  }
  console.log(requestIP);
  const prevTest = await SpeedTest.findOne({ ipAddress: requestIP });
  if (prevTest) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({ ipAddress: requestIP, internetProvider: prevTest.internetProvider }));
  } else {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end(
      JSON.stringify({
        ipAddress: requestIP,
        err: 'no tests from this IP address stored in the database',
      })
    );
  }
}
