var typeDocumento = document.typeShort;

if(typeDocumento=="rdpg:proyecto"){

	document.properties.owner="gm01";
	document.save();
	buscarsubcarpetas(document);

}

function buscarsubcarpetas(carpeta){
	for each(var folder in carpeta.children){
		var type=folder.typeShort;
			folder.properties.owner="gm01";
		buscarsubcarpetas(folder);
		folder.save();
	}
}