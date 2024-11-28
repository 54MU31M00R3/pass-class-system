import mongoose from 'mongoose';

import Content from '../models/content.js';
import Announcement from '../models/announcement.js';
import Worksheet from '../models/worksheet.js';
import Section from '../models/section.js';

const getContentBySectionId = async (req, res, next) => {
    const sectionId = req.params.sectionId;

    let sectionContent;

    try {
        sectionContent = await Section.findById(sectionId).populate('content').exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    res.json({
        content: sectionContent.content.map(content => {
            return content.toObject({ getters: true });
        })
    })
}

const getWorksheet = async (req, res, next) => {
    const contentId = req.params.contentId;

    let worksheet;

    try {
        worksheet = await Worksheet.findById(contentId).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    res.json({ worksheet: worksheet.toObject({ getters: true }) });
}

const getAnnouncement = async (req, res, next) => {
    const contentId = req.params.contentId;

    let announcement;

    try {
        announcement = await Announcement.findById(contentId).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    res.json({ announcement: announcement.toObject({ getters: true }) });
}

const uploadAnnouncement = async (req, res, next) => {
    const { section, contentType, title, mentor, body } = req.body;

    const currentDate = new Date().toDateString();

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

    let currentSection;

    try {
        currentSection = await Section.findById(section).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    if (!currentSection) {
        const error = new Error('section not found');
        error.code = 404;
        return next(error);

    }

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

    res
        .status(201)
        .json({ announcement: newAnnouncement.toObject({ getters: true }) });

}

const uploadWorksheet = async (req, res, next) => {
    const { section, contentType, title, mentor, filePath } = req.body;

    const currentDate = new Date().toDateString();

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


    let currentSection;

    try {
        currentSection = await Section.findById(section).exec();
    } catch (error) {
        error.code = 500;
        return next(error);
    }

    if (!currentSection) {
        const error = new Error('section not found');
        error.code = 404;
        return next(error);

    }

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

    res
        .status(201)
        .json({ worksheet: newWorksheet.toObject({ getters: true }) });

}



export default { getContentBySectionId, getWorksheet, getAnnouncement, uploadWorksheet, uploadAnnouncement }