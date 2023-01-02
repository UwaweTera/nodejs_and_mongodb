import passport from "passport";

const RequireAuth = passport.authenticate('jwt',{session: false});

export default RequireAuth
