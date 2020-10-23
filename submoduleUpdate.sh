# pull repo updates
git submodule init
git submodule update
cp speedtest/speedtest.js static/speedtest.js
cp speedtest/speedtest_worker.js static/speedtest_worker.js
if ! test -f "tests.json"; # if tests.json doesn't exist
then
    touch tests.json
    echo "[]" > tests.json
else
    echo "tests already exists"
fi
ls static
ls speedtest