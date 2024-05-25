import { Component, inject } from '@angular/core';
import { RecadoCardComponent } from './ui/recado-card.component';
import { RecadoFormComponent } from "./ui/recado-form.component";
import { Recado } from './interfaces/recado';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../shared/ui/sidebar.component";
import { LoginService } from '../auth/login/data-access/login.service';

@Component({
    selector: 'app-recados',
    standalone: true,
    template: `
    <div class="container flex">
      <app-sidebar />
      <main class="flex-grow mx-auto p-4 ml-8">
        <header class="text-2xl font-bold mb-4 my-4">Recados</header>
        <div class="grid grid-cols-4 gap-4">
          <div class="col-span-2">
            <app-recado-card *ngFor="let recado of recados" [recado]="recado" />
          </div>
          <div class="col-span-2">
            <app-recado-form (recado)="onRecadoEnviado($event)" />
          </div>
        </div>
      </main>
    </div>
  `,
    styles: [],
    imports: [RecadoCardComponent, RecadoFormComponent, CommonModule, SidebarComponent]
})
export default class RecadosComponent {
  loginService = inject(LoginService);
  
  onRecadoEnviado(recado: Recado) {
    const recados = JSON.parse(localStorage.getItem('recados') || '[]');
    recados.push(recado);
    localStorage.setItem('recados', JSON.stringify(recados));
  }

  get recados() {
    const allRecados = JSON.parse(localStorage.getItem('recados') || '[]');
    const userType = localStorage.getItem('userType');
    
    if (userType === 'parent') {
      return allRecados.filter((recado: Recado) => 
        recado.nomeEmailRemetente === 'A Escola' || recado.remetenteId === this.loginService.getResponsavel()!.id
      );
    }
    
    return allRecados;
  }
}
