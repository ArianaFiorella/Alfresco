/*Crear estructura de carpetas de entregables*/
var codigo_proyecto="PI1901";
var bases_integradas="LP N° 001-2019-SIS";
var nombre_proyecto="Adquisicion de infraestructura para la plataforma de virtualizacion del SIS";
var siglas_cliente="SIS";
var razon_social_cliente="Seguro Integral de Salud";
var servicios="SOPORTE";
var entregables = [
                      
		                  ['35','30/08/2022','Correo Electronico'],
                      ['36','30/09/2022','Correo Electronico']
				  ];
var ruta = companyhome.childByNamePath("Sites/itbussiness/documentLibrary/PROYECTOS/CATALOGO DE PROYECTOS/2019/PI1901/SOPORTE TECNICO/ENTREGABLES");

for (i=0; i<entregables.length; i++){
  var temp = ruta.createFolder(entregables[i][0],"rdep:entregable");
	temp.properties.name=codigo_proyecto+'-'+siglas_cliente+'-'+'E'+entregables[i][0]+'-'+entregables[i][1];  
	temp.properties.title=bases_integradas;
	temp.properties.description=entregables[i][2];
	temp.properties["rdep:codigoProyecto"]=codigo_proyecto;
  temp.properties["rdep:codigoBases"]=bases_integradas;
	temp.properties["rdep:nombreProyecto"]=nombre_proyecto;
	temp.properties["rdep:siglasCliente"]=siglas_cliente;
	temp.properties["rdep:razonSocialCliente"]=razon_social_cliente;
	temp.properties["rdep:servicio"]=servicios;
	temp.properties["rdep:fechaEntrega"]=entregables[i][1];
	temp.save();
}