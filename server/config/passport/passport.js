const bcrypt = require("bcrypt");

module.exports = function (passport, user) {

    const User = user;

    const LocalStrategy = require("passport-local").Strategy;

    passport.use("local-signup", new LocalStrategy(
        {
            usernameField: "userName",
            passwordField: "password",
            passReqToCallback: true
        },
        function (req, userName, password, done) {
            const generateHash = password => {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            }
            User.findOne({
                where: {
                    userName: userName
                }
            }).then(user => {
                if (user) {
                    return done(null, false, {
                        message: "User name is unavailable"
                    });
                } else {
                    const userPassword = generateHash(password);

                    const data = {
                        userName: userName,
                        password: userPassword,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                    }

                    User.create(data).then((newUser, created) => {
                        if (!newUser) {
                            return done(null, false)
                        }
                        return done(null, newUser)
                    })
                }


            })
        }
    ));

    passport.use("local-signin", new LocalStrategy(
        {
            usernameField: "userName",
            passwordField: "password",
            passReqToCallback: true
        },
        function (req, userName, password, done) {
            const User = user;
            const isValidPassword = function (userPass, password) {
                return bcrypt.compareSync(password, userPass)
            }

            User.findOne({
                where: {
                    userName: userName
                }
            }).then(user => {
                if (!user) {
                    return done(null, false, {
                        message: "user/password incorrect"
                    });
                }

                if (!isValidPassword(user.password, password)){
                    return done(null, false,{ 
                        message: "user/password incorrect"
                    })
                }

                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(err => {

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
    
            });
        }
    ))

    //serialize
    passport.serializeUser(function (user, done) {

        done(null, user.id);

    });

    // deserialize user 
    passport.deserializeUser(function (id, done) {

        User.findOne({
            where: {
                id: id
            }
        }).then(function (user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });
}