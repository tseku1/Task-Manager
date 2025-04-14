const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc GET all users (Admin)
// @route GET /api/users/
// @access Private(Admin)
const getUsers = async (req, res) => {
    try{
        const users = await User.find({role: "member"}).select("-password");

        // Add task counts to each user
        const usersWithTaskCounts = await Promise.all(users.map(async (user) => {
            const pendingTasks = await Task.countDocuments({
                assignedTo: user._id,
                 status: "Pending"
                });
            const inProgressTasks = await Task.countDocuments({
                assignedTo: user._id,
                 status: "In Progress"
                });
            const completedTasks = await Task.countDocuments({
                assignedTo: user._id,
                 status: "Completed"
                });

            return {
                ...user._doc, // Include all existing user data
                pendingTasks,
                inProgressTasks,
                completedTasks,
            };
        })
    );

        res.json(usersWithTaskCounts);
    }catch(error){
        res.status(500).json({messsage: "Server error", error: error.messsage});
    }
}

// @desc GET users by ID (Admin)
// @route GET /api/users/:id
// @access Private(Admin)
const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id).select("-password");
        if(!user) return res.status(404).json({message: "User not found"});
        res.json(user);
    }catch(error){
        res.status(500).json({messsage: "Server error", error: error.messsage});
    }
}

// @desc DELETe a user (Admin)
// @route DELETE /api/users/:id
// @access Private(Admin)
const deleteUser = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({messsage: "Server error", error: error.messsage});
    }
}

module.exports = {getUsers, getUserById, deleteUser};