const cds = require('@sap/cds');
const employeeHandler = require('./handler/employeeHandler');
const helperFunction = require('./handler/helperFunction')

module.exports = cds.service.impl(async (srv) =>{
    await employeeHandler(srv);
    await helperFunction(srv);

})