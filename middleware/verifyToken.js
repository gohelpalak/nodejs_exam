const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin.model");
exports.verifyToken = async (req, res, next) => {
    try {
        let token = req.headers["authorization"].split(" ")[1];
        console.log(token, "token");
        if (!token) {
            return res.json({ message: "Token missing!!!!" });
        }

        let { adminId } = jwt.verify(token, "secret");
        console.log(adminId, "adminId");
        let findAdmin = await Admin.findById(adminId);
        if (findAdmin) {
            req.Admin = findAdmin;
            next();
        } else {
            return res.json({ message: "Admin not Found" })
        }
    } catch (error) {
        console.log(error);
        return res.json({ message: "Server Error" });
    }
};