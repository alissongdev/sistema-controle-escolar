import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { DataService } from '../shared/data-access/data.service';
import { Atividade } from '../shared/interfaces/atividade';
import { Crianca } from '../shared/interfaces/crianca';
import { CommonModule } from '@angular/common';
import { AtividadesTableComponent } from './ui/atividades-table.component';
import { LoginService } from '../auth/login/data-access/login.service';
import { SidebarComponent } from '../shared/ui/sidebar.component';
import { CadastrarAtividadeComponent } from './ui/cadastrar-atividade.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AtividadesTableComponent, SidebarComponent, CadastrarAtividadeComponent],
  template: `
    <div class="container flex">
      <app-sidebar />
      <main class="flex-grow mx-auto p-4 ml-8">
        <header class="text-2xl font-bold my-4">Atividades</header>
        <div>
          <app-atividades-table [atividades]="atividades" [isUserMonitor]="loginService.isUserMonitor()" />
          <app-cadastrar-atividade *ngIf="this.loginService.isUserMonitor()" (atividadeCadastrada)="onAtividadeCadastrada($event)" />
        </div>
      </main>
    </div>
  `,
  styles: []
})
export default class HomeComponent implements OnInit {
  dataService = inject(DataService);
  loginService = inject(LoginService);
  private cdr = inject(ChangeDetectorRef);

  criancas: Crianca[] = [];
  atividades: Atividade[] = [];

  ngOnInit(): void {
    if (this.loginService.isUserMonitor()) {
      this.dataService.getCriancasByTurma(this.loginService.getMonitor()!.turmas).subscribe(criancas => {
        this.criancas = criancas;

        const atividadesFromLocalStorage = JSON.parse(localStorage.getItem('atividades') || '[]');

        this.atividades = atividadesFromLocalStorage
          .filter((atividade: Atividade) => criancas.some(crianca => crianca.id === atividade.crianca.id))
          .map((atividade: Atividade) => ({ ...atividade, data: new Date(atividade.data) }));
          
        this.cdr.detectChanges();
    });
    } else {
      this.criancas = this.loginService.getResponsavel()!.criancas;

      const atividadesFromLocalStorage = JSON.parse(localStorage.getItem('atividades') || '[]');

      this.atividades = atividadesFromLocalStorage
        .filter((atividade: Atividade) => this.criancas.some(crianca => crianca.id === atividade.crianca.id))
        .map((atividade: Atividade) => ({ ...atividade, data: new Date(atividade.data) }));

      this.cdr.detectChanges();
    }
  }

  onAtividadeCadastrada(novasAtividades: Atividade[]) {
    this.atividades.push(...novasAtividades);
    const atividadesFromLocalStorage = JSON.parse(localStorage.getItem('atividades') || '[]');
    const atividadesAtualizadas = [
      ...atividadesFromLocalStorage,
      ...novasAtividades.map(atividade => ({ ...atividade, data: new Date(atividade.data) }))
    ];
    localStorage.setItem('atividades', JSON.stringify(atividadesAtualizadas));
    this.cdr.detectChanges();
  }
}
