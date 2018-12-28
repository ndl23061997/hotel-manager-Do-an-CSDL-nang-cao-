
function checkLoginAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        //console.log("Loai tai khoan", req.session.passport.user)
        if (req.session.passport.user.type == 0) {
            next();
        } else {
            res.redirect('/login');
        }

    } else {
        res.redirect('/login');
    }
}

function checkLoginUser(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.session.passport.user.type == 2) {
            next();
        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
}

function checkLoginEmployee(req, res, next) {
    if (req.isAuthenticated()) {
        //console.log("Loai tai khoan", req.session.passport.user)
        if (req.session.passport.user.type == 0 | req.session.passport.user.type == 1) {
            next();
        } else {
            res.redirect('/login');
        }

    } else {
        res.redirect('/login');
    }
}

module.exports.checkLoginAdmin = checkLoginAdmin;
module.exports.checkLoginEmployee = checkLoginEmployee;
module.exports.checkLoginUser = checkLoginUser;