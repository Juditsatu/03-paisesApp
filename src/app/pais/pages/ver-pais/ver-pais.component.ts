import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html'
})
export class VerPaisComponent implements OnInit {

  //Posa el ! per indicar que hi haura data pero pot ser null
  pais!: Country;

  //Abans de inicialitzar el component
  constructor( 
    private activateRoute: ActivatedRoute,
    private paisService: PaisService 
    ) { }

  //Quan el component esta inicialitzat
  ngOnInit(): void {

    this.activateRoute.params
      .pipe(
        switchMap( ({ id }) => this.paisService.getPaisPorAlpha( id )),
        tap(console.log)
      )
      .subscribe( pais => this.pais = pais[0] );
  }

}
