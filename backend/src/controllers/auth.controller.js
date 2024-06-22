const { hashPassword, comparePassword } = require('../helpers/authHeler');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')

const registerSale = async (req, res) => {
    try {
        const { title, firstName, lastName, email, password, tel } = req.body;

        // ตรวจสอบว่ามีข้อมูลที่จำเป็นทั้งหมดหรือไม่
        if (!title || !firstName || !lastName || !email || !password || !tel) {
            return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบ" });
        }

        // ตรวจสอบเบอร์โทรให้ครบ 10 ตำแหน่ง
        if (typeof tel !== 'string' || tel.length !== 10) {
            return res.status(400).json({ msg: "กรุณากรอกเบอร์โทรให้ครบ 10 ตำแหน่ง" });
        }

        // ตรวจสอบว่าอีเมล์หรือเบอร์โทรนี้ถูกใช้งานแล้วหรือไม่
        const existingEmail = await userModel.findOne({ email });
        const existingTel = await userModel.findOne({ tel });

        if (existingEmail) {
            return res.status(400).json({ msg: "อีเมลนี้ถูกใช้งานแล้ว" });
        }

        if (existingTel) {
            return res.status(400).json({ msg: "เบอร์โทรนี้ถูกใช้งานแล้ว" });
        }

        // แฮชรหัสผ่าน
        const hashedPassword = await hashPassword(password);

        // สร้างผู้ใช้ใหม่
        const newUser = new userModel({
            title,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            tel,
            role: "sale"
        });

        // บันทึกผู้ใช้ใหม่ในฐานข้อมูล
        await newUser.save();

        res.status(201).json({ msg: "User created successfully", data: newUser });
    } catch (error) {
        console.error("Error: " + error);
        res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};


const registerAdmin = async (req, res) => {
    try {
        const { title, firstName, lastName, email, password, tel, role } = req.body;

        // ตรวจสอบว่ามีข้อมูลที่จำเป็นทั้งหมดหรือไม่
        if (!title || !firstName || !lastName || !email || !password || !tel || !role) {
            return res.status(400).json({ msg: "กรุณากรอกข้อมูลให้ครบ" });
        }

         // ตรวจสอบเบอร์โทรให้ครบ 10 ตำแหน่ง
         if (typeof tel !== 'string' || tel.length !== 10) {
            return res.status(400).json({ msg: "กรุณากรอกเบอร์โทรให้ครบ 10 ตำแหน่ง" });
        }

        // ตรวจสอบว่าอีเมล์หรือเบอร์โทรนี้ถูกใช้งานแล้วหรือไม่
        const existingEmail = await userModel.findOne({ email });
        const existingTel = await userModel.findOne({ tel });

        if (existingEmail) {
            return res.status(400).json({ msg: "อีเมลนี้ถูกใช้งานแล้ว" });
        }

        if (existingTel) {
            return res.status(400).json({ msg: "เบอร์โทรนี้ถูกใช้งานแล้ว" });
        }

        // แฮชรหัสผ่าน
        const hashedPassword = await hashPassword(password);

        // สร้างผู้ใช้ใหม่
        const newUser = new userModel({
            title,
            firstName,
            lastName,
            email,
            password: hashedPassword,
            tel,
            role: "admin"
        });

        // บันทึกผู้ใช้ใหม่ในฐานข้อมูล
        await newUser.save();

        res.status(201).json({ msg: "User created successfully", data: newUser });
    } catch (error) {
        console.error("Error: " + error);
        res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                message: "อีเมลไม่ได้ลงทะเบียน",
            });
        }

        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                status_code: 401,
                msg: 'รหัสผ่านไม่ถูกต้อง'
            });
        }

        const jwtToken = jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role
        },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Optional token expiration
        );

        res.status(200).json({
            success: true,
            msg: "Login successfully",
            data: {
                full_name: `${user.title} ${user.firstName} ${user.lastName}`,
                email: user.email,
                tel: user.tel,
                role: user.role,
                token: jwtToken
            }
        });
    } catch (error) {
        console.error("Error: " + error);
        res.status(500).json({
            status_code: 500,
            msg: 'Internal Server Error'
        });
    }
};

module.exports = {
    registerAdmin,
    registerSale,
    login
}