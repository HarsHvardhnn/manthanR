const auth = (roles) => {
    return (req, res, next) => {
        const { role } = req.body;
        if (roles.includes(role)) {
            next();
        } else {
            res.status(403).send('Unauthorized');
        }
    };
};

module.exports = {auth}
