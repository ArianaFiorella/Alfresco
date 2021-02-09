
setName();

function setName(){
	var typeDocumento = document.typeShort;
	if(document.isDocument||typeDocumento=="rdep:entregable"||typeDocumento=="rdcg:carpeta"){

		var spPath = (document.displayPath).replace("/Espacio de empresa/", "").
			replace("/Company Home/", "").split("/");
		var folderPath = companyhome.childByNamePath(spPath[0]+"/"+spPath[1]+"/"+
			spPath[2]+"/"+spPath[3]+"/"+spPath[4]+"/"+spPath[5]+"/"+spPath[6]);
		var type = folderPath.typeShort;
		var flag = false;
		if(type=="rdpg:proyecto"){
			var newname = document.properties.name;
			if(newname.indexOf("[Codigo de proyecto]")!= -1){
				newname = newname.replace("[Codigo de proyecto]",folderPath.properties["rdpg:codigoProyecto"]);
				flag = true;
			}
			if(newname.indexOf("[Siglas del cliente]")!= -1){
				newname = newname.replace("[Siglas del cliente]",folderPath.properties["rdpg:siglasCliente"]);
				flag = true;
			}
			if(newname.indexOf("[Estado]")!= -1){
				newname = newname.replace("[Estado]",folderPath.properties["rdpg:estadoProyecto"]);
				flag = true;
			}
			if(!flag){
				var extensionDoc = getExtension(document.properties.name);
				if (typeDocumento=="cm:content" && isValid(extensionDoc)==true){
					if(newname.split("-")[0] != folderPath.properties["rdpg:codigoProyecto"] || newname.split("-")[1] != folderPath.properties["rdpg:siglasCliente"]){
						//newname = newname.replace("null-","").replace("null-","");
						if(newname.split("-")[0].charAt(0)=="P" || newname.split("-")[0]=="null"){
							if(newname.split("-").length==2){	
								var cleaned=newname.replace(newname.split("-")[0],"").replace("-","").replace("null-","").replace("null-","");
								document.properties.name = cleaned;
								document.save();
						}else if(newname.split("-").length>=3){	
								var cleaned=newname.replace(newname.split("-")[0],"").replace(newname.split("-")[1],"").replace("--","").replace("null-","").replace("null-","");
								document.properties.name = cleaned;
								document.save();
							}
						}
						if (folderPath.properties["rdpg:codigoProyecto"]!="" && folderPath.properties["rdpg:siglasCliente"]!=""){
							document.properties.name = folderPath.properties["rdpg:codigoProyecto"] + "-" + folderPath.properties["rdpg:siglasCliente"] + "-" + document.properties.name;
							document.save();
						}else{
							document.properties.name = document.properties.name;
							document.save();
						}
					}

				}else if (typeDocumento=="rdep:entregable"||typeDocumento=="rdcg:carpeta") {
					if(newname.split("-")[0] != folderPath.properties["rdpg:codigoBases"] || newname.split("-")[1] != folderPath.properties["rdpg:siglasCliente"]){
					//newname = newname.replace("null-","").replace("null-","");
						if(newname.split("-")[0].charAt(0)=="A" || newname.split("-")[0].charAt(0)=="L" || newname.split("-")[0]=="null"){
							
							if(newname.split("-").length==3){	
								var cleaned=newname.replace(newname.split("-")[0],"").replace(newname.split("-")[1],"").replace("--","").replace("null-","").replace("null-","");
								document.properties.name = cleaned;
								document.save();
							}else if(newname.split("-").length>=5){	
								var cleaned=newname.replace(newname.split("-")[0],"").replace(newname.split("-")[1],"").replace(newname.split("-")[2],"").replace(newname.split("-")[3],"").replace("----","").replace("null-","").replace("null-","");
								document.properties.name = cleaned;
								document.save();
							}
						}
						if (folderPath.properties["rdpg:codigoBases"]!="" && folderPath.properties["rdpg:siglasCliente"]!=""){
							document.properties.name = folderPath.properties["rdpg:codigoBases"] + "-" + folderPath.properties["rdpg:siglasCliente"] + "-" + document.properties.name;
							document.save();
						}else{
							document.properties.name = document.properties.name;
							document.save();
						}
					}

				}
			}else{
				document.properties.name = newname;
				document.save();
			}
		}else if(type=="rdog:oportunidad"){
			var newname = document.properties.name;
			if(newname.indexOf("[Codigo de la oportunidad]")!= -1){
				newname = newname.replace("[Codigo de la oportunidad]",folderPath.properties["rdog:codigoOportunidad"]);
				flag = true;
			}
			if(newname.indexOf("[Siglas del cliente]")!= -1){
				newname = newname.replace("[Siglas del cliente]",folderPath.properties["rdog:siglasCliente"]);
				flag = true;
			}
			if(newname.indexOf("[Estado]")!= -1){
				newname = newname.replace("[Estado]",folderPath.properties["rdog:estadoOportunidad"]);
				flag = true;
			}
			if(!flag){
				if(newname.split("-")[0] != folderPath.properties["rdog:codigoOportunidad"] || newname.split("-")[1] != folderPath.properties["rdog:siglasCliente"]){
					if(newname.split("-")[0].charAt(0)=="O" || newname.split("-")[0]=="null"){
						if(newname.split("-").length==2){	
							var cleaned=newname.replace(newname.split("-")[0],"").replace("-","").replace("-","").replace("null-","").replace("null-","");
							document.properties.name = cleaned;
							document.save();
						}else if(newname.split("-").length>=3){	
							var cleaned=newname.replace(newname.split("-")[0],"").replace(newname.split("-")[1],"").replace("--","").replace("-","").replace("null-","").replace("null-","");
							document.properties.name = cleaned;
							document.save();
						}
					}
					if (folderPath.properties["rdog:codigoOportunidad"]!="" && folderPath.properties["rdog:siglasCliente"]!=""){
						document.properties.name = folderPath.properties["rdog:codigoOportunidad"] + "-" + folderPath.properties["rdog:siglasCliente"] + "-" + document.properties.name;
						document.save();
					}else{
						document.properties.name = document.properties.name;
						document.save()
					}
				}
			}else{
				document.properties.name = newname;
				document.save();
			}
		}
	}
}

function isValid(extension){
	var valid=false;
	var acceptedExt = new Array("pdf","docx","pptx","xlsx","csv");
	for (var i = acceptedExt.length - 1; i >= 0; i--) {
		if (extension == acceptedExt[i]){
			valid = true;
		}
	}
	return valid;

}

function getExtension(fileName){
    var ch;
    var len;
    if(fileName==null || (len = fileName.length==0 || (ch = fileName.charAt(len-1))=='/' || ch=='\\' || ch=='.' )){//in the case of . or ..
        return "";
	}
    var dotInd = fileName.lastIndexOf('.'),
        sepInd = Math.max(fileName.lastIndexOf('/'), fileName.lastIndexOf('\\'));
    if( dotInd<=sepInd ){
        return "";
    }
    else{
        return fileName.substring(dotInd+1).toLowerCase();
    }
}
