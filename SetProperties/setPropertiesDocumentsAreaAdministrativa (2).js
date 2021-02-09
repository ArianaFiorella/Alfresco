var typeDocumento = document.typeShort;

if(typeDocumento!="rdpg:proyecto"){
	var spPath = (document.displayPath).replace("/Espacio de empresa/", "").replace("/Company Home/", "").split("/");
	var folderPath = companyhome.childByNamePath(spPath[0]+"/"+spPath[1]+"/"+spPath[2]+"/"+spPath[3]+"/"+spPath[4]+"/"+spPath[5]+"/"+spPath[6]);
	//var adjudicacionPath= companyhome.childByNamePath(spPath[0]+"/"+spPath[1]+"/"+spPath[2]+"/"+spPath[3]+"/"+spPath[4]+"/"+spPath[5]+"/"+spPath[6]+"/"+spPath[7]);
	if (folderPath!=null) {
		var typeproject = folderPath.typeShort;	
		if(typeproject=="rdpg:proyecto"){
				if (typeDocumento == "rdcf:fianza") {
							document.properties.title=folderPath.properties["rdpg:codigoBases"];
							document.properties.description=folderPath.properties["rdpg:siglasCliente"];
							document.properties["rdcf:codigoProyecto"]=folderPath.properties["rdpg:codigoProyecto"];
							document.properties["rdcf:codigoBases"]=folderPath.properties["rdpg:codigoBases"];
							document.properties["rdcf:nombreProyecto"]=folderPath.properties["rdpg:nombreProyecto"];
							document.properties["rdcf:siglasCliente"]=folderPath.properties["rdpg:siglasCliente"];
							document.properties["rdcf:razonSocialCliente"]=folderPath.properties["rdpg:razonSocialCliente"];
							document.properties["rdcf:estadoProyecto"]=folderPath.properties["rdpg:estadoProyecto"];
							document.save();
				} else if (typeDocumento == "rdoc:orden") {
							document.properties.title=folderPath.properties["rdpg:codigoBases"];
							document.properties.description=folderPath.properties["rdpg:siglasCliente"];
							document.properties["rdoc:codigoProyecto"]=folderPath.properties["rdpg:codigoProyecto"];
							document.properties["rdoc:codigoBases"]=folderPath.properties["rdpg:codigoBases"];
							document.properties["rdoc:nombreProyecto"]=folderPath.properties["rdpg:nombreProyecto"];
							document.properties["rdoc:siglasCliente"]=folderPath.properties["rdpg:siglasCliente"];
							document.properties["rdoc:razonSocialCliente"]=folderPath.properties["rdpg:razonSocialCliente"];
							document.save();
				}else if (typeDocumento == "rdcp:contrato") {
							document.properties.title=folderPath.properties["rdpg:codigoBases"];		
							document.properties.description=folderPath.properties["rdpg:siglasCliente"];
							document.properties["rdcp:codigoProyecto"]=folderPath.properties["rdpg:codigoProyecto"];
							document.properties["rdcp:codigoBases"]=folderPath.properties["rdpg:codigoBases"];
							document.properties["rdcp:nombreProyecto"]=folderPath.properties["rdpg:nombreProyecto"];
							document.properties["rdcp:siglasCliente"]=folderPath.properties["rdpg:siglasCliente"];
							document.properties["rdcp:razonSocialCliente"]=folderPath.properties["rdpg:razonSocialCliente"];
							document.save();

				}else if (typeDocumento == "rdcg:carpeta") {
							document.properties.title=folderPath.properties["rdpg:codigoBases"];		
							document.properties.description=folderPath.properties["rdpg:siglasCliente"];
							document.properties["rdcg:codigoProyecto"]=folderPath.properties["rdpg:codigoProyecto"];
							document.properties["rdcg:codigoBases"]=folderPath.properties["rdpg:codigoBases"];
							document.properties["rdcg:nombreProyecto"]=folderPath.properties["rdpg:nombreProyecto"];
							document.properties["rdcg:siglasCliente"]=folderPath.properties["rdpg:siglasCliente"];
							document.properties["rdcg:razonSocialCliente"]=folderPath.properties["rdpg:razonSocialCliente"];
							document.properties["rdcg:estadoProyecto"]=folderPath.properties["rdpg:estadoProyecto"];
							document.save();

				}else if (typeDocumento == "rdep:entregable") {
							document.properties.title=folderPath.properties["rdpg:codigoBases"];		
							document.properties["rdep:codigoProyecto"]=folderPath.properties["rdpg:codigoProyecto"];
							document.properties["rdep:codigoBases"]=folderPath.properties["rdpg:codigoBases"];
							document.properties["rdep:nombreProyecto"]=folderPath.properties["rdpg:nombreProyecto"];
							document.properties["rdep:siglasCliente"]=folderPath.properties["rdpg:siglasCliente"];
							document.properties["rdep:razonSocialCliente"]=folderPath.properties["rdpg:razonSocialCliente"];
							document.save();

				}else if (typeDocumento == "rdrg:registro") {
							document.properties.title=folderPath.properties["rdpg:codigoBases"];		
							document.properties.description=folderPath.properties["rdpg:siglasCliente"];
							document.properties["rdrg:codigoProyecto"]=folderPath.properties["rdpg:codigoProyecto"];
							document.properties["rdrg:codigoBases"]=folderPath.properties["rdpg:codigoBases"];
							document.properties["rdrg:nombreProyecto"]=folderPath.properties["rdpg:nombreProyecto"];
							document.properties["rdrg:siglasCliente"]=folderPath.properties["rdpg:siglasCliente"];
							document.properties["rdrg:razonSocialCliente"]=folderPath.properties["rdpg:razonSocialCliente"];
							document.properties["rdrg:estadoProyecto"]=folderPath.properties["rdpg:estadoProyecto"];
							document.save();

				}

		}
	}				
}else if (typeDocumento=="rdpg:proyecto"){
	buscardocumentosheredando(document);
}


function buscardocumentosheredando(carpeta){
	for each(var folder in carpeta.children){
		buscardocumentosheredando(folder);
		var type=folder.typeShort;
		if(type=="rdcf:fianza"){
			folder.properties.title=document.properties["rdpg:codigoBases"];
			folder.properties.description=document.properties["rdpg:siglasCliente"];
			folder.properties["rdcf:codigoProyecto"]=document.properties["rdpg:codigoProyecto"];
			folder.properties["rdcf:codigoBases"]=document.properties["rdpg:codigoBases"];
			folder.properties["rdcf:nombreProyecto"]=document.properties["rdpg:nombreProyecto"];
			folder.properties["rdcf:siglasCliente"]=document.properties["rdpg:siglasCliente"];
			folder.properties["rdcf:razonSocialCliente"]=document.properties["rdpg:razonSocialCliente"];
			folder.properties["rdcf:estadoProyecto"]=document.properties["rdpg:estadoProyecto"];
			folder.save();
		} else if (type == "rdoc:orden") {
			folder.properties.title=document.properties["rdpg:codigoBases"];
			folder.properties.description=document.properties["rdpg:siglasCliente"];
			folder.properties["rdoc:codigoProyecto"]=document.properties["rdpg:codigoProyecto"];
			folder.properties["rdoc:codigoBases"]=document.properties["rdpg:codigoBases"];
			folder.properties["rdoc:nombreProyecto"]=document.properties["rdpg:nombreProyecto"];
			folder.properties["rdoc:siglasCliente"]=document.properties["rdpg:siglasCliente"];
			folder.properties["rdoc:razonSocialCliente"]=document.properties["rdpg:razonSocialCliente"];
			folder.save();
		}else if (type == "rdcp:contrato") {
			folder.properties.title=document.properties["rdpg:codigoBases"];		
			folder.properties.description=document.properties["rdpg:siglasCliente"];
			folder.properties["rdcp:codigoProyecto"]=document.properties["rdpg:codigoProyecto"];
			folder.properties["rdcp:codigoBases"]=document.properties["rdpg:codigoBases"];
			folder.properties["rdcp:nombreProyecto"]=document.properties["rdpg:nombreProyecto"];
			folder.properties["rdcp:siglasCliente"]=document.properties["rdpg:siglasCliente"];
			folder.properties["rdcp:razonSocialCliente"]=document.properties["rdpg:razonSocialCliente"];
			folder.save();

		}else if (type == "rdcg:carpeta") {
			folder.properties.title=document.properties["rdpg:codigoBases"];		
			folder.properties.description=document.properties["rdpg:siglasCliente"];
			folder.properties["rdcg:codigoProyecto"]=document.properties["rdpg:codigoProyecto"];
			folder.properties["rdcg:codigoBases"]=document.properties["rdpg:codigoBases"];
			folder.properties["rdcg:nombreProyecto"]=document.properties["rdpg:nombreProyecto"];
			folder.properties["rdcg:siglasCliente"]=document.properties["rdpg:siglasCliente"];
			folder.properties["rdcg:razonSocialCliente"]=document.properties["rdpg:razonSocialCliente"];
			folder.properties["rdcg:estadoProyecto"]=document.properties["rdpg:estadoProyecto"];
			folder.save();

		}else if (type == "rdep:entregable") {
			folder.properties.title=document.properties["rdpg:codigoBases"];		
			folder.properties["rdep:codigoProyecto"]=document.properties["rdpg:codigoProyecto"];
			folder.properties["rdep:codigoBases"]=document.properties["rdpg:codigoBases"];
			folder.properties["rdep:nombreProyecto"]=document.properties["rdpg:nombreProyecto"];
			folder.properties["rdep:siglasCliente"]=document.properties["rdpg:siglasCliente"];
			folder.properties["rdep:razonSocialCliente"]=document.properties["rdpg:razonSocialCliente"];
			folder.save();

		}else if (type == "rdrg:registro") {
			folder.properties.title=document.properties["rdpg:codigoBases"];		
			folder.properties.description=document.properties["rdpg:siglasCliente"];
			folder.properties["rdrg:codigoProyecto"]=document.properties["rdpg:codigoProyecto"];
			folder.properties["rdrg:codigoBases"]=document.properties["rdpg:codigoBases"];
			folder.properties["rdrg:nombreProyecto"]=document.properties["rdpg:nombreProyecto"];
			folder.properties["rdrg:siglasCliente"]=document.properties["rdpg:siglasCliente"];
			folder.properties["rdrg:razonSocialCliente"]=document.properties["rdpg:razonSocialCliente"];
			folder.properties["rdrg:estadoProyecto"]=document.properties["rdpg:estadoProyecto"];
			folder.save();

		}
	}
	
}

