
const getAllUsers = async (req, res) => {
        res.json({ success: true, message:"this is the get all user" });
};

module.exports={
    getAllUsers
}