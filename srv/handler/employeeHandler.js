module.exports = async (srv) =>{
    srv.before('READ', 'employeeRecord',async (req) =>{

        console.log("Reading Befor");    
  
      try {
        
      } catch (error) {
        return req.reject(400, "Error Found")
      }
    })

    srv.on('READ', 'employeeRecord', async(req) =>{

        console.log("Reading in on");
        
        return [{
            'message'  :"Successfully read"
        }]
    })

    srv.after('READ', 'employeeRecord', async(req) =>{

        console.log("Reading After....");
        
        return
    })
}