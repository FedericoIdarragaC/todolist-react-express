const {Router} = require('express');

const statusController = require('../controllers/status.controller');
const isAuthenticated = require('../middlewares/isAuthenticated');

const statusRouter = Router();

statusRouter.get('/',isAuthenticated,statusController.getStatuses)

module.exports = statusRouter;