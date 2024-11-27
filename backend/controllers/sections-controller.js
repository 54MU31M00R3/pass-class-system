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
        sections: sections.map((section) => {
            return section.toObject({ getters: true });
        })
    });
}


const getSectionsByUserId = async (req, res, next) => {
    const userId = req.params.userId;

    let userDashboardSections;

    try {
        userDashboardSections = await User.findById(userId).populate('sections').exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    res.json({
        sections: userDashboardSections.sections.map(section => {
            return section.toObject({ getters: true });
        })
    })
}

const getSectionById = async (req, res, next) => {
    const sectionId = req.params.sectionId;

    let section;

    try {
        section = await Section.findById(sectionId).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    res.json({ section: section.toObject({ getters: true }) });
}

const createSection = async (req, res, next) => {
    const { courseName, courseSection, timeOfSession, buildingRoomNumber, mentor } = req.body;

    const newSection = new Section({
        courseName,
        courseSection,
        timeOfSession,
        buildingRoomNumber,
        mentor
    });

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

const enrolSection = async (req, res, next) => {
    const userId = req.params.userId;
    const sectionId = req.params.sectionId;

    console.log(userId);
    console.log(sectionId)

    let user;

    try {
        user = await User.findById(userId).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    if (!user) {
        const error = new Error('user not found');
        error.code = 404;
        return next(error);

    }

    let section;

    try {
        section = await Section.findById(sectionId).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    if (!section) {
        const error = new Error('section not found');
        error.code = 404;
        return next(error);

    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        section.students.push(user);
        await section.save({ session: session });
        user.sections.push(section);
        await user.save({ session: session });
        await session.commitTransaction();
    } catch (error) {
        return next(error);
    }

    res
        .status(201)
        .json({
            section: section.toObject({ getters: true }),
            user: user.toObject({ getters: true })
        });
}

export default { getAllSections, getSectionsByUserId, getSectionById, createSection, enrolSection }