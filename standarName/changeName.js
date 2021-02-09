changeName();
    

function changeName() {
	    
        var query1 = "TYPE:\"rdpg:proyecto\" AND PATH:\"/app:company_home/st:sites/cm:itbussiness/cm:documentLibrary/cm:PROYECTOS//*\"";
	    var nodes = search.luceneSearch(query1);

		for each(var nod in nodes){
			nod.properties.name = nod.properties.name+"-"+nod.properties["rdpg:siglasCliente"];
			nod.properties.title = nod.properties["rdpg:codigoBases"]+"-"+nod.properties["rdpg:siglasCliente"];
			nod.save();
    }


}