# pull repo updates
git submodule init
git submodule update
cp speedtest/speedtest.js static/speedtest.js
cp speedtest/speedtest_worker.js static/speedtest_worker.js