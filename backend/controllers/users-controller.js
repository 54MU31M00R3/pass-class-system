import User from '../models/user.js';

import faculty from '../faculty.json' with { type: "json" };

const signup = async (req, res, next) => {
    const { username, email, password, yuId } = req.body;

    const facultyMember = faculty.find(employee => {
        return employee.id == yuId
    })

    let userRole;
    if (facultyMember) {
        userRole = facultyMember.role;
    } else {
        userRole = 'student';
    }

    const newUser = new User({
        username,
        email,
        password,
        yuId,
        role: userRole,
        sections: []
    })

    try {
        await newUser.save();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    res
        .status(201)
        .json({ user: newUser.toObject({ getters: true }) });

}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let foundUser;
    try {
        foundUser = await User.findOne({ email: email });
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    if (!foundUser || foundUser.password !== password){
        const error = new Error('Login Failed');
        error.code = 401;
        return next(error);
    }

    res.json({ message: 'Login Successful', user: foundUser.toObject({ getters: true }) });
}

export default { signup, login };