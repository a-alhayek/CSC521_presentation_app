const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // checking evey url and allowing only the POST mehod
    let publicURLS = [
        { url: '/api/auth/', method: 'POST' }
    ]
    let isPublic = false;

    for (var i = 0; i < publicURLS.length; i++) {
        const { url, method } = publicURLS[i];

        if (req.url.includes(url) && req.mehod === method) {
            isPublic = true;
            break;

        }
    }

    if (isPublic) {
        next();
        return;
    }

    // that takes the token that the client have to setup inside thier headers
    const token = req.header('x_auth-token');
    if (!token) {
        res.status(401).json({ msg: "Invalid token, Access Denied" });
        return;
    }

    try {
        // decoded gotta much whatever inside the router/auth.js
        const decoded = jwt.verify(JSON.parse(token), 'secret');
        req.studentid = decoded;
        next();

    } catch (exception) {
        res.status(400).json({ msg: 'Token is not valid.' });

    }
}
module.exports = auth;