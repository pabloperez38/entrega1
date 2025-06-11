const ESPECIALIDADES = ["Cardiología", "Pediatría", "Traumatología"];
const TIEMPO_POR_TURNO = 15; // minutos
let turnos = [];
let proximoTurnoId = 1;

function registrarTurno() {
    console.log("=== REGISTRAR NUEVO TURNO ===");

    const nombre = prompt(
        "Ingrese nombre del paciente (o 'fin' para terminar):"
    );
    if (nombre.toLowerCase() === "fin") return false;

    const edad = parseInt(prompt("Ingrese edad:"));
    if (isNaN(edad)) {
        alert("Edad no válida, por favor ingrese un número");
        return true;
    }

    const especialidadIndex = parseInt(
        prompt(
            `Especialidad:\n0. ${ESPECIALIDADES[0]}\n1. ${ESPECIALIDADES[1]}\n2. ${ESPECIALIDADES[2]}\nIngrese número:`
        )
    );

    if (
        especialidadIndex < 0 ||
        especialidadIndex >= ESPECIALIDADES.length ||
        isNaN(especialidadIndex)
    ) {
        alert("Número de especialidad no válido");
        return true;
    }

    const nuevoTurno = {
        id: proximoTurnoId++,
        nombre,
        edad,
        especialidad: ESPECIALIDADES[especialidadIndex],
        horaRegistro: new Date(),
    };

    turnos.push(nuevoTurno);
    console.log(`Turno #${nuevoTurno.id} registrado para ${nombre}`);
    return true;
}

function calcularTiempoEspera() {
    console.log("=== TIEMPOS DE ESPERA ===");

    if (turnos.length === 0) {
        console.log("No hay turnos registrados");
        return;
    }

    let tiempoAcumulado = 0;

    turnos.forEach((turno, index) => {
        const tiempoEspera = tiempoAcumulado + index * TIEMPO_POR_TURNO;
        console.log(
            `#${turno.id} - ${turno.nombre} (${turno.edad} años) - ${turno.especialidad}: ${tiempoEspera} mins`
        );
    });
}


function mostrarEstadisticas() {
    console.log("=== ESTADÍSTICAS ===");

    const totalTurnos = turnos.length;
    if (totalTurnos === 0) {
        console.log("No hay turnos registrados");
        return;
    }

    const edadPromedio =
        turnos.reduce((sum, t) => sum + t.edad, 0) / totalTurnos;

    console.log(`Total turnos: ${totalTurnos}`);
    console.log(`Edad promedio: ${edadPromedio.toFixed(1)} años`);

    // Mostrar distribución por especialidad
    console.log("\nDistribución por especialidad:");
    ESPECIALIDADES.forEach((especialidad) => {
        const count = turnos.filter(
            (t) => t.especialidad === especialidad
        ).length;
        console.log(
            `${especialidad}: ${count} turnos (${(
                (count / totalTurnos) *
                100
            ).toFixed(1)}%)`
        );
    });
}

// ========== INVOCACIÓN DE FUNCIONES ==========
(function iniciarSimulador() {
    console.log("Bienvenido al Simulador de Turnos Médicos");

    while (true) {
        if (!registrarTurno()) break;
    }

    console.log("\n=== RESUMEN FINAL ===");
    mostrarEstadisticas();
    console.log("\n");
    calcularTiempoEspera();
 
})();
