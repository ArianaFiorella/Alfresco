sendMail();
    

function sendMail() {
    var logFile = null;
        var folderReportes = null;
        var cantDocumentos=0;
        var sitio= companyhome.childByNamePath("/sites/area-administrativa/documentLibrary/REPORTES");
        folderReportes = sitio.childByNamePath("Reportes de vencimientos");
        if (folderReportes == null){
          folderReportes = sitio.createFolder("Reportes de Vencimientos");
        }
        var estadoNotifi = folderReportes.properties.title;
    if (estadoNotifi=="ACTIVO") {       
        var fecha = new Date();
        var month = new Array();
        month[0] = "ENERO";
        month[1] = "FEBRERO";
        month[2] = "MARZO";
        month[3] = "ABRIL";
        month[4] = "MAYO";
        month[5] = "JUNIO";
        month[6] = "JULIO";
        month[7] = "AGOSTO";
        month[8] = "SETIEMBRE";
        month[9] = "OCTUBRE";
        month[10] = "NOVIEMBRE";
        month[11] = "DICIEMBRE";
        
        var fechaActual= fecha.getFullYear() + " "+month[fecha.getMonth()] + " " + fecha.getDay()  + "-" + fecha.getHours() + "-" + fecha.getMinutes();
        var log = "EMPRESA;BASES;NOMBRE DE ARCHIVO;RUTA;LINK;FECHA DE VENCIMIENTO;ESTADO DEL PROYECTO"+"\r\n";
        var names = "";
        var query1 = "TYPE:\"rdcf:fianza\" AND @rdcf\\:fechaVencimiento:[NOW TO NOW+30DAYS] AND PATH:\"/app:company_home/st:sites/cm:itbussiness/cm:documentLibrary/cm:PROYECTOS//*\"";
        var query2 = "TYPE:\"rdcf:fianza\" AND @rdcf\\:fechaVencimiento:[NOW TO NOW+30DAYS] AND PATH:\"/app:company_home/st:sites/cm:domain-consulting/cm:documentLibrary/cm:PROYECTOS//*\"";

        var nodes = search.luceneSearch(query1);
        for each(var nod in nodes){
            var pathnode="http://207.246.68.112:9090/share/page/document-details?nodeRef=workspace://SpacesStore/"+nod.id;
            var fechaVencimiento=nod.properties["rdcf:fechaVencimiento"]+"".replace(" 00:00:00 GMT-0500 (PET)","");
            fechaVencimiento= fechaVencimiento.replace("Mon","Lunes");
            fechaVencimiento= fechaVencimiento.replace("Tue","Martes");
            fechaVencimiento= fechaVencimiento.replace("Wed","Miercoles");
            fechaVencimiento= fechaVencimiento.replace("Thu","Jueves");
            fechaVencimiento= fechaVencimiento.replace("Fri","Viernes");
            fechaVencimiento= fechaVencimiento.replace("Sat","Sabado");
            fechaVencimiento= fechaVencimiento.replace("Sun","Domingo");            
            log+="IBUSSINESS"+";"+nod.properties["rdcf:codigoBases"]+";"+nod.name+";"+nod.displayPath.replace("/Company Home/Sites/domain-consulting/documentLibrary/","")+";"+pathnode+";"+fechaVencimiento+";"+nod.properties["rdcf:estadoProyecto"]+";"+"\r\n";
                cantDocumentos=cantDocumentos+1;
                names+= nod.name+"   ;   ";
        }

        nodes = search.luceneSearch(query2);
        for each(var nod in nodes){
            var pathnode="http://207.246.68.112:9090/share/page/document-details?nodeRef=workspace://SpacesStore/"+nod.id;
            var fechaVencimiento=nod.properties["rdcf:fechaVencimiento"]+"".replace(" 00:00:00 GMT-0500 (PET)","");
            fechaVencimiento= fechaVencimiento.replace("Mon","Lunes");
            fechaVencimiento= fechaVencimiento.replace("Tue","Martes");
            fechaVencimiento= fechaVencimiento.replace("Wed","Miercoles"); 
            fechaVencimiento= fechaVencimiento.replace("Thu","Jueves");
            fechaVencimiento= fechaVencimiento.replace("Fri","Viernes");
            fechaVencimiento= fechaVencimiento.replace("Sat","Sabado");
            fechaVencimiento= fechaVencimiento.replace("Sun","Domingo");                
            log+="DOMAIN CONSULTING"+";"+nod.properties["rdcf:codigoBases"]+";"+nod.name+";"+nod.displayPath.replace("/Company Home/Sites/domain-consulting/documentLibrary/","")+";"+pathnode+";"+fechaVencimiento+";"+nod.properties["rdcf:estadoProyecto"]+";"+"\r\n";
                cantDocumentos=cantDocumentos+1;
                names+= nod.name+"   ;   ";
        }

        if (cantDocumentos>0) {
            logFile = folderReportes.createFile(fechaActual+" Reporte de cartas por vencer"+".csv");
            logFile.content = log;
            logFile.save();
        }
        
        var asunto = "ALFRESCO - Reporte semanal de cartas fianza";
        var correos = "arosado@domain.com.pe,soporte@domain.com.pe,asistente@itbussiness.net,rgalindo@itbussiness.net".split(",");    
        var mail = actions.create("mail");
        mail.parameters.to_many = correos;
        mail.parameters.subject = asunto;
        mail.parameters.from = "soporte@domain.com.pe";
        mail.parameters.template=companyhome.childByNamePath("Data Dictionary/Email Templates/Notify Email Templates/notify_report_area_administrativa_email.html.ftl");
        var templateArgs = new Array();
        var link="";
        var textoprincipal="";
        var textosecundario="";
        //var nombresDocs="";

        if (cantDocumentos==0) {
            textoprincipal = "No se han encontrado cartas por vencer para los próximos 30 días";
            textosecundario = "";
            link="";
            names="";
        }else if(cantDocumentos==1){
            textoprincipal = "Se han encontrado el siguiente documento por vencer :"+"\n ";
            textosecundario = ". Puede encontrar mas detalles en el documento :  "+logFile.name+"\n  en  Reportes/Reporte de Vencimientos/ en el Sitio Area administrativa.";
            link = "Tambien puede acceder usando este link: http://207.246.68.112:9090/share/page/document-details?nodeRef=workspace://SpacesStore/"+logFile.id;
        }else{                
            textoprincipal = "Se han encontrado los siguientes " + cantDocumentos+" documentos por vencer :"+"\n ";
            /**/
            textosecundario = ". Puede encontrar mas detalles en el documento :  "+logFile.name+"\n  en  Reportes/Reporte de Vencimientos/ en el Sitio Area administrativa.";
            link = "Tambien puede acceder usando este link: http://207.246.68.112:9090/share/page/document-details?nodeRef=workspace://SpacesStore/"+logFile.id;
        }    
        templateArgs['textopri']= textoprincipal;
        templateArgs['cartas'] = names;
        templateArgs['textosec']= textosecundario;
        templateArgs['link']=link;
        var templateModel = new Array();
        templateModel['mensaje'] = templateArgs;
        mail.parameters.template_model = templateModel;
        mail.execute(companyhome);
    }
}