import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Atividade,
  AtividadeRealizada,
  Periodo,
} from '../../shared/interfaces/atividade';

@Component({
  selector: 'app-modal-editar-atividade',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      *ngIf="isOpen"
      class="fixed inset-0 bg-gray-600 bg-opacity-20 overflow-y-auto h-full w-full"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      >
        <div class="mt-3">
          <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">
            Editar Atividade
          </h3>
          <form (ngSubmit)="onSubmit()">
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Status</label>
              <select
                [(ngModel)]="editedAtividade.status"
                name="status"
                class="w-full p-2 border rounded"
              >
                <option
                  *ngFor="let status of atividadeRealizadas"
                  [value]="status"
                >
                  {{ status }}
                </option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Período</label>
              <select
                [(ngModel)]="editedAtividade.periodo"
                name="periodo"
                class="w-full p-2 border rounded"
              >
                <option *ngFor="let periodo of periodos" [value]="periodo">
                  {{ periodo }}
                </option>
              </select>
            </div>

            <div class="flex justify-end gap-3">
              <button
                type="button"
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded"
                (click)="onCancel()"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class ModalEditarAtividadeComponent {
  @Input() isOpen = false;
  @Input() atividade?: Atividade;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Atividade>();

  editedAtividade: Partial<Atividade> = {};
  atividadeRealizadas = Object.values(AtividadeRealizada);
  periodos = Object.values(Periodo);

  ngOnChanges() {
    if (this.atividade) {
      this.editedAtividade = { ...this.atividade };
    }
  }

  onSubmit() {
    if (
      this.atividade &&
      this.editedAtividade.status &&
      this.editedAtividade.periodo
    ) {
      const updatedAtividade = {
        ...this.atividade,
        status: this.editedAtividade.status,
        periodo: this.editedAtividade.periodo,
      };
      this.save.emit(updatedAtividade);
      this.editedAtividade = {};
      this.close.emit();
    }
  }

  onCancel() {
    this.close.emit();
  }
}
