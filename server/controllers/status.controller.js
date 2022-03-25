const { Status } = require('../models');
const NotFound = require('../errors/NotFound');

exports.getStatuses = async (req,res)=>{
    const statuses = await Status.findAll();

    if(!statuses){
        throw new NotFound('Statutes not found');
    }

    res.status(200).send(statuses);
}