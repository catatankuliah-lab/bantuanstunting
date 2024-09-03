const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const HakAkses = require('../models/hakAksesModel');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const addUser = async (req, res) => {
    const {
        id_hak_akses,
        username,
        password,
        nama_user,
        status_user
    } = req.body;

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            id_hak_akses,
            username,
            password: hashedPassword,
            nama_user,
            status_user
        });
        res.status(200).send(newUser);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllUser = async (req, res) => {
    try {
        const user = await User.findAll({
            include: {
                model: HakAkses,
                as: 'hak_akses',
                attributes: ['deskripsi_hak_akses']
            }
        });
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const getLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, 'secret_key', { expiresIn: '1h' });

        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addUser,
    getAllUser,
    getLogin
};
