

const cds = require('@sap/cds');
module.exports = cds.service.impl(async (srv) =>{
  const employeeCustomerHandler = require('./handler/employeeHandler')
  await employeeCustomerHandler(srv)
})