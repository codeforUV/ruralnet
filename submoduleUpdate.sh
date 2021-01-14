# pull repo updates
# to use w/ heroku, add this line to Procfile: release: ./submoduleUpdate.sh
chmod +rw src
chmod +rw src/routes  # git only tracks the executable bit
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
echo "---"
ls speedtest