const User = require("../models/user");

module.exports = {
   index: async (req, res) => {
      const dataUser = await User.findAll();
      try {
         res.render('pages/users', {
            layout: 'layouts/main-layout',
            title: 'Pengguna | SMK KORPRI SUMEDANG',
            currentController: 'users.index',
            dataUser
         });
      } catch (err) {
         res.status(500).send('Terjadi kesalahan saat memuat halaman.');
      }
   }
}