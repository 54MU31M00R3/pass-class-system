import User from '../models/user';

import faculty from '../faculty.json';

const signup = async (req, res, next) => {
    const { username, email, password, yuId } = req.body;

    const facultyMember = faculty.find(employee => {
        return employee.id == yuId
    })

    const newUser = new User({
        username,
        email,
        password,
        yuId,
        role: facultyMember.role,
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