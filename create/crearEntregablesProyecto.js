/*Crear estructura de carpetas de entregables*/
var codigo_proyecto="PI1902";
var nombre_proyecto="ADQUISICIÓN DE SERVIDORES DE COMPUTADORAS DE GAMA ALTA PARA EL CENTRO DE DATOS DEL MTPE";
var siglas_cliente="MTPE";
var razon_social_cliente="MINISTERIO DE TRABAJO Y PROMOCIÓN DEL EMPLEO";
var servicios="MANTENIMIENTO";
var entregables = [
                      ['01','2020-06-30','Correo Electronico'],
                      ['02','2020-12-30','Correo Electronico'],
                      ['03','2021-06-30','Correo Electronico'],
		      ['04','2021-12-30','Correo Electronico'],
                      ['05','2022-06-30','Correo Electronico'],
                      ['06','2022-12-30','Correo Electronico'],
				  ];

var ruta = companyhome.childByNamePath("Sites/itbussiness/documentLibrary/PROYECTOS/CATÁLOGO DE PROYECTOS/2019/PI1902/MANTENIMIENTO/ENTREGABLES");

for (i=0; i<entregables.length; i++){
  var temp = ruta.createFolder(entregables[i][0],"rdep:entregable");
	temp.properties.name='E'+entregables[i][0]+'-'+entregables[i][1];  
	temp.properties.title=entregables[i][1];
	temp.properties.description=entregables[i][2];
	temp.properties["rdep:codigoProyecto"]=codigo_proyecto;
	temp.properties["rdep:nombreProyecto"]=nombre_proyecto;
	temp.properties["rdep:siglasCliente"]=siglas_cliente;
	temp.properties["rdep:razonSocialCliente"]=razon_social_cliente;
	temp.properties["rdep:servicio"]=servicios;
	temp.properties["rdep:fechaEntrega"]=entregables[i][1];
	temp.save();
}