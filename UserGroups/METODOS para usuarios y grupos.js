

//Buscar grupos de usuario segun el nombre de su usuario
var usuario = "prueba";
searchGroupsFromUser(usuario);
function searchGroupsFromUser(nameUser){
	var user;
	var nodes = people.getPeople(null);
	for each(var node in nodes) {
		user = utils.getNodeFromString(node);
		if (user.properties["cm:userName"] != "admin" && user.properties["cm:userName"] != "guest") {
			if(user.properties["cm:userName"] == nameUser){
				print(user.properties["cm:userName"]);
				if(people.getContainerGroups(user).length>=1){
					var groups = people.getContainerGroups(user);
					print (people.getContainerGroups(user));
					print (groups);
					for (var i=0; i<groups.length;i++){
						print (groups[i].properties["cm:authorityDisplayName"]);
					}

				}
			}
		}
	}
}

//Añadir usuario a grupo
var idGroup = "GRUPO_PRUEBA";
var group = people.getGroup("GROUP_"+idGroup);

if(group){
    user = people.getPerson("ariana");
        people.addAuthority(group, user);
} 



//Buscar grupos
function listGroups(){
	var groups;
	var query = "TYPE:\"cm:authorityContainer\"";
	var groups = search.luceneSearch(query);
	for each(var group in groups) {
		if(group.properties["cm:authorityDisplayName"]!= null && group!= null){
		print(group.properties["cm:authorityName"]+"--------"+group.properties["cm:authorityDisplayName"]);
		}
	}
}


//Listar grupos creados y que no sean de alfresco

listCreatedGroups();
function listCreatedGroups(){
	var groups;
	var query = "TYPE:\"cm:authorityContainer\"";
	var groups = search.luceneSearch(query);
	for each(var group in groups) {
		var nameGroup = group.properties["cm:authorityName"];
		if(nameGroup!= null && group!= null){
			var disNameGroup = nameGroup.split("_");
			var initial = disNameGroup[0]+"_"+disNameGroup[1];
			if (initial != "GROUP_site" && initial != "GROUP_EMAIL" && initial != "GROUP_SITE" && initial != "GROUP_ALFRESCO" && initial != "GROUP_RECORD" && initial != "GROUP_INPLACE") {
					print(group.properties["cm:authorityDisplayName"]);

			}
			
		}
			
	}
}

//Buscar grupo creado por nombre del grupo
var grupo = "GRUPO PRUEBA";
searchGroupByName(grupo);
function searchGroupByName(){
	var groups;
	var query = "TYPE:\"cm:authorityContainer\"";
	var groups = search.luceneSearch(query);
	for each(var group in groups) {
		var nameGroup = group.properties["cm:authorityName"];
		if(nameGroup!= null && group!= null){
			var disNameGroup = nameGroup.split("_");
			var initial = disNameGroup[0]+"_"+disNameGroup[1];
			if (initial != "GROUP_site" && initial != "GROUP_EMAIL" && initial != "GROUP_SITE" && initial != "GROUP_ALFRESCO" && initial != "GROUP_RECORD" && initial != "GROUP_INPLACE") {
				if(group.properties["cm:authorityDisplayName"]==grupo){
					print(group.properties["cm:authorityDisplayName"]);

				}

			}
			
		}
			
	}
}


var grupo = "GRUPO PRUEBA";
//Buscar grupo por nombre de grupo
searchGroupByName(grupo);
function searchGroupByName(){
	var groups;
	var query = "TYPE:\"cm:authorityContainer\"";
	var groups = search.luceneSearch(query);
	for each(var group in groups) {
		if(group.properties["cm:authorityDisplayName"]==grupo){
			print(group.properties["cm:authorityDisplayName"]);

		}

	}
			
}


//Eliminar grupo (que no sea de alfresco) por nombre de grupo
var grupo = "GRUPO PRUEBA";
deleteGroup(grupo);
function deleteGroup(){
	var groups;
	var query = "TYPE:\"cm:authorityContainer\"";
	var groups = search.luceneSearch(query);
	for each(var group in groups) {
		var nameGroup = group.properties["cm:authorityName"];
		if(nameGroup!= null && group!= null){
			var disNameGroup = nameGroup.split("_");
			var initial = disNameGroup[0]+"_"+disNameGroup[1];
			if (initial != "GROUP_site" && initial != "GROUP_EMAIL" && initial != "GROUP_SITE" && initial != "GROUP_ALFRESCO" && initial != "GROUP_RECORD" && initial != "GROUP_INPLACE") {
				if(group.properties["cm:authorityDisplayName"]==grupo){
					people.deleteGroup(group);
				}

			}
			
		}
			
	}
}

//Eliminar cualquier grupo
var idGroup = "GRUPO_PRUEBA";

function deleteGroup(idGrupo,usuario){
	var node = people.getGroup("GROUP_"+idGroup);
	if(node){
	    people.deleteGroup(node);
	}
}

//Eliminar usuario de un grupo

var idGroup = "GRUPO_PRUEBA";
var usuario = "ariana"

function deleteUserFromGroup(idGrupo,usuario){
	var group = people.getGroup("GROUP_"+idGroup);
	if(group){
	    user= people.getPerson(usuario);
		people.removeAuthority(group, user);
	}
}