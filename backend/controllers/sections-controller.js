import mongoose from 'mongoose';

import Section from '../models/section.js';
import User from '../models/user.js';

// function used to return all existing sections in the db
const getAllSections = async (req, res, next) => {
    
    // queries all existing sections and returns them without the students, and mentor field
    let sections;
    try {
        sections = await Section.find({}, '-students -mentor');
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    // send all sections to the frontend in json format
    res.json({
        sections: sections.map((section) => {
            return section.toObject({ getters: true });
        })
    });
}

// function used to return all sections associated with a specific user
const getSectionsByUserId = async (req, res, next) => {
    // obtains userId from url
    const userId = req.params.userId;

    // queries for user and retrieves all their associated sections
    let userDashboardSections;
    try {
        userDashboardSections = await User.findById(userId).populate('sections').exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    // sends user associated sections to frontend in json format
    res.json({
        sections: userDashboardSections.sections.map(section => {
            return section.toObject({ getters: true });
        })
    })
}

// used to retrieve a section by their id
const getSectionById = async (req, res, next) => {
    // retrieve id from url
    const sectionId = req.params.sectionId;

    // queries for section by its id
    let section;
    try {
        section = await Section.findById(sectionId).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    // send section data to the frontend in json format
    res.json({ section: section.toObject({ getters: true }) });
}

// used to create a section
const createSection = async (req, res, next) => {
    // retrieves data sent by json format from post request
    const { courseName, courseSection, timeOfSession, buildingRoomNumber, mentor } = req.body;

    // create new section object
    const newSection = new Section({
        courseName,
        courseSection,
        timeOfSession,
        buildingRoomNumber,
        mentor
    });

    // finds user that has sent request
    let user;
    try {
        user = await User.findById(mentor).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    // checks if user exists
    if (!user) {
        const error = new Error('user not found');
        error.code = 404;
        return next(error);

    }

    // uses a transaction operations which only creates the 
    // section if it is able to successfully associated it
    // with the user
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

    // send the section data to the frontend in json format
    res
        .status(201)
        .json({ section: newSection.toObject({ getters: true }) });
}

// used to associate student users with sections
const enrolSection = async (req, res, next) => {
    // retrieve ids from url
    const userId = req.params.userId;
    const sectionId = req.params.sectionId;

    // queries for user in db
    let user;
    try {
        user = await User.findById(userId).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    // checks if user exists
    if (!user) {
        const error = new Error('user not found');
        error.code = 404;
        return next(error);
    }

    // queries for section in db
    let section;
    try {
        section = await Section.findById(sectionId).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    // checks if section exists
    if (!section) {
        const error = new Error('section not found');
        error.code = 404;
        return next(error);

    }

    // starts transaction, only saving changes if both
    // student and sections were successfully linked
    // through their associated variables
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

    // returns section and user data to frontend in json format
    res
        .status(201)
        .json({
            section: section.toObject({ getters: true }),
            user: user.toObject({ getters: true })
        });
}

export default { getAllSections, getSectionsByUserId, getSectionById, createSection, enrolSection }