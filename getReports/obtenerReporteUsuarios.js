
executeReportUser();

function executeReportUser (){

	var fecha = new Date();
	var anioActual= fecha.getFullYear();
	var mesActual= validDigitTime(fecha.getMonth()+1);
	var diaActual= validDigitTime(fecha.getDate());
	var timestamp= " "+anioActual + "-" + mesActual + "-" + diaActual + " " + validDigitTime(fecha.getHours()) + "-" + validDigitTime(fecha.getMinutes())+ "-" + validDigitTime(fecha.getSeconds())+" ";
	var peopleCollection = search.luceneSearch("TYPE:\"{http://www.alfresco.org/model/content/1.0}person\" ");
	var output = "Usuario;Nombres;Apellidos;Email;Espacio;MiddleName;OrganizationId;Organization;Jobtitle;Location;Telephone;Mobile;Companyaddress1;Companyaddress2;Companyaddress3;Companypostcode;Companytelephone;Companyfax;Companyemail;Skype;Companyemail;Instantmsg;UserStatus;Estado de autorizacion;Googleusername;";
	output += "\n";

	for (var i = 0; i < peopleCollection.length; i++) {
	 var pers = peopleCollection[i]; 
	 output += pers.properties["cm:userName"]+";"
	 output += pers.properties["cm:firstName"]+";"
	 output += pers.properties["cm:lastName"]+";"
	 output += pers.properties["cm:email"]+";"
	 if(pers.properties["cm:homeFolder"]!=null)
		output += pers.properties["cm:homeFolder"].properties["cm:name"]+";"
	 else
		output += ";"
	 output += pers.properties["cm:middleName"]+";"
	 output += pers.properties["cm:organizationId"]+";"
	 output += pers.properties["cm:organization"]+";"
	 output += pers.properties["cm:jobtitle"]+";"
	 output += pers.properties["cm:location"]+";"
	 output += pers.properties["cm:telephone"]+";"
	 output += pers.properties["cm:mobile"]+";"
	 output += pers.properties["cm:companyaddress1"]+";"
	 output += pers.properties["cm:companyaddress2"]+";"
	 output += pers.properties["cm:companyaddress3"]+";"
	 output += pers.properties["cm:companypostcode"]+";"
	 output += pers.properties["cm:companytelephone"]+";"
	 output += pers.properties["cm:companyfax"]+";"
	 output += pers.properties["cm:companyemail"]+";"
	 output += pers.properties["cm:skype"]+";"
	 output += pers.properties["cm:companyemail"]+";"
	 output += pers.properties["cm:instantmsg"]+";"
	 output += pers.properties["cm:userStatus"]+";"
	 output += pers.properties["cm:authorizationStatus"]+";"
	 output += pers.properties["cm:googleusername"]
	 output += "\n";
	 }

	var ruta = companyhome.childByNamePath("/Usuarios/Reportes de usuarios");
	var article = ruta.createNode("RU "+timestamp + ".csv", "cm:content");
	article.content = output;
	article.save();

}

function validDigitTime(time){
	if(time.toString().length==1){
			time="0"+time;
		}
	return time;
}





