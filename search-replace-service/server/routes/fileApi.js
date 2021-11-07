const router = require("express").Router();
const multer = require('multer')();
const fs = require('fs');
const { body, query, validationResult } = require('express-validator');
const path = require('path');

router.post('/search-replace', multer.single('file'), body('search').isString().notEmpty(), body('replace').isString().exists(), function(req, res) {
    const errors = validationResult(req);
    const errorArray = errors.array();

    if (!req.file) {
        errorArray.push({msg: "File is required", param: 'file'});
    }

    if (errorArray.length > 0) {
        return res.status(400).json({ errors: errorArray });
    }
    
    const fileText = req.file.buffer.toString();
    const { search, replace } = req.body;

    var replaceRegex = new RegExp(search, 'g');
    const matches = fileText.match(replaceRegex) || [];
    const newText = fileText.replace(replaceRegex, replace);

    const fileName = path.parse(req.file.originalname).name;
    const newFileName = `${fileName}_processed_${Date.now()}.txt`;
    try {
        fs.writeFileSync('./' + newFileName, newText);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'error creating file'});
    }

    res.send({ occurrences: matches.length, fileName: newFileName, search, replace });
});

router.get('/download', query('fileName').isString().notEmpty(), function(req, res) {
    const errors = validationResult(req);
    const errorArray = errors.array();

    if (errorArray.length > 0) {
        return res.status(400).json({ errors: errorArray });
    }

    const { fileName } = req.query;

    res.download(`./${fileName}`);
});

module.exports = router;