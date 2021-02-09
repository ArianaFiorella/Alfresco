validEmail();

function validEmail(){
    
    var subject1 = "ALFRESCO SDC Reporte mensual de entregables para los proximos 30 dias";
    var subject2 = "ALFRESCO SITB Reporte mensual de entregables para los proximos 30 dias";
    var site1="Domain Consulting";
    var site2="ITBussiness";
    var recipients1 = "aguilar.arrieta.ariana.f@gmail.com,arapachambisistemas@gmail.com";
    var recipients2 = "aguilar.arrieta.ariana.f@gmail.com,arapachambisistemas@gmail.com";
    var query1 = "TYPE:\"rdep:entregable\" AND @rdep\\:fechaEntrega:[NOW TO NOW+30DAYS] AND PATH:\"/app:company_home/st:sites/cm:domain-consulting/cm:documentLibrary/cm:PROYECTOS//*\"";
    var query2 = "TYPE:\"rdep:entregable\" AND @rdep\\:fechaEntrega:[NOW TO NOW+30DAYS] AND PATH:\"/app:company_home/st:sites/cm:itbussiness/cm:documentLibrary/cm:PROYECTOS//*\"";
    enviarEmail(recipients1,subject1,query1,site1);
    enviarEmail(recipients2,subject2,query2,site2);
}

function enviarEmail(recipients, subject, query, site){
    var cantDocumentos =0;
    var entregables = new Array();
    var nodes = search.luceneSearch(query);
    var correos = recipients.split(",");    
    var mail = actions.create("mail");
    var templateArgs = new Array();
    var templateModel = new Array();
    var textoprincipal="";
    var textosecundario="";

    for each(var nod in nodes){               
        cantDocumentos=cantDocumentos+1;
        entregables.push(nod.name+" del proceso "+nod.properties["rdep:codigoBases"]);
    }    
    if (cantDocumentos==0) {
        textoprincipal = "No se han encontrado entregables para los próximos 30 días";
        textosecundario = "";
    }else if(cantDocumentos==1){
        textoprincipal = "Se han encontrado el siguiente entregable :"+"\n ";
        textosecundario = "Puede encontrar mas detalles en el la biblioteca de documentos de el sitio "+site+".";
    }else{                
        textoprincipal = "Se han encontrado los siguientes " + cantDocumentos+" entregables :"+"\n ";
        textosecundario = "Puede encontrar mas detalles en el la biblioteca de documentos de el sitio "+site+".";
    }

    templateArgs['textopri']= textoprincipal;
    templateArgs['textosec']= textosecundario;
    templateArgs['entregables'] = entregables;
    templateArgs['sitio']= site;
    templateModel['mensaje'] = templateArgs;
    mail.parameters.to_many = correos;
    mail.parameters.subject = subject;
    mail.parameters.from = "soporte@domain.com.pe";
    mail.parameters.template=companyhome.childByNamePath("Data Dictionary/Email Templates/Notify Email Templates/notify_report_entregables_email.html.ftl");
    mail.parameters.template_model = templateModel;
    mail.execute(companyhome);

}