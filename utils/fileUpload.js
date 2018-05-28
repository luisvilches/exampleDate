const config = require('../settings');
const path = require('path');
const fs = require('fs');

function uploadFile(obj,name,folder){
    let date = new Date();
    let nombre_nuevo = name + date.getDate() + date.getSeconds() + date.getMilliseconds()+ "_file";
    let ruta_archivo = obj.path;
    let nueva_ruta = path.join(path.resolve(),'public',config.SERVER.media_url,folder ? folder:"",nombre_nuevo + path.extname(ruta_archivo).toLowerCase());//"."+ folder + nombre_nuevo + path.extname(ruta_archivo).toLowerCase();
    let nombre_imagen = nombre_nuevo + path.extname(ruta_archivo).toLowerCase();
    fs.createReadStream(ruta_archivo).pipe(fs.createWriteStream(nueva_ruta));
    return nombre_imagen;
}

module.exports = uploadFile;