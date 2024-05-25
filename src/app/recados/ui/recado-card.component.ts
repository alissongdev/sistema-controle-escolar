import { Component, Input } from '@angular/core';
import { Recado } from '../interfaces/recado';
import { inject } from '@angular/core';
import { LoginService } from '../../auth/login/data-access/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recado-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4 mb-8">
      <div class="bg-white shadow-md border rounded-lg p-4">
        <h2 class="text-xl font-semibold">{{ recado.assunto }}</h2>
        <div class="flex justify-between">
          <p class="text-gray-500 text-sm">Remetente: {{ recado.nomeEmailRemetente }}</p>
          <p class="text-gray-500 text-sm">Enviado em: {{ recado.dataEnvio | date:'dd/MM/yyyy' }}</p>
        </div>
        <p class="text-gray-600 my-4">{{ recado.mensagem }}</p>
        <div *ngIf="canDeleteRecado()" class="flex justify-end">
          <button (click)="deleteRecado()" class="bg-red-500 text-white px-4 py-2 rounded-md">Excluir</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RecadoCardComponent {
  @Input({ required: true }) recado!: Recado;

  loginService = inject(LoginService);

  isUserMonitor = this.loginService.isUserMonitor();
  currentUserId = this.isUserMonitor ? this.loginService.getMonitor()!.id : this.loginService.getResponsavel()!.id;

  canDeleteRecado(): boolean {
    if (this.isUserMonitor && this.recado.nomeEmailRemetente === 'A Escola') {
      return true;
    }
    return this.recado.remetenteId === this.currentUserId;
  }

  deleteRecado() {
    if (this.canDeleteRecado()) {
      const confirmation = confirm('Você tem certeza que deseja excluir este recado?');
      if (confirmation) {
        const recados = JSON.parse(localStorage.getItem('recados') || '[]');
        const updatedRecados = recados.filter((r: Recado) => r.id !== this.recado.id);
        localStorage.setItem('recados', JSON.stringify(updatedRecados));
      }
    }
  }
}
