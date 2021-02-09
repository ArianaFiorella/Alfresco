var servicio="SOPORTE";
var entregables = [
		                  ['01','2019-10-30','Correo Electronico'],
                      ['02','2019-11-30','Correo Electronico'],
                      ['03','2019-12-30','Correo Electronico'],
                      ['04','2020-01-30','Correo Electronico'],
                      ['05','2020-02-28','Correo Electronico'],
                      ['06','2020-03-30','Correo Electronico'],
                      ['07','2020-04-30','Correo Electronico'],
                      ['08','2020-05-30','Correo Electronico'],
                      ['09','2020-06-30','Correo Electronico'],
                      ['10','2020-07-30','Correo Electronico'],
                      ['11','2020-08-30','Correo Electronico'],
                      ['12','2020-09-30','Correo Electronico'],
                      ['13','2020-10-30','Correo Electronico'],
                      ['14','2020-11-30','Correo Electronico'],
                      ['15','2020-12-30','Correo Electronico'],
                      ['16','2021-01-30','Correo Electronico'],
                      ['17','2021-02-28','Correo Electronico'],
                      ['18','2021-03-30','Correo Electronico'],
                      ['19','2021-04-30','Correo Electronico'],
                      ['20','2021-05-30','Correo Electronico'],
                      ['21','2021-06-30','Correo Electronico'],
                      ['22','2021-07-30','Correo Electronico'],
                      ['23','2021-08-30','Correo Electronico'],
                      ['24','2021-09-30','Correo Electronico'],
                      ['25','2021-10-30','Correo Electronico'],
                      ['26','2021-11-30','Correo Electronico'],
                      ['27','2021-12-30','Correo Electronico'],
                      ['28','2022-01-30','Correo Electronico'],
                      ['29','2022-02-28','Correo Electronico'],
                      ['30','2022-03-30','Correo Electronico'],
                      ['31','2022-04-30','Correo Electronico'],
                      ['32','2022-05-30','Correo Electronico'],
                      ['33','2022-06-30','Correo Electronico'],
                      ['34','2022-07-30','Correo Electronico'],
                      ['35','2022-08-30','Correo Electronico'],
                      ['36','2022-09-30','Correo Electronico']
				  ];
var ruta = companyhome.childByNamePath("Sites/itbussiness/documentLibrary/PROYECTOS/CATÁLOGO DE PROYECTOS/2019/PI1901/SOPORTE TECNICO/ENTREGABLES");

for (i=0; i<entregables.length; i++){
  var temp = ruta.createFolder(entregables[i][0],"rdep:entregable");
	temp.properties.name='E'+entregables[i][0]+'-'+servicio+'-'+entregables[i][1];  
	temp.properties.description=entregables[i][2];
	temp.properties["rdep:servicio"]=servicio;
	temp.properties["rdep:fechaEntrega"]=entregables[i][1];
	temp.save();
}