module.exports = {
   index: async (req, res) => {
      res.render('pages/whatsapp', {
         layout: 'layouts/main-layout',
         title: 'Whatsapp | SMK KORPRI SUMEDANG',
         controller: 'whatsapp.index'
      });
   }
}