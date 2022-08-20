const getHour = async (req, res, next) =>{

    try{
        const actualHours = new Date().getHours();

        const actualMinutes = new Date().getMinutes();
        res.send({
            status: "Ok",
            hour: hour
        });
    } catch(error){
        next(error);
    }
};

module.exports = getHour;