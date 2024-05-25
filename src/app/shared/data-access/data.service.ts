import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Crianca } from '../interfaces/crianca';
import { criancasMocks } from '../mocks/criancasMocks';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  http = inject(HttpClient);
  
  getCriancasByTurma(turmas: string[]): Observable<Crianca[]> {
    const criancasFiltered = criancasMocks.filter(crianca => turmas.includes(crianca.turma));
    return of(criancasFiltered);
  }
}
