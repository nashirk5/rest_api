module.exports = {
    getUser: (req, res) => {
        var param = req.body;
        res.status(200).json({ "status": true, "data": req.userData });
    }
}