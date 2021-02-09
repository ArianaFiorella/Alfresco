sendMail();
    

function sendMail() {
    var fecha = new Date();
    var month = new Array();
    month[0] = "Enero";
    month[1] = "Febrero";
    month[2] = "Marzo";
    month[3] = "Abril";
    month[4] = "Mayo";
    month[5] = "Junio";
    month[6] = "Julio";
    month[7] = "Agosto";
    month[8] = "Setiembre";
    month[9] = "Octubre";
    month[10] = "Noviembre";
    month[11] = "Diciembre";
    var logFile = null;
    var folderReportes = null;
    //carpeta contenedora de reportes
    var cantDocumentos=0;
    var sitio= companyhome.childByNamePath("/sites/area-de-construccion-industrial/documentLibrary/Reportes");
    folderReportes = sitio.childByNamePath("Reportes de Vencimientos");
  
    if (folderReportes == null)
    {
      folderReportes = sitio.createFolder("Reportes de Vencimientos");

    }
    
    var fechaActual= fecha.getFullYear() + " "+month[fecha.getMonth()] + " " + fecha.getDay()  + "-" + fecha.getHours() + "-" + fecha.getMinutes();
    
    log = "Nombre;Ruta;Link;Propiedad;Fecha de Vencimiento"+"\r\n";

    


    var query1 = "TYPE:\"rcto:trabajador\"  AND @rcto\\:fechaCaducidadDNI:[NOW TO NOW+7DAYS ]";

    var query2 = "TYPE:\"rcto:trabajador\"  AND @rcto\\:fechaCaducidadEMO:[NOW TO NOW+7DAYS ]";

    var query3 = "TYPE:\"rcto:trabajador\"  AND @rcto\\:fechaCaducidadRETCC:[NOW TO NOW+7DAYS ]";

    var query4 = "TYPE:\"rcto:trabajador\"  AND @rcto\\:fechaCaducidadSCTR:[NOW TO NOW+7DAYS ]";

    var query5 = "TYPE:\"rcto:trabajador\"  AND @rcto\\:fechaCaducidadAntPenales:[NOW TO NOW+7DAYS ]";

    var query6 = "TYPE:\"rcto:trabajador\"  AND @rcto\\:fechaCaducidadAntPoliciales:[NOW TO NOW+7DAYS ]";


    var nodes = search.luceneSearch(query1);
    for each( var nod in nodes){

        var pathnode="https://casp1.aasa.com.pe/sharedev/page/document-details?nodeRef=workspace://SpacesStore/"+nod.id;
        if(nod.properties["rcto:estadoTrabajador"]== "ACTIVO"){
        log+=nod.name+";"+nod.displayPath+";"+pathnode+";DNI;"+nod.properties["rcto:fechaCaducidadDNI"]+"\r\n";
        cantDocumentos=cantDocumentos+1;
        }
    }
    
    nodes = search.luceneSearch(query2);
    for each( var nod in nodes){

        var pathnode="https://casp1.aasa.com.pe/sharedev/page/document-details?nodeRef=workspace://SpacesStore/"+nod.id;
        if(nod.properties["rcto:estadoTrabajador"]== "ACTIVO"){
        log+=nod.name+";"+nod.displayPath+";"+pathnode+";EMO;"+nod.properties["rcto:fechaCaducidadEMO"]+"\r\n";
        cantDocumentos=cantDocumentos+1;    
        }
    }
    
    nodes = search.luceneSearch(query3);
    
    for each( var nod in nodes){

        var pathnode="https://casp1.aasa.com.pe/sharedev/page/document-details?nodeRef=workspace://SpacesStore/"+nod.id;
        if(nod.properties["rcto:estadoTrabajador"]== "ACTIVO"){
        log+=nod.name+";"+nod.displayPath+";"+pathnode+";RETCC;"+nod.properties["rcto:fechaCaducidadRETCC"]+"\r\n";
        cantDocumentos=cantDocumentos+1;
        }
    }

    nodes = search.luceneSearch(query4);

    for each( var nod in nodes){

        var pathnode="https://casp1.aasa.com.pe/sharedev/page/document-details?nodeRef=workspace://SpacesStore/"+nod.id;
        if(nod.properties["rcto:estadoTrabajador"]== "ACTIVO"){
        log+=nod.name+";"+nod.displayPath+";"+pathnode+";SCTR;"+nod.properties["rcto:fechaCaducidadSCTR"]+"\r\n";
        cantDocumentos=cantDocumentos+1;
        }
    }

    nodes = search.luceneSearch(query5);
    for each( var nod in nodes){

        var pathnode="https://casp1.aasa.com.pe/sharedev/page/document-details?nodeRef=workspace://SpacesStore/"+nod.id;
        if(nod.properties["rcto:estadoTrabajador"]== "ACTIVO"){
        log+=nod.name+";"+nod.displayPath+";"+pathnode+";ANTECEDENTES PENALES;"+nod.properties["rcto:fechaCaducidadAntPenales"]+"\r\n";
        cantDocumentos=cantDocumentos+1;
        }
    }

    nodes = search.luceneSearch(query6);
    for each( var nod in nodes){

        var pathnode="https://casp1.aasa.com.pe/sharedev/page/document-details?nodeRef=workspace://SpacesStore/"+nod.id;
        if(nod.properties["rcto:estadoTrabajador"]== "ACTIVO"){
        log+=nod.name+";"+nod.displayPath+";"+pathnode+";ANTECEDENTES POLICIALES;"+nod.properties["rcto:fechaCaducidadAntPenales"]+"\r\n";
        cantDocumentos=cantDocumentos+1;
        }
    }

    
    //Creacion del CSV
    if (cantDocumentos>0) {
        logFile = folderReportes.createFile("Reporte de documentos por vencer  "+fechaActual+".csv");
        logFile.content = log;
        logFile.save();
    }
    //Envio de correo si la notificacion esta activa
    var estadoNotifi = folderReportes.properties["rcrc:estadoNotificacion"];
        if (estadoNotifi=="ACTIVO") {
            var asunto = folderReportes.properties["rcrc:asuntoReporte"];
            if (folderReportes.properties["rcrc:emailReporte"].indexOf(",")=="-1") {
                var correos = folderReportes.properties["rcrc:emailReporte"];
            }else{
                var correos = folderReportes.properties["rcrc:emailReporte"].split(",");
            }        
            var mail = actions.create("mail");
            mail.parameters.to_many = correos;
            mail.parameters.subject = asunto;
            mail.parameters.from = "soporte@domain.com.pe";
            mail.parameters.template=companyhome.childByNamePath("Data Dictionary/Email Templates/Notify Email Templates/notify_report_email.html.ftl");
            var templateArgs = new Array();
           // var link="";
            //var texto;
            if (cantDocumentos==0) {
                textoprincipal = "No se han encontrado documentos por vencer para los próximos 7 días";
                textosecundario = "";
                link="";
            }else{
                
                textoprincipal = "Se han encontrado " + cantDocumentos+" documentos por vencer.\n ";
                textosecundario = "Puede encontrar los detalles en el documento :  "+logFile.name+"\n dentro de la carpeta DocumentLibrary/Reportes/Reporte de Vencimientos/ en el Sitio de Construcción Industrial";
                //link = logFile.name;
            }    
            templateArgs['textopri']= textoprincipal;
            templateArgs['textosec']= textosecundario;
            //templateArgs['link']=link;
            var templateModel = new Array();
            templateModel['mensaje'] = templateArgs;
            mail.parameters.template_model = templateModel;
            mail.execute(companyhome);
        }
             

    
}
