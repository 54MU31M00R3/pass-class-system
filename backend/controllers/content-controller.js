import mongoose from 'mongoose';

import Content from '../models/content.js';
import Announcement from '../models/announcement.js';
import Worksheet from '../models/worksheet.js';
import Section from '../models/section.js';

// used to retrieve all content associated with a specific section id
const getContentBySectionId = async (req, res, next) => {
    // retrieve id from ul
    const sectionId = req.params.sectionId;

    // query for all related section content
    let sectionContent;
    try {
        sectionContent = await Section.findById(sectionId).populate('content').exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    // send all content to frontend in json format
    res.json({
        content: sectionContent.content.map(content => {
            return content.toObject({ getters: true });
        })
    })
}

// used to retrieve a worksheet with an associated content id
const getWorksheet = async (req, res, next) => {
    // retrieve id from url
    const contentId = req.params.contentId;

    // query for worksheet
    let worksheet;
    try {
        worksheet = await Worksheet.findOne({ content: contentId }).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    // send worksheet data to frontend in json format
    res.json({ worksheet: worksheet.toObject({ getters: true }) });
}

// used to retrieve an announcement with an associated content id
const getAnnouncement = async (req, res, next) => {
    // retrieve id form url
    const contentId = req.params.contentId;

    // query for announcement
    let announcement;
    try {
        announcement = await Announcement.findOne({ content: contentId }).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    // send announcement data to frontend in the form of json data
    res.json({ announcement: announcement.toObject({ getters: true }) });
}

// used to create an announcement 
const uploadAnnouncement = async (req, res, next) => {
    // retrieves announcement information from json data in post request
    const { section, contentType, title, mentor, body } = req.body;

    // logs current date
    const currentDate = new Date().toDateString();

    // create new annoucement object
    const newAnnouncement = new Announcement({
        content: new Content({
            section,
            contentType,
            title,
            datePosted: currentDate,
            mentor
        }),
        body
    })

    // query for section associated with announcement
    let currentSection;
    try {
        currentSection = await Section.findById(section).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    // check if section exists
    if (!currentSection) {
        const error = new Error('section not found');
        error.code = 404;
        return next(error);
    }

    // starts transaction only creating an announcement if
    // the system is able to link it with a section with associated
    // variables 
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newAnnouncement.content.save({ session: session });
        await newAnnouncement.save({ session: session });
        currentSection.content.push(newAnnouncement.content);
        await currentSection.save({ session: session });
        await session.commitTransaction();
    } catch (error) {
        return next(error);
    }

    // return announcement data in json format
    res
        .status(201)
        .json({ announcement: newAnnouncement.toObject({ getters: true }) });

}

// used to create a worksheet
const uploadWorksheet = async (req, res, next) => {
    // retrieves announcement information from json data in post request
    const { section, contentType, title, mentor, filePath } = req.body;

    // logs current date request made
    const currentDate = new Date().toDateString();

    // create new worksheet object
    const newWorksheet = new Worksheet({
        content: new Content({
            section,
            contentType,
            title,
            datePosted: currentDate,
            mentor
        }),
        filePath
    })


    // query for section associated with announcement
    let currentSection;
    try {
        currentSection = await Section.findById(section).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    // check if section exists
    if (!currentSection) {
        const error = new Error('section not found');
        error.code = 404;
        return next(error);

    }

    // starts transaction only creating a worksheet if
    // the system is able to link it with a section with associated
    // variables 
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newWorksheet.content.save({ session: session });
        await newWorksheet.save({ session: session });
        currentSection.content.push(newWorksheet.content);
        await currentSection.save({ session: session });
        await session.commitTransaction();
    } catch (error) {
        return next(error);
    }

    // return announcement data in json format
    res
        .status(201)
        .json({ worksheet: newWorksheet.toObject({ getters: true }) });

}



export default { getContentBySectionId, getWorksheet, getAnnouncement, uploadWorksheet, uploadAnnouncement }