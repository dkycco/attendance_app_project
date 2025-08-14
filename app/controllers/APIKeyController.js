const crypto = require('crypto');
const User = require('../models/User');
const APIKey = require('../models/APIKey');
const {validationResult} = require('express-validator');
const APIkeyValidation = require('../../validators/APIKeyValidator');

function socketBroadcastExcept(io, excludeSocketId) {
   return {
      emit: (event, data) => {
         for (let [id, socket] of io.sockets.sockets) {
            if (id !== excludeSocketId) {
               socket.emit(event, data);
            }
         }
      }
   };
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

module.exports = {
   
   index: async (req, res) => {
      const dataAPIKey = await APIKey.findAll({
         include: {
            model: User,
            as: 'users'
         },
         order: [
            ['created_at', 'DESC']
         ]
      });

      res.render('pages/api_key', {
         layout: 'layouts/main-layout',
         title: 'API Key | SMK KORPRI SUMEDANG',
         controller: 'api_key.index',
         dataAPIKey,
         truncateText
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
      const api_key = hashed.slice(0, 15);
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
   },

   edit: async (req, res) => {
      const {id} = req.params;
      const data = await APIKey.findOne({
         where: {id}
      });

      res.render('pages/form_api_key', {
         layout: false,
         title: false,
         is_create: false,
         data
      });
   },

   update: async (req, res) => {
      const io = req.app.get('io');
      const { id } = req.params;
      const socketId = req.headers['x-socket-id'];
      const {
         keterangan,
         status
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
         const apiKey = await APIKey.findByPk(id);
         if (!apiKey) {
            return res.status(400).json({
               message: 'API key tidak ditemukan!',
               type: 'danger'
            });
         }

         await apiKey.update({
            keterangan,
            status
         });

         if (socketId) {
            io.to(socketId).emit('push:toast', {
               message: `API key berhasil diperbarui!`,
               type: 'success'
            });

            socketBroadcastExcept(io, socketId).emit('push:toast', {
               message: `Seseorang merubah salah satu API key!`,
               type: 'warning'
            });

            io.emit('api-key:ubah', {
               id: apiKey.id,
               keterangan: apiKey.keterangan,
               status: apiKey.status
            });
         }

         res.status(200).json({ apiKey });
      } catch (error) {
         return res.status(400).json({
            message,
            type: 'warning'
         });
      }
   },

   destroy: async (req, res) => {
      const {id} = req.params;
      const io = req.app.get('io');
      const socketId = req.headers['x-socket-id'];

      try {
         await APIKey.destroy({
            where: {
               id
            }
         });

         if (socketId) {
            io.to(socketId).emit('push:toast', {
               message: `API key berhasil dihapus!`,
               type: 'success'
            });

            socketBroadcastExcept(io, socketId).emit('push:toast', {
               message: `Seseorang menghapus salah satu API key!`,
               type: 'warning'
            });

            socketBroadcastExcept(io, socketId).emit('api-key:broadcast-hapus', {
               id: id
            });

         }

         return res.status(200).send('API key berhasil dihapus!');
      } catch (error) {
         return res.status(400).send(error);
      }
   }
}