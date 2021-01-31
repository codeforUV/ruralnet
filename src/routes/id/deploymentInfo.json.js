
export async function get(req, res, next) {
    const title = process.env.BRANCH_NAME || "RuralNet Homepage";
    const memo = process.env.BRANCH_INFO  || "Still under development - thanks for understanding!";
    //console.log(process.env.BRANCH_NAME, process.env.BRANCH_INFO);
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({headline: title, about: memo}));
}