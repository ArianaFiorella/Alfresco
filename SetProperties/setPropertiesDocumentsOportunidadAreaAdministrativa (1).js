var typeDocumento = document.typeShort;

if(typeDocumento!="rdog:oportunidad"){
	var spPath = (document.displayPath).replace("/Espacio de empresa/", "").replace("/Company Home/", "").split("/");
	var folderPath = companyhome.childByNamePath(spPath[0]+"/"+spPath[1]+"/"+spPath[2]+"/"+spPath[3]+"/"+spPath[4]+"/"+spPath[5]+"/"+spPath[6]);
	if (folderPath!=null) {
		var typeproject = folderPath.typeShort;	
		if(typeproject=="rdog:oportunidad"){
			if (typeDocumento == "rdtr:tdr") {
				document.properties.title=folderPath.properties["rdog:codigoBases"];
				document.properties.description=folderPath.properties["rdog:siglasCliente"];
				document.properties["rdtr:codigoTDR"]=folderPath.properties["rdog:codigoBases"];
				document.properties["rdtr:nombreProyecto"]=folderPath.properties["rdog:nombreOportunidad"];
				document.properties["rdtr:siglasCliente"]=folderPath.properties["rdog:siglasCliente"];
				document.properties["rdtr:razonSocialCliente"]=folderPath.properties["rdog:razonSocialCliente"];
				document.save();
			}
		}
	}
	
				
}else if (typeDocumento=="rdog:oportunidad"){
	buscardocumentosheredando(document);
}
function buscardocumentosheredando(carpeta){
	for each(var folder in carpeta.children){
		buscardocumentosheredando(folder);
		var type=folder.typeShort;
		if(type=="rdtr:tdr"){
			folder.properties.title=document.properties["rdog:codigoBases"];
			folder.properties.description=document.properties["rdog:siglasCliente"];
			folder.properties["rdtr:codigoTDR"]=document.properties["rdog:codigoBases"];
			folder.properties["rdtr:nombreProyecto"]=document.properties["rdog:nombreOportunidad"];
			folder.properties["rdtr:siglasCliente"]=document.properties["rdog:siglasCliente"];
			folder.properties["rdtr:razonSocialCliente"]=document.properties["rdog:razonSocialCliente"];
			folder.save();
		} 
	}
	
}

