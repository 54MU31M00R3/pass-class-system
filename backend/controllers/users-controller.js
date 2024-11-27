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

export default { signup };