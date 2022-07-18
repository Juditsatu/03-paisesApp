import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html'
})
export class PaisInputComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() placeholder: string = '';

  //Observable "manual" s'emiteix quan deixes d'escriure l'input
  debouncer: Subject<string> = new Subject();
  
  termino: string = '';

  //es dispara una vegada quan el component esta inicialitzat
  ngOnInit() {
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe( valor => {
      this.onDebounce.emit(valor);
    })
  }

  buscar() {
    this.onEnter.emit(this.termino);
    this.debouncer
  }

  teclaPresionada() {
    //next per donar el seguent valor, ja esta conectat al debauncer
    this.debouncer.next(this.termino);
  }
}
