setPermission();
    

function setPermission() {
	    
        var query1 = "TYPE:\"rdpg:proyecto\" AND PATH:\"/app:company_home/st:sites/cm:itbussiness/cm:documentLibrary/cm:PROYECTOS//*\"";
	    var nodes = search.luceneSearch(query1);

		for each(var nod in nodes){

		nod.setInheritsPermissions(false);

		var permissions = nod.permissions; 
		var acl=[];
		for (var j=0; j < permissions.length; j++)
		{
			acl = permissions[j].split(";");
			var perm=acl[2];
			var grp=acl[1];
			nod.removePermission(perm,grp);
			nod.save();
		}

        nod.setPermission("SiteContributor", "GROUP_GRUPO_ADMINISTRACION");
        nod.setPermission("SiteConsumer", "GROUP_GRUPO_ESPECIALISTAS_ITB");
        nod.setPermission("SiteConsumer", "GROUP_GRUPO JEFES DE PROYECTO_ITB");
        nod.setPermission("SiteContributor", "GROUP_GRUPO CUENTAS DE CONTROL Y SUPERVICION_ITB");
        nod.setPermission("SiteManager", "GROUP_GRUPO_GAME MASTER");
        nod.save();

    }


}