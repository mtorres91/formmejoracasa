const { request }= require('express');
const nodeMailer = require ('nodemailer');
require('dotenv').config();



const envioCorreo = (req=request,resp=response) =>{
    let body = req.body;


    let config = nodeMailer.createTransport({

        host:'smtp.gmail.com',
        post:587,
        auth:{
        user:'teatendemosorpotunidad@gmail.com',
        pass:'nvzvwapckiqzljgg'
    }
    });

    const opciones = {
        from: 'Programacion',
        subject: body.asunto,
        to:body.email,
        html:body.mensaje
    };

    config.sendMail(opciones,function(error,result){

        if (error) return resp.json({ok:false,msg:error});

        return resp.json({
        ok: true,
        msg: result
    });
    })
    
}

module.exports = {
    envioCorreo
}
