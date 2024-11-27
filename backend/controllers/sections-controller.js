import mongoose from 'mongoose';

import Section from '../models/section.js';
import User from '../models/user.js';

const getAllSections = async (req, res, next) => {
    let sections;

    try {
        sections = await Section.find({}, '-students -mentor');
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    res.json({
        sections: sections.map(section => {
            return section.toObject({ getters: true })
        })
    })
}

const createSection = async (req, res, next) => {
    const { courseName, courseSection, timeOfSession, buildingRoomNumber, mentor } = req.body;

    const newSection = new Section({
        courseName,
        courseSection,
        timeOfSession,
        buildingRoomNumber,
        mentor
    })

    let user;
    try {
        user = await User.findById(mentor).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    if (!user) {
        const error = new Error('user not found');
        error.code = 404;
        return next(error);

    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newSection.save({ session: session });
        user.sections.push(newSection);
        await user.save({ session: session });
        await session.commitTransaction();
    } catch (error) {
        return next(error);
    }

    res
        .status(201)
        .json({ section: newSection.toObject({ getters: true }) });
}

export default { getAllSections, createSection }