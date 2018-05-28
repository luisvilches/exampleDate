const actual = new Date();
const table = [];
const noDisponibles = [2,4,16,18,25,29];
const horario = {inicio:'13:00',fin:'18:00'};

const meses = new Array(12);
meses[0]='Enero';
meses[1]='Febrero';
meses[2]='Marzo';
meses[3]='Abril';
meses[4]='Mayo';
meses[5]='Junio';
meses[6]='Julio';
meses[7]='Agosto';
meses[8]='Septiembre';
meses[9]='Octubre';
meses[10]='Noviembre';
meses[11]='Diciembre';

const dias = new Array(12);
dias[0]=31;
dias[1]=28;
dias[2]=31;
dias[3]=30;
dias[4]=31;
dias[5]=30;
dias[6]=31;
dias[7]=31;
dias[8]=30;
dias[9]=31;
dias[10]=30;
dias[11]=31;

const horas = new Array(24);
horas[1] = '01:00';
horas[2] = '02:00';
horas[3] = '03:00';
horas[4] = '04:00';
horas[5] = '05:00';
horas[6] = '06:00';
horas[7] = '07:00';
horas[8] = '08:00';
horas[9] = '09:00';
horas[10] = '10:00';
horas[11] = '11:00';
horas[12] = '12:00';
horas[13] = '13:00';
horas[14] = '14:00';
horas[15] = '15:00';
horas[16] = '16:00';
horas[17] = '17:00';
horas[18] = '18:00';
horas[19] = '19:00';
horas[20] = '20:00';
horas[21] = '21:00';
horas[22] = '22:00';
horas[23] = '23:00';
horas[24] = '24:00';


function calendar(year,month,noDisponibles){
    let mes = []
    for(var i = 1; i <= dias[month]; i++){
        if(!noDisponibles.includes(i)){
            let dia = []
            for(var d = 1; d <= horas.length; d++){
                if(horas[d] >= horario.inicio && horas[d] <= horario.fin){
                    dia.push({hour:horas[d],reserv:''});
                }
            }
            mes.push({dia:i,hours:dia});
        }
    }
    var anio = []
    anio.push({month:meses[month],days:mes});
    table.push({anio:actual.getFullYear(),months:anio});
}


function mesString(num){
    return meses[num];
}


function reservarHora(dia,mes,hora,idClient){
    if(typeof idClient != 'string'){
        idClient = String(idClient);
    }

    var day = table.find(a => {
        if(a.anio === actual.getFullYear()){
            a.months.find(m => {
                if(m.month === mesString(mes)){
                    m.days.find(d => {
                        if(d.dia === dia){
                            d.hours.find(h => {
                                if(h.hour === hora){
                                    h.reserv = idClient;
                                }
                            })
                        }
                    })
                }
            })
        }
    });
    console.log('hora actualizada => ',consultarHora(dia,mes,hora))
}




function consultarHora(dia,mes,hora){
    var hour;
    var day =  table.find(a => {
        if(a.anio === actual.getFullYear()){
             a.months.find(m => {
                if(m.month === mesString(mes)){
                     m.days.find(d => {
                        if(d.dia === dia){
                             d.hours.find(h => {
                                if(h.hour === hora){
                                    hour = h;
                                }
                            })
                        }
                    })
                }
            })
        }
    });

    return hour;
}

function horasDisponibles(dia,mes){
    var disponibles = [];
    var day = table.find(a => {
        if(a.anio === actual.getFullYear()){
             a.months.find(m => {
                if(m.month === mesString(mes)){
                     m.days.find(d => {
                        if(d.dia === dia){
                             d.hours.find(h => {
                                if(h.reserv === ''){
                                    disponibles.push(h);
                                }
                            })
                        }
                    })
                }
            })
        }
    });

    return disponibles;
}


calendar(actual.getFullYear(),actual.getMonth(),noDisponibles);
reservarHora(3,actual.getMonth(),'18:00','13456');
console.log(table)
console.log('horas disponibles =>',horasDisponibles(3,actual.getMonth()))