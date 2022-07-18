import { Component } from '@angular/core';

import { PaisService } from '../../services/pais.service';

import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html'
})
export class PorCapitalComponent {

  termino: string = '';
  hayError: boolean = false;
  capitales: Country[] = [];

  constructor(private capitalService: PaisService) { }

  buscar( termino: string ) {
    this.hayError = false;
    this.termino = termino;

    this.capitalService.buscarCapital(termino)
    .subscribe({
      next: (capitales) => {
        this.capitales = capitales;
      },
      error: () => {
        this.hayError = true
        this.capitales = []
      }
    });

  }
}
