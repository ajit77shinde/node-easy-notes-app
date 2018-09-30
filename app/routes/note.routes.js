module.exports = (app) => {
    const notes = require('../controllers/note.controller');

    //create a new note
    app.post('/notes', notes.create);

    //retrive all Notes
    app.get('/notes',notes.findAll);

    //Retrive a single Note with noteId
    app.get('/notes/:noteID',notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    //Delete a note with noteId
    app.delete('/notes/:noteId', notes.delete);
}