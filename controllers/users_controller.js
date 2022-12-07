const User = require('../model/user');


// render the sign up page
module.exports.signUp =async function (req, res) {
    console.log("reached signUp controller");
    if (req.isAuthenticated()) {
        req.flash('success', 'user Already signed in');
        return res.redirect('/');
    }

    console.log('reached sign up page');
    return res.render('user_sign_up', {
        title: "Placement Cell | Sign Up"
    })
}


// render the sign in page
module.exports.signIn =async function (req, res) {

    if (req.isAuthenticated()) {
        req.flash('success', 'user Already signed in');
        return res.redirect('/');
    }
    return res.render('user_sign_in', {
        title: "Placement Cell | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}
                req.flash('success', 'user created')
                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'Email already used, pls login to continue!');
            return res.redirect('/users/sign-in');
        }

    });
}




// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

// controller for destroying the session created
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
            // res.redirect('/sign-in');
        } else {
            req.flash('success', 'You have logged out!');
            res.redirect('/users/sign-in');
        }
    });
    
}