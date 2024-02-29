import User from '../models/UserSchema.js';
import Pro from '../models/ProSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = user=>{
    return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY, {
        expiresIn:'15d',
    })
}

export const register = async(req,res)=>{

    const {email, password, name, role, photo, gender} = req.body

    try {

        let user = null;

        if(role==='client') {
            user = await User.findOne({email})
        }
        else if(role==='pro'){
            user = await Pro.findOne({email})
        }

        // check if user exists
        if(user){
            return res.status(400).json({message:'User already exist'})
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        if(role==='client'){
            user = new User({
                name,
                email,
                password:hashPassword,
                photo,
                gender,
                role
            })
        }

        if(role==='pro'){
            user = new Pro({
                name,
                email,
                password:hashPassword,
                photo,
                gender,
                role
            })
        }

        await user.save()

        res.status(200).json({sucess:true, message:'User Successfully created'})
        
    } catch (err) {
        res.status(500).json({sucess:false, message:'Internal server Error'})
    }
}

export const login = async(req,res)=>{

    const {email} = req.body

    try {

        let user = null;

        const client =  await User.findOne({email});
        const pro = await Pro.findOne({email});

        if(client){
            user = client
        }
        if(pro){
            user = pro
        }

        // check if user exists or not
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        // compare password
        const isPasswordMatch = await bcrypt.compare(
            req.body.password,
            user.password)

        if(!isPasswordMatch) {
            return res.status(400).json({ status:false, message: "Invalid credentials" });
        }

        // get token
        const token = generateToken(user);

        const {password, role, ...rest} = user._doc

        res.status(200).json({ status:true, message: "Successfuly login", token, data:{...rest}, role });

    } catch (err) {
        res.status(500).json({ status:false, message: "Failed to login"});
    };
};