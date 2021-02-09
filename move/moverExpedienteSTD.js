
validDocument();

function validDocument(){
	var typeDocumento = document.typeShort;
	var estadoDigitalizacion=document.properties["rmeg:estadoDigitalizacionExpediente"];
	if(typeDocumento=="rmeg:expediente"){
		moveDocument();
	}
}

function moveDocument(){
	var fecha = new Date();
	var anioActual= fecha.getFullYear()
	var mesActual= validDigitTime(fecha.getMonth()+1);
	var diaActual= validDigitTime(fecha.getDate())
	var timestamp= " "+anioActual + "-" + mesActual + "-" + diaActual + " " + validDigitTime(fecha.getHours()) + "-" + validDigitTime(fecha.getMinutes())+ "-" + validDigitTime(fecha.getSeconds())+" ";
	var folderAnioExpediente = null;
	var folderMesExpediente = null;
	var sitio= companyhome.childByNamePath("Sites/std/documentLibrary/Digitalizacion");
	    
	folderAnioExpediente = sitio.childByNamePath(anioActual);
	    if (folderAnioExpediente == null){
	        folderAnioExpediente = sitio.createFolder(anioActual);
	    }

	folderMesExpediente = folderAnioExpediente.childByNamePath(mesActual);
	    if (folderMesExpediente == null){
	        folderMesExpediente = folderAnioExpediente.createFolder(mesActual);
	    }

	folderDiaExpediente = folderMesExpediente.childByNamePath(diaActual);
	    if (folderDiaExpediente == null){
	        folderDiaExpediente = folderMesExpediente.createFolder(diaActual);
	    }
	document.properties.name = "ED "+timestamp + document.properties.name;
	document.properties["rmeg:codigoBarrasExpediente"]=removeCharacter(document.properties["rmeg:codigoBarrasExpediente"]);
	document.save();
	document.move(companyhome.childByNamePath("Sites/std/documentLibrary/Digitalizacion"+"/"+anioActual+"/"+mesActual+"/"+diaActual));

}

function validDigitTime(time){
	if(time.toString().length==1){
			time="0"+time;
		}
	return time;
}

function removeCharacter(codBarras){
	if(isNaN(codBarras)){
	    codBarras=codBarras.replace(codBarras.charAt(0),"");
	} else if(codBarras.charAt(0)=='-' || codBarras.charAt(0)=='+'){
	    codBarras=codBarras.replace(codBarras.charAt(0),"");
	}
	return codBarras;
}