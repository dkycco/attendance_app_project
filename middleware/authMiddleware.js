function ensureAuthenticated(req, res, next) {
   if (req.session && req.session.user) {
      return next();
   }
   return res.redirect('/login');
}

function authorizeRoles(...roles) {
   return (req, res, next) => {
      const user = req.session?.user;
      if (!user) return res.redirect('/login');

      if (!roles.includes(user.role)) {
         return res.status(403).send('Akses ditolak: role tidak diizinkan.');
      }

      next();
   };
}

module.exports = {
   ensureAuthenticated,
   authorizeRoles
};