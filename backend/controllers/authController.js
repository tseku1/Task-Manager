const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
};

// @desc Register new User
// @route Post /api/auth/register
// @acces Public
const registerUser = async (req, res) => {
    try{
        const {name, email, password, profileImageUrl, adminInviteToken } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exits"});
        }

        // Determine user role: Admin if correct token is provided, otherwise Member
        let role = "member";
        if(adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN){
            role = "admin";
        }else{

        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            role,
        });

        // Return user data with JWT
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        });
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

// @desc  Login User
// @route Post /api/auth/login
// @acces Public
const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({message: "Invalid email or password"});
        }

        // compare passoword
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid email or password"});
        }

        // Return user data with JWT
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        })
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

// @desc Get User Profile
// @route GET /api/auth/profile
// @acces Private(Require JWT)
const getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({massage: "User not found"});
        }
        res.json(user);
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

// @desc Update User Profile
// @route PUT /api/auth/profile
// @acces Private(Requires JWT)
const updateUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({messsage: "User not found "});
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updateUser = await user.save();
        
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            role: updateUser.role,
            token: generateToken(updateUser._id),
        });
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
};

module.exports = {registerUser, loginUser, getUserProfile, updateUserProfile};