const appwrite = require("../service/appwrite");

exports.getLoginView = (req, res, next) => {
    res.render('login/index', {title: 'Prapla'});
}

exports.logout = (req, res, next) => {
    res.clearCookie("user_id");
    res.clearCookie("session_id");
    res.redirect('/');
}

exports.validateLogin = async (req, res, next) => {

    let session_id = req.body["session_id"];
    let user_id = req.body["user_id"];
    if (session_id && user_id) {
        appwrite.isValidSession(user_id, session_id)
            .then((response) => {
                res.cookie("user_id", user_id, {maxAge: 2 * 60 * 60 * 1000, httpOnly: true});
                res.cookie("session_id", session_id, {maxAge: 2 * 60 * 60 * 1000, httpOnly: true});
                res.redirect('/cms');
            })
            .catch((error) => {
                console.log(error);
                res.redirect('/');
            });
    } else {
        res.redirect('/');
    }
}

exports.verifyCookie = (req, res, next) => {
    let session_id = req.cookies["session_id"];
    let user_id = req.cookies["user_id"];
    if (session_id && user_id) {
        appwrite.isValidSession(user_id, session_id)
            .then((response) => {
                next();
            })
            .catch((error) => {
                console.log(error);
                res.redirect('/');
            });
    } else {
        res.redirect('/');
    }
}