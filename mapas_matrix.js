///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [40, -1],
		zoom: 7,
		minZoom: 3,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});


///////////Funcionalidades estructura del visor///////////

//Layers on top

map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';



//Barra de interacción de capas	tantaas sildebar como grupos de capas

var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador

var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultMarkGeocode: false
	}).addTo(map);

///////////Diseño caracteriticas basicas del visor///////////

//Título

var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<br><h3>Posición de los municipios ante el cambio climático y tendencia de emisiones de CO₂ (2022)<em></em><h4><h3>';
	 return div;

	};
	title2.addTo(map);


//Logo Matrix	

var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/logmaatrix.png" width="100px" height="55px"></img></a>'; 
	 return div;
	};
	title1.addTo(map);

//Logo proyecto

var title4 = L.control({position: 'bottomright'});
	title4.onAdd = function (map) {
var div = L.DomUtil.create('div','info4');
	 div.innerHTML +=
	 '<a><img src="images/impa.png" width="100px" height="70px" ></img></a>';
	 return div;
	};
	title4.addTo(map); 

//Logo mayorsig

/*var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div','info3');
	 div.innerHTML +=
	 '<a><img src="images/MAYORSIG.jpg" width="90px" height="63px" ></img></a>';
	 return div;
	};
	title3.addTo(map);  
*/

///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2023 <a href="https://www.fundacionmatrix.es"><strong>©Fundación Matrix 2023</strong></a>',
	}).addTo(map);		
//			var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB'
//			}).addTo(map);
//			var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB',
//			pane: 'labels'
//			}).addTo(map);
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/ {z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2023 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	});


//Límites
/*var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.4,
	opacity: 0.3,
	fillOpacity: 0,
		attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);
*/

///////////Otras funcionalidades

//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[40, -1], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////


//capas de limites

//prov_limit.js

function styleprov(feature) {
	return {
		//fillColor: getColor1(feature.properties.), aqui relleno no se asocia a ningun valor
		weight: 1.3,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 0
	};

};


/*
function styleprov(feature) {
	return {
		//fillColor: getColor1(feature.properties.), aqui relleno no se asocia a ningun valor
		weight: 0.3,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		//fillOpacity: 0.8
	};

};

var prov = L.geoJson(prov_limit,{
	style: styleprov,
	
}).addTo(map);
*/

//estilo y popups de brecha de genero en sector agrario


function getColor1(a) {
	return a <= 10 ? '#ffff00' :
	a <= 20 ? '#ffbf00' : 
	a <= 30 ? '#ff8000' :
	a <= 40 ? '#ff4000': 
	a <= 100  ? '#e60000' :	
		'YELLOW';
};

function style1(feature) {
	return {
		fillColor: getColor1(feature.properties.td), // MUY IMPORTANTE, NO OLVIDAR PONER NOMBRE DE CAMPO EN TABLA.(DESPUES DE PROPERTIES)
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};

function popup1(feature, layer) {

	if (feature.properties && feature.properties.td) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.nameunit.toLocaleString()+"<br>"
             
            	+"<strong>Tasa de paro: </strong>"+feature.properties.td.toFixed(0).toLocaleString().replace(".",",")+"%",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson1 = L.geoJson(desempleo,{
	style: style1,
	onEachFeature: popup1
});


//
function getColor2(a) {
	return a <= 0 ? '#f5e9bc' :
	a <= 1 ? '#08701b' : 
	a <= 2 ? '#b2c6ed' :
	a <= 3 ? '#57f267': 
	a <= 4 ? '#f5fc1c' :	
		'YELLOW';
};

function style2(feature) {
	return {
		fillColor: getColor2(feature.properties.aaa), // MUY IMPORTANTE, NO OLVIDAR PONER NOMBRE DE CAMPO EN TABLA.(DESPUES DE PROPERTIES)
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};

function popup2(feature, layer) {

	if (feature.properties && feature.properties.aaa && feature.properties.anyo) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString()+"<br>"
             
            	+"<strong>Año de adhesión: </strong>"+feature.properties.anyo+"<br>",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};


var geojson2 = L.geoJson(desempleo,{
	style: style2,
	onEachFeature: popup2
});

function getColor3(a) {
	return a <= 1 ? '#f5e9bc' :
	a <= 2 ? '#38a800' : 
	a <= 3 ? '#ff8000' :
	a <= 4 ? '#ff4000': 
	a <= 5  ? '#e60000' :	
		'YELLOW';
};

function style3(feature) {
	return {
		fillColor: getColor3(feature.properties.visor), // MUY IMPORTANTE, NO OLVIDAR PONER NOMBRE DE CAMPO EN TABLA.(DESPUES DE PROPERTIES)
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};

function popup3(feature, layer) {

	if (feature.properties && feature.properties.visor) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString()+"<br>"
             
            	+"<strong>Tendencia: </strong>"+feature.properties.visor.toFixed(0).toLocaleString().replace(".",",")+"%",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson3 = L.geoJson(desempleo,{
	style: style3,
	onEachFeature: popup3
});

function getColor4(a) {
	return a <= -20 ? '#002573' :
	a <= -15 ? '#0344a0' : 
	a <= -10 ? '#0263ee' :
	a <= -5 ? '#5c92ff': 
	a <= -0.0000001  ? '#5cd6ff' :
	a <= 0.0000001 ? '#feede6' :
	a <= 5 ? '#fee2b3' : 
	a <= 10  ? '#fec495' :
	a <= 15  ? '#f6946f' :
	a <= 20  ? '#cf4530' :	
	a <= 100  ? '#a80000' :	
		'YELLOW';
};

function style4(feature) {
	return {
		fillColor: getColor4(feature.properties.bgdes), // MUY IMPORTANTE, NO OLVIDAR PONER NOMBRE DE CAMPO EN TABLA.(DESPUES DE PROPERTIES)
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};

function popup4(feature, layer) {

	if (feature.properties && feature.properties.bgdes) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.nameunit.toLocaleString()+"<br>"
             
            	+"<strong>Brecha de género en el desempleo: </strong>"+feature.properties.bgdes.toFixed(0).toLocaleString().replace(".",",")+"%",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson4 = L.geoJson(desempleo,{
	style: style4,
	onEachFeature: popup4
});

function getColor5(a) {
	return a <= 0 ? '#f5e9bc' :
	a <= 2 ? '#38a800' : 
	a <= 2 ? '#80d678' :
	a <= 3 ? '#f5fc1c': 
	a <= 3  ? '#ffb405' :
	a <= 5 ? '#ff0303' :
	a <= 6 ? '#b2c6ed' : 
		'YELLOW';
};

function style5(feature) {
	return {
		fillColor: getColor5(feature.properties.visor), // MUY IMPORTANTE, NO OLVIDAR PONER NOMBRE DE CAMPO EN TABLA.(DESPUES DE PROPERTIES)
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};

function popup5(feature, layer) {

	if (feature.properties && feature.properties.visor) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.NAMEUNIT.toLocaleString()+"<br>"
             
            	+"<strong>Tendencia de cambio: </strong>"+feature.properties.aa__1___19+"<br>",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};

var geojson5 = L.geoJson(desempleo,{
	style: style5,
	onEachFeature: popup5
});

//capas de limites. La última capa en declarar se ubica siempre encima de las demás.

// rios.js

/*
function stylerios(feature) {
	return {
		//fillColor: getColor1(feature.properties.), aqui relleno no se asocia a ningun valor
		weight: 3,
		opacity: 1,
		color: '#42f5ef',
		dashArray: '0',
		//fillOpacity: 0.8
	};

};

var rios = L.geoJson(rios,{
	style: stylerios,
	
}).addTo(map);

//Buscador de ríos
var searchControl = new L.Control.Search({
       layer: rios,
       propertyName: 'NOM_RIO',
       marker: false,
		moveToLocation: function(latlng) {
			console.log(latlng +" Coordinates");
  			map.setView(latlng, 10); // set the zoom
		}
});

map.addControl(searchControl);
*/

//Renombrado y ordenado de capas mapas geojson

var prov = L.geoJson(prov_limit,{
	style: styleprov
});

//var mapa1 = L.layerGroup([geojson1,prov])
var mapa2 = L.layerGroup([geojson2,prov]).addTo(map);
//var mapa3 = L.layerGroup([geojson3,prov])
//var mapa4 = L.layerGroup([geojson4,prov])
var mapa5 = L.layerGroup([geojson5,prov])

/*var mapa6 = L.layerGroup([geojson6]);
*/


// LISTA DESPLEGABLE

var baseTree = [
	{ label: "<strong>Limpiar mapa", layer: osm3 },
	{
	label: '<strong>Cambio relativo anual de las emisiones totales. Municipal.',
	children: [
	
			//{ label: "Brecha de género en el desempleo",layer: mapa4},
			//{ label: "Índice de concentración en el desempleo femenino",layer: mapa3},
			{ label: "Posición de los municipios ante el cambio climático",layer: mapa2},
	    	//{ label: "Tasa de paro",layer: mapa1},   	
	    	{ label: "Tendencias de cambio de emisiones difusas de CO₂",layer: mapa5},
		/*{ label: "Proporción de pesonas centenarias",layer: mapa6}
		*/
		 ]
	},
	];
	
	
var overlayTree = {
	label: 'Mapas de referencia',
	children: [
	
		//{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		{ label: "OpenStreetMap", layer: osm},
		]
};	




var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Tasa de paro'+"<\h2>",
			style: style1,
			layer: geojson1,
			elements: [{


				label:"<h4>"+  '<br>Porcentaje de la población que se encuentra en situación de desempleo, con respecto al total de la población en edad de trabajar (16 a 64 años).<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br> %'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '< 10'+"</strong><\h15>",html: '',style: {'background-color': '#ffff00','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '10 ‒ 20'+"</strong><\h15>",html: '',style: {'background-color': '#ffbf00','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '20 ‒ 30'+"</strong><\h15>",html: '',style: {'background-color': '#ff8000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '30 ‒ 40'+"</strong><\h15>",html: '',style: {'background-color': '#ff4000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '> 40'+"</strong><\h15>",html: '',style: {'background-color': '#e60000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {			
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia a partir de datos del Observatorio del Mercado de Trabajo de Castilla-La Mancha y del Instituto Nacional de Estadística (2021).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend1);


var htmlLegend2 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Categorías de municipios según su posición ante el cambio climático (2022)'+"<\h2>",
			style: style2,
			layer: geojson2,
			elements: [{

				label:'<br><img src="images/pacto.png",></img><br>',
				label:"<h4>"+  '<br>Municipios adheridos al Pacto de las Alcaldías, entre 2004 y 2020.<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br> Leyenda'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  'Adherido con dos inventarios'+"</strong><\h15>",html: '',style: {'background-color': '#08701b','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  'Adherido con un inventario'+"</strong><\h15>",html: '',style: {'background-color': '#57f267','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  'Adherido sin inventario<br>visible'+"</strong><\h15>",html: '',style: {'background-color': '#f5fc1c','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  'Adherido sin inventario'+"</strong><\h15>",html: '',style: {'background-color': '#b2c6ed','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  'Pasivo (No adherido)'+"</strong><\h15>",html: '',style: {'background-color': '#f5e9bc','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {			
				label:'<br><img src="images/pactooo.jpg",></img><br>',
				IMG:"<h3>"+  'Unidades: ‰'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				
				label: "<h5>" +'<BR><i>Fuente: Datos de la Comisión Europea (10/10/2022).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend2);

var htmlLegend3 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Índice de concentración en el desempleo femenino'+"<\h2>",
			style: style3,
			layer: geojson3,
			elements: [{


				label:"<h4>"+  '<br>Porcentaje de mujeres en situación de desempleo respecto al total de la población femenina en edad de trabajar (16 a 64 años).<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br> %'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '< 10'+"</strong><\h15>",html: '',style: {'background-color': '#ffff00','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '10 ‒ 20'+"</strong><\h15>",html: '',style: {'background-color': '#ffbf00','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '20 ‒ 30'+"</strong><\h15>",html: '',style: {'background-color': '#ff8000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '30 ‒ 40'+"</strong><\h15>",html: '',style: {'background-color': '#ff4000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '> 40'+"</strong><\h15>",html: '',style: {'background-color': '#e60000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {			
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia a partir de datos del Observatorio del Mercado de Trabajo de Castilla-La Mancha y del Instituto Nacional de Estadística (2021).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend3);

/*
return a <= -20 ? '#002573' :
	a <= -15 ? '#0344a0' : 
	a <= -10 ? '#0263ee' :
	a <= -5 ? '#5c92ff': 
	a <= -0.0000001  ? '#feede6' :
	a <= 0.0000001 ? '#ffeea9' :
	a <= 5 ? '#fee2b3' : 
	a <= 10  ? '#fec495' :
	a <= 15  ? '#f6946f' :
	a <= 20  ? '#cf4530' :	
	a <= 100  ? '#a80000' :	
		'YELLOW';
*/
var htmlLegend4 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Brecha de género en el desempleo'+"<\h2>",
			style: style4,
			layer: geojson4,
			elements: [{


				label:"<h4>"+  '<br>Diferencia en el índice de concentración de desempleo entre hombres y mujeres.<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br> %'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '< -20'+"</strong><\h15>",html: '',style: {'background-color': '#002573','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-20 ‒ -15'+"</strong><\h15>",html: '',style: {'background-color': '#0344a0','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-15 ‒ -10'+"</strong><\h15>",html: '',style: {'background-color': '#0263ee','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-10 ‒ -5'+"</strong><\h15>",html: '',style: {'background-color': '#5c92ff','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-5 ‒ 0'+"</strong><\h15>",html: '',style: {'background-color': '#5cd6ff','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '0'+"</strong><\h15>",html: '',style: {'background-color': '#feede6','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '0 ‒ 5'+"</strong><\h15>",html: '',style: {'background-color': '#fee2b3','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '5 ‒ 10'+"</strong><\h15>",html: '',style: {'background-color': '#fec495','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '10 ‒ 15'+"</strong><\h15>",html: '',style: {'background-color': '#f6946f','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '15 ‒ 20'+"</strong><\h15>",html: '',style: {'background-color': '#cf4530','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {	
				label:"<strong><h3>"+  '> 20'+"</strong><\h15>",html: '',style: {'background-color': '#a80000','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia a partir de datos del Observatorio del Mercado de Trabajo de Castilla-La Mancha y del Instituto Nacional de Estadística (2021).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend4);
/*
return a <= 100 ? '#fffecb' :
	a <= 500 ? '#d7eeaa' : 
	a <= 1000 ? '#a8db8e' :
	a <= 5000 ? '#78c67a': 
	a <= 10000  ? '#48af60' :
	a <= 30000 ? '#218e4a' :
	a <= 1000000 ? '#006837' :
*/
var htmlLegend5 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Tendencias de cambio de emisiones difusas de CO₂ y posición ante el cambio climático (2022)'+"<\h2>",
			style: style5,
			layer: geojson5,
			elements: [{

				
				label:"<h4>"+  '<br>Cambio relativo anual de las emisiones totales (%) de municipios con dos inventarios, entre 2008 y 2019, de municipios adheridos al Pacto de las Alcaldías.<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br>Leyenda'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  'Mejora (≤-5%)<br>'+"</strong><\h15>",html: '',style: {'background-color': '#38a800','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				//label:"<strong><h3>"+  'Mejora moderada (-20 a -5%)'+"</strong><\h15>",html: '',style: {'background-color': '#80d678','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  'Estable (>-5% a ≤5%)<br>'+"</strong><\h15>",html: '',style: {'background-color': '#f5fc1c','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				//label:"<strong><h3>"+  'Deterioro moderado (5 a 20%)'+"</strong><\h15>",html: '',style: {'background-color': '#ffb405','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  'Deterioro (>5%)<br>'+"</strong><\h15>",html: '',style: {'background-color': '#ff0303','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  'Adherido* (sin inventario o <br>sin datos de tendencia <br>de cambio)<br>'+"</strong><\h15>",html: '',style: {'background-color': '#b2c6ed','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  'Pasivo (No adherido)'+"</strong><\h15>",html: '',style: {'background-color': '#f5e9bc','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:'<br><img src="images/pactooo.jpg",></img><br>',
				IMG:"<h3>"+  'Unidades: ‰'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				
				label: "<h5>" +'<BR>*Período 2004-2020<BR><BR><i>Fuente: Elaboración propia a partir de datos del Plan de Acción para el Clima y la Energía Sostenible (PACES) y datos de la Comisión Europea (10/10/2022).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},

			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend5);
//Visualizar capas

// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree).addTo(map);

//boton de informacion 

var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});