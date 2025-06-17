module.exports = async(srv) =>{

    srv.on('calculateSum', async (req) =>{
        const {firstNum, secondNum} = req.data
        console.log("REq data",  req.data);
        return {
        "message" : "Still Pending",
        "result" : firstNum + secondNum
        }
    })
}