setProperties();
    

function setProperties() {
	    
		var def =
		  {
		     query: "TYPE:'rdcg:carpeta' AND rdcg:tipoCarpeta:'ADJUDICACION' AND PATH:'/app:company_home/st:sites/cm:itbussiness/cm:documentLibrary/cm:PROYECTOS//*'",
		     language: "fts-alfresco"
		  };

	    var nodes = search.query(def);
	    for each(var nod in nodes){
			var type=nod.typeShort;
			var codigo=nod.properties["rdcg:codigoBases"];
			var siglas=nod.properties["rdcg:siglasCliente"];

			for each(var folderAdj in nod.children){
				var typefoldAdj=folderAdj.typeShort;
				if(typefoldAdj=="cm:folder"){
					folderAdj.properties.name=codigo+"-"+siglas+"-"+folderAdj.properties.name;
					folderAdj.properties.title=codigo;
					folderAdj.save();
				}
			}
		}
}

