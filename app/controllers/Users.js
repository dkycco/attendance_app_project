module.exports = {
   index: async (req, res) => {
      try {
         res.render('pages/users', {
            layout: 'layouts/main-layout',
            title: 'Pengguna | SMK KORPRI SUMEDANG',
            currentController: 'users.index',
         });
      } catch (err) {
         res.status(500).send('Terjadi kesalahan saat memuat halaman.');
      }
   }
}