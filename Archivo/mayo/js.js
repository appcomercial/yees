function ver(elemento) { // Función solo para hacer debugg sin escribir tanto 
	console.log(elemento);
}

/*
Encierra todas las instrucciones necesarias, 
encaso de conflicto de nombres con cualquier librería o framework 
se implementa estrategia d objeto
var funcionoes_personalizadas = {
  func1: function () { alert('Function 1'); },
  func2: function () { alert('Function 2'); },
  func3: function () { alert('Function 3'); },
  func4: function () { alert('Function 4'); },
  func5: function () { alert('Function 5'); }
};
llamada a la función es iguala a funcionoes_personalizadas.func1(parametros);
 de esta forma usarse una global que anule la posibilidades de que un 
nombre objeto de conflicto 
*/
function evento_clonar(arguments) {
	console.log("evento_clonar");

	let btn_clonar =
		document.querySelectorAll(
			"tbody .btn_clonar"
		);

	let btn_close =
		document.querySelector(
			".modal_clonar .btn_close"
		);
	let modal =
		document.querySelector(
			".modal_clonar .modal"
		);
	//  función para cerrar le modal 
	btn_close.onclick = function (arguments) {
		modal.style.display = "none";
	};

	function getRespuestasConceptoClon(id_diagrama, id_concepto, id_pregunta) {

		let oReq = new XMLHttpRequest();
		let formData = new FormData();
		formData.append("id_diagrama", id_diagrama);
		formData.append("id_concepto", id_concepto);
		formData.append("id_pregunta", id_pregunta);

		oReq.open("post",
			"./php/creardiagrama/modal_clonar/getRespuestasConceptoClon.php"
		);

		oReq.send(formData);

		oReq.addEventListener("loadend", function (arguments) {

			let datos = JSON.parse(oReq.response);

			let respuesta = [];
			for (var i = 0; i < datos.length; i++) {
				respuesta.push({
					respuesta: datos[i]
				});
			}
			return respuesta;

		});
		oReq.onreadystatechange = function () {
			if (oReq.readyState === 4) {

			}
		}

	}

	function getPregutasConceptoClon(id_diagrama, id_concepto) {

		let oReq = new XMLHttpRequest();
		let formData = new FormData();
		formData.append("id_diagrama", id_diagrama);
		formData.append("id_concepto", id_concepto);
		oReq.open("post", "./php/creardiagrama/modal_clonar/getPregutasConceptoClon.php");
		oReq.send(formData);
		oReq.addEventListener("loadend", function (arguments) {

			let datos = JSON.parse(oReq.response);

			return [datos];

		});
		oReq.onreadystatechange = function () {
			if (oReq.readyState === 4) {
				console.log(oReq.response);
			}
		}

	}

	function getConceptosClon(id_diagrama) {

		let oReq = new XMLHttpRequest();
		let formData = new FormData();
		formData.append("id_diagrama", id_diagrama);
		oReq.open("post", "./php/creardiagrama/modal_clonar/getConceptosClon.php");
		oReq.send(formData);
		oReq.addEventListener("loadend", function (arguments) {

			let datos = JSON.parse(oReq.response);

			let conceptos_clone = document.querySelector(".conceptos_clone");
			elimina_nodos(conceptos_clone);

			function cajaconcepto(elemento) {
				let contenedor_conepto = document.querySelector(".conceptos_clone");
				divicion_conepto = document.createElement("div");
				divicion_conepto.textContent = "===================";
				contenedor_conepto.appendChild(divicion_conepto);
				console.log(elemento);
			}

			function imprimeRespuestas(elemento) {

				let cajarespuesta = document.querySelector(".modal_clonar .conceptos_clone [id_pregunta='"
					+ elemento.id_pregunta
					+ "']");
				let divicion_respuesta = document.createElement("div");

				let divicion_nombre_respuesta = document.createElement("div");
				let inputCheck = document.createElement("input");
				let nombre_respuesta = document.createElement("input");
				divicion_respuesta.setAttribute("style", "padding-left:20px; margin-bottom:10px;");
				inputCheck.setAttribute("type", "checkbox");
				inputCheck.setAttribute("tipoelemento", "respuesta");
				inputCheck.setAttribute("id_diagrama", elemento.id_diagrama);
				inputCheck.setAttribute("id_concepto", elemento.id_concepto);
				inputCheck.setAttribute("id_pregunta", elemento.id_pregunta);
				inputCheck.setAttribute("id_respuesta", elemento.id_respuesta);
				inputCheck.setAttribute("class", "w3-check w3-left");
				inputCheck.setAttribute("style", "width: 5%");
				nombre_respuesta.setAttribute("type", "text");
				nombre_respuesta.setAttribute("tipoelemento", "respuesta");
				nombre_respuesta.setAttribute("id_diagrama", elemento.id_diagrama);
				nombre_respuesta.setAttribute("id_concepto", elemento.id_concepto);
				nombre_respuesta.setAttribute("id_pregunta", elemento.id_pregunta);
				nombre_respuesta.setAttribute("id_respuesta", elemento.id_respuesta);
				nombre_respuesta.setAttribute("class", "w3-input w3-left");
				nombre_respuesta.setAttribute("style", "width: 95%");

				divicion_nombre_respuesta.appendChild(inputCheck);
				divicion_nombre_respuesta.appendChild(nombre_respuesta);
				divicion_respuesta.appendChild(divicion_nombre_respuesta);

				if (elemento.respuesta == " ") {
					nombre_respuesta.value = "Res puesta no definida";

				} else {
					nombre_respuesta.value = elemento.respuesta;

				}
				cajarespuesta.appendChild(divicion_respuesta);

			}

			function imprimePreguntas(elemento) {

				let cajapregunta = document.querySelector(".modal_clonar .conceptos_clone [id_concepto='"
					+ elemento.id_concepto
					+ "']");
				let divicion_pregunta = document.createElement("div");
				let divicion_nombre_pregunta = document.createElement("div");
				let inputCheck = document.createElement("input");
				let nombre_pregunta = document.createElement("input");
				divicion_pregunta.setAttribute("id_pregunta", elemento.id_pregunta);
				divicion_pregunta.setAttribute("style", "padding-left:20px;");
				inputCheck.setAttribute("type", "checkbox");
				inputCheck.setAttribute("tipoelemento", "pregunta");
				inputCheck.setAttribute("id_diagrama", elemento.id_diagrama);
				inputCheck.setAttribute("id_concepto", elemento.id_concepto);
				inputCheck.setAttribute("id_pregunta", elemento.id_pregunta);
				inputCheck.setAttribute("class", "w3-check w3-left");
				inputCheck.setAttribute("style", "width: 5%");
				nombre_pregunta.setAttribute("type", "text");
				nombre_pregunta.setAttribute("tipoelemento", "pregunta");
				nombre_pregunta.setAttribute("id_diagrama", elemento.id_diagrama);
				nombre_pregunta.setAttribute("id_concepto", elemento.id_concepto);
				nombre_pregunta.setAttribute("id_pregunta", elemento.id_pregunta);
				nombre_pregunta.setAttribute("class", "w3-input w3-left");
				nombre_pregunta.setAttribute("style", "width: 95%");

				nombre_pregunta.value = elemento.pregunta;
				divicion_nombre_pregunta.appendChild(inputCheck);
				divicion_nombre_pregunta.appendChild(nombre_pregunta);
				divicion_pregunta.appendChild(divicion_nombre_pregunta);
				cajapregunta.appendChild(divicion_pregunta);

				for (var i = 0; i < elemento.respuesta.length; i++) {
					imprimeRespuestas(elemento.respuesta[i])
				}
			}

			function imprimeConcepto(elemento) {
				let cajaconcepto = document.querySelector(".modal_clonar .conceptos_clone");
				let divicion_conepto = document.createElement("div");
				let divicion_nombre_conepto = document.createElement("div");
				let inputCheck = document.createElement("input");
				let nombre_concepto = document.createElement("input");
				inputCheck.setAttribute("type", "checkbox");
				inputCheck.setAttribute("class", "w3-check w3-left");
				inputCheck.setAttribute("tipoelemento", "concepto");
				inputCheck.setAttribute("id_diagrama", elemento.id_diagrama);
				inputCheck.setAttribute("id_concepto", elemento.id_concepto);
				inputCheck.setAttribute("style", "width: 5%");
				nombre_concepto.setAttribute("type", "text");
				nombre_concepto.setAttribute("tipoelemento", "concepto");
				nombre_concepto.setAttribute("id_diagrama", elemento.id_diagrama);
				nombre_concepto.setAttribute("id_concepto", elemento.id_concepto);
				nombre_concepto.setAttribute("class", "w3-input w3-left");
				nombre_concepto.setAttribute("style", "width: 95%");
				divicion_conepto.setAttribute("id_concepto", elemento.id_concepto);
				divicion_conepto.setAttribute("class", "w3-container w3-card w3-padding-32 w3-panel");
				nombre_concepto.value = elemento.nombre;
				divicion_nombre_conepto.appendChild(inputCheck);
				divicion_nombre_conepto.appendChild(nombre_concepto);
				divicion_conepto.appendChild(divicion_nombre_conepto);
				cajaconcepto.appendChild(divicion_conepto);
				for (var i = 0; i < elemento.pregunta.length; i++) {
					imprimePreguntas(elemento.pregunta[i]);
				}
			}

			function generaElementosClon(datos) {
				for (var i = 0; i < datos.length; i++) {

					imprimeConcepto(datos[i].concepto);
				}
				let input_check = document.querySelectorAll(".modal_clonar .conceptos_clone [type=checkbox]");
				let input_text = document.querySelectorAll(".modal_clonar .conceptos_clone [type=text]");
				for (var i = 0; i < input_check.length; i++) {
					input_check[i].addEventListener("change", function (arguments) {
						let elemento = this;
						// console.log(this.getAttribute("tipoelemento"));
						let mensaje = document.querySelector(".caja_mensaje .mensaje");
						let texto = "";
						let selecionado = "ahora ese elemento no esta selecionado";
						if (this.checked) {
							selecionado = "ahora ese elemento esta selecionado";
						}
						if (this.getAttribute("tipoelemento") == "concepto") {
							console.log(' haz selecionado un elemento de concepto y ' + selecionado);
							console.log(this.getAttribute("id_diagrama"));
							console.log(this.getAttribute("id_concepto"));
							texto = "Estas modificando"
								+ " un elemento de caja de verificasion  que "
								+ "corespoende a un concepto "
								+ "cuyo id de diagrama es "
								+ elemento.getAttribute("id_diagrama")
								+ " y el id d econcepto es "
								+ elemento.getAttribute("id_concepto")
								+ "ademas de eso " + selecionado;
						} else if (this.getAttribute("tipoelemento") == "pregunta") {
							console.log(' haz selecionado un elemento de pregunta y ' + selecionado);
							console.log(this.getAttribute("id_diagrama"));
							console.log(this.getAttribute("id_concepto"));
							console.log(this.getAttribute("id_pregunta"));
							texto = "Estas modificando"
								+ " un elemento de caja de verificasion que "
								+ "corespoende a una pregunta "
								+ "cuyo id de diagrama es "
								+ elemento.getAttribute("id_diagrama")
								+ " , el id d econcepto es "
								+ elemento.getAttribute("id_concepto")
								+ "y el id de la pregunta es "
								+ elemento.getAttribute("id_pregunta")
								+ "ademas de eso " + selecionado;
						} else if (this.getAttribute("tipoelemento") == "respuesta") {
							console.log(' haz selecionado un elemento de respuesta y ' + selecionado);
							console.log(this.getAttribute("id_diagrama"));
							console.log(this.getAttribute("id_concepto"));
							console.log(this.getAttribute("id_pregunta"));
							console.log(this.getAttribute("id_respuesta"));
							texto = "Estas modificando"
								+ " un elemento de caja de verificasion que "
								+ "corespoende a una respuesta "
								+ "cuyo id de diagrama es "
								+ elemento.getAttribute("id_diagrama")
								+ " , el id d econcepto es "
								+ elemento.getAttribute("id_concepto")
								+ ", el id de la pregunta es "
								+ elemento.getAttribute("id_pregunta")
								+ "y el id d ela pregunta es "
								+ elemento.getAttribute("id_respuesta")
								+ "ademas de eso " + selecionado;
						}
						mensaje.textContent = texto;
					});
				}

				function accionText(elemento) {
					let mensaje = document.querySelector(".caja_mensaje .mensaje");
					let texto = "";
					if (elemento.getAttribute("tipoelemento") == "concepto") {
						console.log('estas modificando un elemento de concepto');
						console.log(elemento.getAttribute("id_diagrama"));
						console.log(elemento.getAttribute("id_concepto"));
						texto = "Estas modificando"
							+ " un elemento de texto que "
							+ "corespoende a un concepto "
							+ "cuyo id de diagrama es "
							+ elemento.getAttribute("id_diagrama")
							+ " y el id d econcepto es "
							+ elemento.getAttribute("id_concepto");
					} else if (elemento.getAttribute("tipoelemento") == "pregunta") {
						console.log('estas modificando un elemento de pregunta');
						console.log(elemento.getAttribute("id_diagrama"));
						console.log(elemento.getAttribute("id_concepto"));
						console.log(elemento.getAttribute("id_pregunta"));
						texto = "Estas modificando"
							+ " un elemento de texto que "
							+ "corespoende a una pregunta "
							+ "cuyo id de diagrama es "
							+ elemento.getAttribute("id_diagrama")
							+ " , el id d econcepto es "
							+ elemento.getAttribute("id_concepto")
							+ "y el id de la pregunta es "
							+ elemento.getAttribute("id_pregunta");
					} else if (elemento.getAttribute("tipoelemento") == "respuesta") {
						console.log('estas modificando un elemento de respuesta');
						console.log(elemento.getAttribute("id_diagrama"));
						console.log(elemento.getAttribute("id_concepto"));
						console.log(elemento.getAttribute("id_pregunta"));
						console.log(elemento.getAttribute("id_respuesta"));
						texto = "Estas modificando"
							+ " un elemento de texto que "
							+ "corespoende a una respuesta "
							+ "cuyo id de diagrama es "
							+ elemento.getAttribute("id_diagrama")
							+ " , el id d econcepto es "
							+ elemento.getAttribute("id_concepto")
							+ ", el id de la pregunta es "
							+ elemento.getAttribute("id_pregunta")
							+ "y el id d ela pregunta es "
							+ elemento.getAttribute("id_respuesta");
					}
					mensaje.textContent = texto;
				}
				for (var i = 0; i < input_text.length; i++) {
					input_text[i].addEventListener("input", function (arguments) {

						accionText(this);
					});
				}
			}
			generaElementosClon(datos);
		});
		oReq.onreadystatechange = function () {
			if (oReq.readyState === 4) {

			}
		}

	}
	for (var i = 0; i < btn_clonar.length; i++) {
		btn_clonar[i].addEventListener("click", function (arguments) {
			let mensaje = document.querySelector(".caja_mensaje .mensaje");
			let texto = "";
			mensaje.textContent = texto;
			let text_nombre_diagrama_clon = document.querySelector(".modal_clonar .nombre_diagrama_clone");
			text_nombre_diagrama_clon.setAttribute("id_diagrama", this.getAttribute("id_diagrama"));
			text_nombre_diagrama_clon.value = this.getAttribute("nombre_diagrama");
			getConceptosClon(this.getAttribute("id_diagrama"));
			console.log("Nombre del diagrama " + this.getAttribute("nombre_diagrama"));
			console.log("id diagrama " + this.getAttribute("id_diagrama"));
			modal =
				document.querySelector(".modal_clonar .modal");
			modal.style.padding = "5px";

			modal.style.display = "block";

		});

	}
}
