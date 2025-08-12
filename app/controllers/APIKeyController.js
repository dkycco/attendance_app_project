const crypto = require('crypto');
const APIKey = require('../models/APIKey');
const {validationResult} = require('express-validator');
const APIkeyValidation = require('../../validators/APIKeyValidator');
const { error } = require('console');

module.exports = {
   index: async (req, res) => {
      res.render('pages/api_key', {
         layout: 'layouts/main-layout',
         title: 'API Key | SMK KORPRI SUMEDANG',
         controller: 'api_key.index'
      });
   },

   create: async (req, res) => {
      res.render('pages/form_api_key', {
         layout: false,
         title: false,
         is_create: true
      });
   },
   
   store: async (req, res) => {
      const io = req.app.get('io');
      const socketId = req.headers['x-socket-id'];
      const randomString = crypto.randomBytes(64).toString('hex');
      const hashed = crypto.createHash('sha512').update(randomString).digest('hex');
      const api_key = hashed.slice(0, 100);
      const {
         id_user,
         keterangan
      } = req.body;


      await Promise.all(APIkeyValidation.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         const message = errors.array()[0].msg;
         return res.status(400).json({
            message,
            type: 'warning'
         });
      }

      try {
         const created = await APIKey.create({
            dibuat_oleh: id_user,
            api_key,
            keterangan,
            status: 'active'
         });

         if (socketId) {
            io.to(socketId).emit('push:toast', {
               message: `API key baru berhasil disimpan!`,
               type: 'success'
            });

            socketBroadcastExcept(io, socketId).emit('push:toast', {
               message: `Seseorang menambahkan satu API key baru!`,
               type: 'warning'
            });

            io.emit('api-key:baru', {
               id: created.id,
               dibuat_oleh: created.dibuat_oleh,
               api_key: created.api_key,
               keterangan: created.keterangan,
               status: created.status
            });
         }

         res.status(200).json({ created });
      } catch (error) {
         console.log(error);
         
         return res.status(400).json({
            message: 'Gagal menyimpan API key!',
            type: 'warning'
         });
      }
   }
}