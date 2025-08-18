const publicRoute = (req, res) => {
    res.json({
        message: 'Public route accessed successfully'
    });
};

const userRoute = (req, res) => {
    res.json({
        message: 'User route accessed successfully'
    });
};

const adminRoute = (req, res) => {
    res.json({
        message: 'Admin route accessed successfully'
    });
};

const permissionTest = (req, res) => {
    res.json({
        message: 'Permission test route accessed successfully'
    });
};

module.exports = {
    publicRoute,
    userRoute,
    adminRoute,
    permissionTest
};