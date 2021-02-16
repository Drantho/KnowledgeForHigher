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
            console.log(`passport-local stuff fires`);
            const generateHash = password => {
                console.log(`generating hash`)
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            }
            User.findOne({
                where: {
                    userName: userName
                }
            }).then(user => {
                if (user) {
                    console.log(`username unavailable`);
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
                            console.log(`no user created`);
                            return done(null, false)
                        }
                        return done(null, newUser)
                    })
                }


            })
        }
    ));

    //serialize
    passport.serializeUser(function (user, done) {

        done(null, user.id);

    });

    // deserialize user 
    passport.deserializeUser(function (id, done) {

        User.findOne({where:{
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