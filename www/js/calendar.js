// Calendar.js - Calendario funcional para More than brows
// Gestiona la navegación de meses, selección de días y carga de citas disponibles

class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.today = new Date();
        this.today.setHours(0, 0, 0, 0); // Normalizar a medianoche
        this.selectedDate = new Date(this.today); // Por defecto, seleccionar hoy
        this.appointments = [];

        // Nombres de meses en español
        this.monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        // Nombres de días en español (abreviados) - Empezando por LUNES
        this.dayNames = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

        this.init();
    }

    async init() {
        this.calendarGrid = document.querySelector('.calendar__days');
        this.monthDisplay = document.querySelector('.calendar__month time');
        this.prevButton = document.querySelector('.calendar__nav--prev');
        this.nextButton = document.querySelector('.calendar__nav--next');

        if (!this.calendarGrid || !this.monthDisplay) {
            console.error('Elementos del calendario no encontrados');
            return;
        }

        // Event listeners para navegación
        this.prevButton?.addEventListener('click', () => this.previousMonth());
        this.nextButton?.addEventListener('click', () => this.nextMonth());

        // Cargar citas desde JSON
        await this.loadAppointments();

        // Renderizar calendario inicial
        this.render();

        // Cargar horarios del día seleccionado (hoy)
        this.loadAppointmentsForSelectedDate();
    }

    async loadAppointments() {
        try {
            const response = await fetch('data/appointments.json');
            const data = await response.json();
            this.appointments = data.appointments;
        } catch (error) {
            console.error('Error cargando citas:', error);
            this.appointments = [];
        }
    }

    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.render();
    }

    getAppointmentsForDate(date) {
        const dateString = this.formatDateForComparison(date);
        return this.appointments.filter(apt => apt.date === dateString && apt.status === 'available');
    }

    hasAppointmentsOnDate(date) {
        return this.getAppointmentsForDate(date).length > 0;
    }

    formatDateForComparison(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    isDateSelected(date) {
        if (!this.selectedDate) return false;
        return this.selectedDate.getDate() === date.getDate() &&
               this.selectedDate.getMonth() === date.getMonth() &&
               this.selectedDate.getFullYear() === date.getFullYear();
    }

    isDatePast(date) {
        const dateNormalized = new Date(date);
        dateNormalized.setHours(0, 0, 0, 0);
        return dateNormalized < this.today;
    }

    isDateToday(date) {
        return date.getDate() === this.today.getDate() &&
               date.getMonth() === this.today.getMonth() &&
               date.getFullYear() === this.today.getFullYear();
    }

    selectDate(date) {
        // No permitir seleccionar días pasados
        if (this.isDatePast(date)) {
            return;
        }

        this.selectedDate = new Date(date);
        this.render();
        this.loadAppointmentsForSelectedDate();
    }

    loadAppointmentsForSelectedDate() {
        if (!this.selectedDate) return;

        const appointments = this.getAppointmentsForDate(this.selectedDate);

        // Separar citas por profesional
        const sofiaAppointments = appointments.filter(apt => apt.professional === 'Sofia');
        const brendaAppointments = appointments.filter(apt => apt.professional === 'Brenda');

        // Actualizar sección de Sofía
        this.updateProfessionalSlots('Sofia', sofiaAppointments);

        // Actualizar sección de Brenda
        this.updateProfessionalSlots('Brenda', brendaAppointments);
    }

    updateProfessionalSlots(professionalName, appointments) {
        // Buscar el contenedor de slots de la profesional
        const professionals = document.querySelectorAll('.professional');
        let targetProfessional = null;

        professionals.forEach(prof => {
            const nameElement = prof.querySelector('.professional__name');
            if (nameElement && nameElement.textContent.trim() === professionalName) {
                targetProfessional = prof;
            }
        });

        if (!targetProfessional) return;

        const slotsContainer = targetProfessional.querySelector('.professional__slots');
        if (!slotsContainer) return;

        // Limpiar slots existentes
        slotsContainer.innerHTML = '';

        // Si no hay citas disponibles, mostrar mensaje
        if (appointments.length === 0) {
            const noSlotsMessage = document.createElement('p');
            noSlotsMessage.className = 'no-slots-message';
            noSlotsMessage.textContent = 'No hay citas disponibles';
            slotsContainer.appendChild(noSlotsMessage);
            return;
        }

        // Crear botones de horarios
        appointments.forEach(apt => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'time-slot';
            button.setAttribute('aria-label', `Cita a las ${apt.time} con ${professionalName}`);

            const timeElement = document.createElement('time');
            timeElement.setAttribute('datetime', apt.time);
            timeElement.textContent = apt.time;

            button.appendChild(timeElement);
            slotsContainer.appendChild(button);
        });
    }

    render() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // Actualizar título del mes
        this.monthDisplay.textContent = `${this.monthNames[month]} ${year}`;
        this.monthDisplay.setAttribute('datetime', `${year}-${String(month + 1).padStart(2, '0')}`);

        // Obtener primer día del mes (ajustado para empezar por lunes)
        const firstDayOfMonth = new Date(year, month, 1);
        let firstDay = firstDayOfMonth.getDay();
        // Ajustar para que lunes sea 0 (domingo pasa de 0 a 6)
        firstDay = firstDay === 0 ? 6 : firstDay - 1;

        // Obtener total de días del mes
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Limpiar grid
        this.calendarGrid.innerHTML = '';

        // Calcular total de celdas necesarias
        const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

        let currentDay = 1;

        for (let i = 0; i < totalCells; i++) {
            const dayButton = document.createElement('button');
            dayButton.type = 'button';
            dayButton.classList.add('calendar__day');
            dayButton.setAttribute('role', 'gridcell');

            // Días vacíos antes del inicio del mes
            if (i < firstDay) {
                dayButton.classList.add('calendar__day--empty');
                dayButton.setAttribute('aria-hidden', 'true');
                dayButton.setAttribute('tabindex', '-1');
                dayButton.disabled = true;
            }
            // Días válidos del mes
            else if (currentDay <= daysInMonth) {
                const date = new Date(year, month, currentDay);
                dayButton.textContent = currentDay;

                const dateString = `${currentDay} de ${this.monthNames[month].toLowerCase()} de ${year}`;
                dayButton.setAttribute('aria-label', dateString);

                // Aplicar clases según estado
                // 1. Verificar si es día pasado
                if (this.isDatePast(date)) {
                    dayButton.classList.add('calendar__day--past');
                    dayButton.disabled = true;
                    dayButton.setAttribute('aria-label', `${dateString}, día pasado`);
                }
                // 2. Verificar si es día seleccionado
                else if (this.isDateSelected(date)) {
                    dayButton.classList.add('calendar__day--selected');
                    dayButton.setAttribute('aria-pressed', 'true');
                    dayButton.setAttribute('aria-label', `${dateString}, seleccionado`);
                }
                // 3. Verificar si tiene citas disponibles
                else if (this.hasAppointmentsOnDate(date)) {
                    dayButton.classList.add('calendar__day--available');
                    dayButton.setAttribute('aria-label', `${dateString}, citas disponibles`);
                }

                // Event listener para selección (solo si no es pasado)
                if (!this.isDatePast(date)) {
                    dayButton.addEventListener('click', () => this.selectDate(date));
                }

                currentDay++;
            }
            // Días vacíos después del final del mes
            else {
                dayButton.classList.add('calendar__day--empty');
                dayButton.setAttribute('aria-hidden', 'true');
                dayButton.setAttribute('tabindex', '-1');
                dayButton.disabled = true;
            }

            this.calendarGrid.appendChild(dayButton);
        }
    }
}

// Inicializar calendario cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const calendar = new Calendar();
});
