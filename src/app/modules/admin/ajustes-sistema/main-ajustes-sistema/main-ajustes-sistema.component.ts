/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main-ajustes-sistema',
    templateUrl: './main-ajustes-sistema.component.html',
    styleUrls: ['./main-ajustes-sistema.component.scss'],
})
export class MainAjustesSistemaComponent implements OnInit {
    constructor(
        private ruta: Router
    ) {
    }

    ngOnInit(): void {
    }

    irTiposCarga(): void {
        this.ruta.navigateByUrl('/ajustes-sistema/tipos-carga');
    }

    irVehiculos(): void {
        this.ruta.navigateByUrl('/ajustes-sistema/vehiculos');
    }
}
