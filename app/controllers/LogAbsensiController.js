const DataSiswa = require('../models/DataSiswa');
const LogAbsensi = require('../models/LogAbsensi');
const { Op } = require('sequelize');
const dayjs = require('dayjs');
const { client: whatsappClient } = require('../../services/whatsapp');

const now = dayjs();
const todayStart = now.startOf('day').toDate();
const todayEnd = now.endOf('day').toDate();

module.exports = {
    index: async(req, res) => {
        try {
            const dataSiswa = await DataSiswa.findAll();
            const dataLogAbsensi = await LogAbsensi.findAll({
                where: {
                    created_at: {
                        [Op.between]: [todayStart, todayEnd]
                    }
                },
                include: {
                    model: DataSiswa,
                    as: 'siswa'
                },
                order: [
                    ['created_at', 'DESC']
                ]
            });

            res.render('pages/log_absensi', {
                layout: 'layouts/main-layout',
                title: 'Log Absensi | SMK KORPRI SUMEDANG',
                controller: 'log_absensi.index',
                dataLogAbsensi,
                dataSiswa
            });
        } catch (error) {
            res.status(500).send('Terjadi kesalahan saat memuat halaman.');
        }
    },

    create: async(req, res) => {

        try {
            const dataSiswa = await DataSiswa.findAll();

            res.render('pages/form_log_absensi', {
                layout: false,
                title: false,
                is_create: true,
                dataSiswa
            })
        } catch (error) {
            res.status(500).send('Terjadi kesalahan saat memuat halaman.');
        }
    },

    findNISN: async(req, res) => {
        const { nisn } = req.params;

        try {
            const siswa = await DataSiswa.findOne({
                where: { nisn }
            });

            if (!siswa) {
                return res.status(404).json({
                    message: 'Siswa tidak ditemukan'
                });
            }

            return res.status(200).json(siswa);
        } catch (error) {
            return res.status(500).send(error);
        }
    },

    store: async(req, res) => {
        const io = req.app.get('io');
        const {
            id_sidik_jari,
            nisn,
            nama_lengkap,
            kelas,
            nama_orangtua_wali,
            no_hp,
            status_siswa
        } = req.body;
        const phone = no_hp.replace(/[^0-9]/g, '') + '@c.us';

        function textFormating(str) {
            const lines = str.split('\n');
            const trimmedLines = lines.map(line => line.trimStart());
            return trimmedLines.join('\n').trim();
        }

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        try {
            if (!nisn) {
                return res.status(400).json({
                    message: 'Pilih salah satu siswa terlebih dahulu!',
                    type: 'warning'
                });
            }

            if (!status_siswa) {
                return res.status(400).json({
                    message: 'Status Siswa wajib dipilih!',
                    type: 'warning'
                });
            }

            const existing = await LogAbsensi.findOne({
                where: {
                    nisn,
                    status_siswa,
                    created_at: {
                        [Op.between]: [todayStart, todayEnd]
                    }
                },
                order: [
                    ['created_at', 'DESC']
                ]
            });

            if (existing) {
                return res.status(409).json({
                    message: 'Siswa sudah absen hari ini!',
                    type: 'warning'
                });
            }

            const waktu = new Date().toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            const tanggal = new Date().toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })

            let pesan = '';

            if (status_siswa === 'hadir') {
                pesan = textFormating(`
                    Yth. ${nama_orangtua_wali} Bapak/Ibu Orang Tua/Wali Murid

                    Dengan ini kami beritahukan bahwa ananda:

                    Nama: ${nama_lengkap}
                    Kelas: ${kelas.replace(/_/g, ' ').toUpperCase()}
                    NISN: ${nisn}

                    Telah tercatat *hadir* di sekolah secara sistem pada pukul: *${waktu}*, tanggal: *${tanggal}*.

                    _*Pesan ini terkirim secara otomatis oleh sistem, dimohon untuk tidak membalas pesan ini!_
                `)
            } else if (status_siswa === 'pulang') {
                pesan = textFormating(`
                    Yth. ${nama_orangtua_wali} Bapak/Ibu Orang Tua/Wali Murid
                    
                    Dengan ini kami beritahukan bahwa ananda:

                    Nama: ${nama_lengkap}
                    Kelas: ${kelas.replace(/_/g, ' ').toUpperCase()}
                    NISN: ${nisn}

                    Telah tercatat *pulang* dari sekolah secara sistem pada pukul: *${waktu}*, tanggal *${tanggal}*.

                    Kami menghimbau kepada Bapak/Ibu/Wali untuk dapat memastikan siswa telah tiba di rumah dengan selamat. Apabila ada kendala dalam perjalanan, dimohon untuk segera menghubungi pihak sekolah.

                    _*Pesan ini terkirim secara otomatis oleh sistem, dimohon untuk tidak membalas pesan ini!_
                `)
            }

            const created = await LogAbsensi.create({
                nisn,
                status_siswa,
                status_pesan: 'pending',
                pesan
            });

            if (no_hp) {
                try {
                    await delay(3000);
                    await whatsappClient.sendMessage(phone, pesan)
                    await created.update({ status_pesan: 'terkirim' });

                    io.emit('push:toast', {
                        message: `Pesan terkirim ke ${no_hp}`,
                        type: 'success'
                    });
                } catch (error) {
                    await created.update({ status_pesan: 'gagal' });
                    return res.status(500).json({
                        message: `Pesan gagal terkirim ke ${no_hp}`,
                        type: 'warning'
                    });
                }
            }

            io.emit('log-absensi:baru', {
                id: created.id,
                id_sidik_jari,
                nama_lengkap,
                kelas,
                waktu,
                status_siswa,
                status_pesan: 'pending'
            });

            io.emit('push:toast', {
                message: `Absensi berhasil disimpan dengan nama ${nama_lengkap}`,
                type: 'success'
            });

            res.status(200).json({ created });
        } catch (error) {
            return res.status(500).json({
                message: 'Terjadi kesalahan saat menyimpan data!',
                type: 'danger'
            });
        }
    },

    viewData: async (req, res) => {
        const { id } = req.params;
        const data = await LogAbsensi.findOne({
            where: {
                id
            },
            include: {
                model: DataSiswa,
                as: 'siswa'
            }
        });

        try {
            res.render('pages/form_log_absensi', {
                layout: false,
                title: false,
                is_create: false,
                data
            })
        } catch (error) {
            
        }
    }
}