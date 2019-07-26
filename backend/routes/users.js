const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.route('/add').post((req, res) => {
    const userName = req.body.userName;

    const newUser = new User({userName});
    newUser.save()
        .then(() => res.json('User Added!'))
        .catch(error => res.status(400).json('Error: ' + error));
})

module.exports = router;