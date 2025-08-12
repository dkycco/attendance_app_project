module.exports = {
   index: async (req, res) => {
      res.render('pages/api_key', {
         layout: 'layouts/main-layout',
         title: 'API Key | SMK KORPRI SUMEDANG',
         controller: 'api_key.index'
      });
   }
}