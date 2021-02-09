

//Eliminar usuario de un grupo

var idGroup = "GRUPO_PRUEBA";
var usuario = "prueba"

function deleteUserFromGroup(idGrupo,usuario){
	var group = people.getGroup("GROUP_"+idGroup);
	if(group){
	    user= people.getPerson(usuario);
		people.removeAuthority(group, user);
	}
}