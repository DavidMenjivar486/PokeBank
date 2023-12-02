
//Funcion que muestra los datos del usuario usando SweetAlerts
function mensajeDatos() {
    Swal.fire({
      icon: 'info',
      html: `
        <h2 class='text-dark'>User Information</h2><br>
        <h4 class='text-muted'>
          Username: Ash Ketchum<br><br>
          Account number: 0987654321 <br><br>
          Member since: 2023
        </h4>`,
      confirmButtonText: "<h7 class='text-white'>OK</h7>",
      background: '#E9E7F0',
      confirmButtonColor: '#3596ff',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      stopKeyDownPropagation: true,
      width: '35%',
      footer: '<h6 class="text-muted">All user data</h6>',
    })
  }

  //Funcion que permite el cierre de sesion por medio de SweetAlerts funcionales
  function mensajeSalirSesion() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: { confirmButton: 'btn btn-outline-primary', cancelButton: 'mr-2 btn btn-outline-secondary' },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      html: "<h2 class='text-muted'>Logout</h2><br><h4 class='text-dark'>Are you sure you want to logout?</h4>",
      background: '#E9E7F0',
      width: '35%',
      icon: 'question',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#a10096',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = 'login.html'
      }
    })
  }
 
  //Definicion de variables para funcionamiento
  let deposito;
  let retiro;
  let numeroRetiros = 0;
  let numeroDepositos = 0;
  let retiros = [];
  let depositos = [];
  let total = 500;
  let pagosElectricidad = [];
  let pagosIT = [];
  let pagosAgua = [];

  //Referencia de elementos en el DOM
  const buttonDatos = document.getElementById('buttonDatos');
  const salirSesion = document.getElementById('salirSesion');
  const depositar = document.getElementById('depositar');
  const retirar = document.getElementById('retirar');
  const consultarSaldo = document.getElementById('consultarSaldo');
  const pagarServicios = document.getElementById('pagarServicios');
  const pdf = document.getElementById('pdf');

  //Agregando eventos de click para los mensajes de datos de usuario y de salir de sesion
  buttonDatos.addEventListener('click', mensajeDatos);
  salirSesion.addEventListener('click', mensajeSalirSesion);

  depositar.addEventListener('click', () => {
	//Se personaliza un cuadro de dialogo usando SweetAlert
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: { confirmButton: 'btn btn-outline-primary', cancelButton: 'mr-2 btn btn-outline-secondary' },
      buttonsStyling: false
    });

	//Se personalizan las opciones del cuadro de dialogo
    swalWithBootstrapButtons.fire({
      html: "<h2 class='text-muted'>Deposit</h2>",
      icon: 'question',
      footer: '<h6 class="text-dark">How much do you want to deposit?</h6>',
      width: '35%',
      background: '#E9E7F0',
      confirmButtonText: 'Deposit',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      reverseButtons: true,
      input: 'text',
      inputPlaceholder: 'Amount',
      inputValue: '',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    }).then((result) => {
		//Se verifica si se confirmo el deposito
      if (result.isConfirmed) {
		//Se obtiene el monto ingresado por el usuario
        deposito = parseFloat(swalWithBootstrapButtons.getInput().value);
		//Se valida el monto ingresado
        if (swalWithBootstrapButtons.getInput().value === '' || isNaN(deposito)) {
			//Se muestra un mensaje de error en caso de que el valor no sea valido
          swalWithBootstrapButtons.fire({
            html: "<h4 class='text-dark'>Wrong data</h4>",
            icon: 'error',
            footer: '<h6 class="text-muted">Try again</h6>',
            width: '35%',
            background: '#E9E7F0',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          })
        } else {//Si el saldo es valido se actualiza el saldo total y se registra el deposito
          total += deposito;
          depositos.push(deposito);
		  numeroDepositos++;
          actualizarGrafico();
          swalWithBootstrapButtons.fire({
            html: "<h4 class='text-muted'>" + deposito + "$ has been successfully deposited</h4>",
            icon: 'success',
            footer: '<h6 class="text-muted">Successful deposit</h6>',
            width: '35%',
            background: '#E9E7F0',
            confirmButtonText: 'Awesome',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          })
        }
      }
    })
  })

  retirar.addEventListener('click', () => {
	//Se personaliza un cuadro de dialogo usando SweetAlert
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: { confirmButton: 'btn btn-outline-primary', cancelButton: 'mr-2 btn btn-outline-secondary' },
      buttonsStyling: false
    });
	//Se personalizan las opciones del cuadro de dialogo
    swalWithBootstrapButtons.fire({
      html: "<h2 class='text-dark'>Withdrawals</h2>",
      icon: 'info',
      footer: '<h6 class="text-muted">How much do you want to withdraw?</h6>',
      width: '35%',
      background: '#E9E7F0',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      reverseButtons: true,
      input: 'text',
      inputPlaceholder: 'Amount',
      inputValue: '',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
		 // Se verifica si el usuario confirmó el retiro.
        retiro = parseFloat(swalWithBootstrapButtons.getInput().value); // Se obtiene el monto ingresado por el usuario.
		// Se verifica si el monto ingresado es válido.
        if (swalWithBootstrapButtons.getInput().value === '' || isNaN(retiro)) {
          swalWithBootstrapButtons.fire({
            html: "<h4 class='text-muted'>Wrong data</h4>",
            icon: 'error',
            footer: '<h6 class="text-muted">Try again</h6>',
            width: '35%',
            background: '#E9E7F0',
            confirmButtonText: 'Ok',
            allowOutsideClick: false,
            allowEnterKey: false,
          })
        }
		// Se verifica si el monto de retiro es menor o igual al saldo total.
        if (retiro <= total) {
          total -= retiro;
          retiros.push(retiro);// Si es válido, se actualiza el saldo total y se registra el retiro.
		  numeroRetiros++;
		  actualizarGrafico();
          swalWithBootstrapButtons.fire({
            html: "<h4 class='text-muted'>" + retiro + "$ has been withdrawn successfully</h4>",
            icon: 'success',
            footer: '<h6 class="text-muted">Successful withdrawal</h6>',
            width: '35%',
            background: '#E9E7F0',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          })
        } else if (retiro > total) {
			 // Si el monto de retiro es mayor al saldo total, se muestra un mensaje de error.
          swalWithBootstrapButtons.fire({
            html: "<h4 class='text-dark'>Fail</h4>",
            icon: 'error',
            footer: '<h6 class="text-muted">You don\'t have enough money</h6>',
            width: '35%',
            background: '#E9E7F0',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
          })
        }
      }
    })
  })

  consultarSaldo.addEventListener("click", () => {
	// Se crea un cuadro de diálogo personalizado utilizando SweetAlert.
    Swal.fire({
      html: "<h2 class='text-muted'>Your balance is: " + total + "$</h2>",
      icon: 'info',
      confirmButtonText: 'OK',
      footer: '<h6 class="text-muted">Balance</h6>',
      width: '35%',
      background: '#E9E7F0',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
  })

  pagarServicios.addEventListener("click", () => {
	// Se crea un cuadro de diálogo personalizado utilizando SweetAlert
    let swalWithBootstrapButtons = Swal.mixin({
      customClass: { confirmButton: 'btn btn-outline-primary', cancelButton: 'mr-2 btn btn-outline-secondary' },
      buttonsStyling: false
    });
	// Se muestra el cuadro de diálogo con opciones personalizadas.
    swalWithBootstrapButtons.fire({
      html: "<h2 class='text-dark'>Select Service</h2>",
      icon: 'info',
      footer: '<h6 class="text-muted">Choose a service</h6>',
      width: '35%',
      background: '#E9E7F0',
      confirmButtonText: 'Pay',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      reverseButtons: true,
      input: "select",
      inputPlaceholder: "Services",
      inputOptions: {
        energiaElectrica: "Energy service",
        internetTelefonia: "Internet and landline",
        aguaPotable: "Water service"
      },
      inputValue: '',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    }).then((result) => {
		// Se verifica si el usuario confirmó el pago de servicios.
      if (result.isConfirmed) {
		// Se obtiene el servicio seleccionado por el usuario
        servicio = swalWithBootstrapButtons.getInput().selectedOptions[0].text;
		// Se vuelve a utilizar SweetAlert para solicitar el monto del servicio.
        swalWithBootstrapButtons = Swal.mixin({
          customClass: { confirmButton: 'btn btn-outline-primary' },
          buttonsStyling: false
        });
		// Se muestra el cuadro de diálogo para ingresar el monto del servicio.
        swalWithBootstrapButtons.fire({
          html: "<h6 class='text-muted'>Pay service amount:" + servicio + " </h6>",
          icon: 'info',
          width: '35%',
          background: '#E9E7F0',
          confirmButtonText: 'Pay',
          input: 'text',
          inputPlaceholder: 'Amount',
          inputValue: '',
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
        }).then((result) => {
			// Se verifica si el usuario confirmó el ingreso del monto.
          let cuota;
          if (result.isConfirmed) {
			 // Se obtiene y valida el monto ingresado por el usuario.
            cuota = parseFloat(swalWithBootstrapButtons.getInput().value);
            if (swalWithBootstrapButtons.getInput().value === '' || isNaN(cuota)) {
              swalWithBootstrapButtons.fire({
                html: "<h4 class='text-dark'>Wrong data</h4>",
                icon: 'error',
                footer: '<h6 class="text-muted">Try again</h6>',
                width: '35%',
                background: '#E9E7F0',
                confirmButtonText: 'OK',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
              })
            }
			// Se verifica si el monto del servicio es menor o igual al saldo total.
            if (cuota <= total) {
				// Si es válido, se actualiza el saldo total y se registra el pago del servicio.
              total -= cuota;
              switch (servicio) {
                case "Energy service":
                  pagosElectricidad.push(cuota);
                  break;
                case "Internet and landline":
                  pagosIT.push(cuota);
                  break;
                case "Water service":
                  pagosAgua.push(cuota);
                  break;
              }
			  actualizarGrafico();
			  // Se muestra un mensaje de éxito.
              swalWithBootstrapButtons.fire({
                html: "<h4 class='text-muted'>" + cuota + "$ have been paid successfully</h4>",
                icon: 'success',
                footer: '<h6 class="text-muted">Successful payment</h6>',
                width: '35%',
                background: '#E9E7F0',
                confirmButtonText: 'OK',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
              })
            } else if (cuota > total) {// Si el monto del servicio es mayor al saldo total, se muestra un mensaje de error.
              swalWithBootstrapButtons.fire({
                html: "<h4 class='text-dark'>Fail</h4>",
                icon: 'error',
                footer: '<h6 class="text-muted">You don\'t have enough money</h6>',
                width: '35%',
                background: '#E9E7F0',
                confirmButtonText: 'OK',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
              })
            }
          }
        })
      }
    })
  })

// Creando el gráfico inicial
const ctx = document.getElementById('transaccionesChart').getContext('2d');
const transaccionesChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Deposits', 'Withdrawals', 'Energy Service', 'Internet and Landline', 'Water Service'],
    datasets: [{
      label: 'Number of Transactions',
      data: [numeroDepositos, numeroRetiros, pagosElectricidad.length, pagosIT.length, pagosAgua.length],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

// Función para actualizar el gráfico
function actualizarGrafico() {
  transaccionesChart.data.datasets[0].data = [numeroDepositos, numeroRetiros, pagosElectricidad.length, pagosIT.length, pagosAgua.length];
  transaccionesChart.update();
}

  pdf.addEventListener('click', () => {
	// Inicializa el número de líneas en el documento PDF y crea una instancia de jsPDF.
    let lineas = 10;
    let doc = new jsPDF();
	// Añade el encabezado al documento PDF con el nombre del titular de la cuenta y la fecha actual.
    lineas += 10;
    doc.text(10, lineas, `RECORD - ASH -KETCHUM ${dayjs().format("MMMM D, YYYY")}`);
	// Añade la sección de depósitos al documento PDF, mostrando cada depósito realizado.
    lineas += 10;
    doc.text(20, lineas, "Deposits");
    for (let i = 0; i < depositos.length; i++) {
      lineas += 10;
      doc.text(20, lineas, (i + 1) + ". Deposit: " + depositos[i] + "$");
    }
	// Añade la sección de retiros al documento PDF, mostrando cada retiro realizado.
    lineas += 10;
    doc.text(20, lineas, "Withdrawal");
    for (let i = 0; i < retiros.length; i++) {
      lineas += 10;
      doc.text(20, lineas, (i + 1) + ". Withdrawal: " + retiros[i] + "$");
    }
	// Añade la sección de pagos de servicios de energía al documento PDF.
    lineas += 10;
    doc.text(20, lineas, "Energy service payments");
    for (let i = 0; i < pagosElectricidad.length; i++) {
      lineas += 10;
      doc.text(20, lineas, (i + 1) + ". Energy service payments" + pagosElectricidad[i] + "$");
    }
	 // Añade la sección de pagos de servicios de Internet y telefonía al documento PDF.
    lineas += 10;
 doc.text(20, lineas, "Internet and landline payments");
    for (let i = 0; i < pagosIT.length; i++) {
      lineas += 10;
      doc.text(20, lineas, (i + 1) + ". Internet and landline: " + pagosIT[i] + "$");
    }
	// Añade la sección de pagos de servicios de agua al documento PDF.
    lineas += 10;
    doc.text(20, lineas, "Water service payments");
    for (let i = 0; i < pagosAgua.length; i++) {
      lineas += 10;
      doc.text(20, lineas, (i + 1) + ". Water service payments: " + pagosAgua[i] + "$");
    }
	// Guarda el documento PDF con un nombre específico.
    doc.save("Record-ASH-KETCHUM.pdf");
  })