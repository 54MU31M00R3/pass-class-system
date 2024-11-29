import User from '../models/user.js';

// used to check yuId upon signup to determine if user should
// be assigned a faculty role
import faculty from '../faculty.json' with { type: "json" };

// function used to create a user account
const signup = async (req, res, next) => {
    // retrieve json data from post request
    const { username, email, password, yuId } = req.body;

    // checks if yuId matches an employee in faculty.json
    const facultyMember = faculty.find(employee => {
        return employee.id == yuId
    })

    // if it matches a faculty member, it assigns the 
    // account that role, otherwise a student role is given
    let userRole;
    if (facultyMember) {
        userRole = facultyMember.role;
    } else {
        userRole = 'student';
    }

    // create new user object
    const newUser = new User({
        username,
        email,
        password,
        yuId,
        role: userRole,
        sections: []
    })

    // save object in database
    try {
        await newUser.save();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    // return new user data, to authenticate and 
    // pass their credentials to the web context 
    res
        .status(201)
        .json({ user: newUser.toObject({ getters: true }) });

}

// used to log existing users into the system
const login = async (req, res, next) => {
    // retrieves details from post request
    const { email, password } = req.body;

    // checks db to see if there is an existing user
    let foundUser;
    try {
        foundUser = await User.findOne({ email: email });
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    // confirms if the user exists and if the password matches
    if (!foundUser || foundUser.password !== password){
        const error = new Error('Login Failed');
        error.code = 401;
        return next(error);
    }

    // return new user data, to authenticate and 
    // pass their credentials to the web context 
    res.json({ message: 'Login Successful', user: foundUser.toObject({ getters: true }) });
}

export default { signup, login };