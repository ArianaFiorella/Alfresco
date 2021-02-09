var query1 = "TYPE:\"rdep:entregable\" AND @rdep\\:fechaEntrega:[NOW+60DAYS TO NOW+2YEARS] AND PATH:\"/app:company_home/st:sites/cm:domain-consulting/cm:documentLibrary/cm:PROYECTOS//*\"";
crearReporte(query1);

function crearReporte(query){
    var cantEntregables =0;
    var entregables = new Array();
    var nodes = search.luceneSearch(query);
    var log = "";
    var logFile = null;
    var folderReportes = null;
    var cantEntregables=0;
    var sitio= companyhome.childByNamePath("/sites/domain-consulting/documentLibrary/Reportes");
    folderReportes = sitio.childByNamePath("Reportes de entregables");
    if (folderReportes == null)
    {
      folderReportes = sitio.createFolder("Reportes de entregables");
    }

    log = "PROYECTO;CLIENTE;ENTREGABLE;SERVICIO;FECHA LIMITE;PROCESO;ESTADO"+"\r\n";


    for each(var nod in nodes){
        
        var nameChange=nod.name.replace(nod.properties["rdep:codigoBases"]+"-","");
        nameChange=nameChange.replace(nod.properties["rdep:siglasCliente"]+"-","");
        nameChange=nameChange.replace("-"+nod.properties["rdep:servicio"],"");

        var fechaLimite=new Date(nod.properties["rdep:fechaEntrega"]);
        var anioLimite= fechaLimite.getFullYear();
        var mesLimite= fechaLimite.getMonth();
        var diaLimite= fechaLimite.getDay();
        var fechaLimiteChange=anioLimite+"/"+mesLimite+"/"+diaLimite;

        log+=nod.properties["rdep:codigoProyecto"]+";"+
             nod.properties["rdep:siglasCliente"]+";"+
             nameChange+";"+
             nod.properties["rdep:servicio"]+";"+
             fechaLimiteChange+";"+
             nod.properties["rdep:codigoBases"]+";"+"\r\n";
        cantEntregables=cantEntregables+1;
    }    
    
    var fecha = new Date();
    var anioActual= fecha.getFullYear()
    var mesActual= validDigitTime(fecha.getMonth());
    var timestamp= " "+anioActual + "-" + mesActual + "-" + validDigitTime(fecha.getDay())+ " " + validDigitTime(fecha.getHours()) + "-" + validDigitTime(fecha.getMinutes())+ "-" + validDigitTime(fecha.getSeconds())+" ";
    if (cantEntregables>0) {
        logFile = folderReportes.createFile("Reporte de entregables "+timestamp+".csv");
        logFile.content = log;
        logFile.save();
    } 
}

function validDigitTime(time){
    if(time.toString().length==1){
            time="0"+time;
        }
    return time;
}