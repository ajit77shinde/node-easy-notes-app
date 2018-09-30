const Note = require("../models/note.model");
//create and Save a New note
exports.create = (req, res) => {
    console.log("req = ",req.body)
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    });
    //save note in databse
    note
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating Note"
            });
        });
};

//Retrive and return all notes from the database.
exports.findAll = (req, res) => {
    console.log("in findAll method")
    Note.find()
        .then(notes => {
            res.send(notes);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retriving data"
            });
        });
};

//find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found id" + req.params.noteId
                });
            }
            res.send(note);
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(400).send({
                    Message: "note not found with Id" + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retriving note with Id" + req.params.noteId
            });
        });
};

//Uodate a note identified by the noteId in the request
exports.update = (req, res) => {
    // validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //find note and update it with the request body 
    Note.findByIdAndUpdate(
        req.params.noteId,
        {
            title: req.body.title || "untitle note",
            content: req.body.content
        },
        { new: true }
    )
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        })
        .catch(err => {
            if (err.kind === "ObJectId") {
                return res.status(404).send({
                    message: "Note not found with id" + req.params.noteid
                });
            }
            return res.status(500).send({
                message: "Error updating note with id" + req.params.noteId
            });
        });
};
//Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    console.log("in delete request ",req.params.noteId);
    
    Note.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(400).send({
                    message: "Note not found with Id" + req.params.noteId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not fund with Id" + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id" + req.params.noteId
            });
        });
};
