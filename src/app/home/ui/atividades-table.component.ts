import { Component, Input, OnInit } from "@angular/core";
import { Atividade } from "../../shared/interfaces/atividade";
import { CommonModule } from "@angular/common";
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

@Component({
  selector: "app-atividades-table",
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  template: `
    <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md mb-8 mt-4">
      <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Criança</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Data Atividade</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Monitor(a)</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Atividade</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Realizada</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Período</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900" *ngIf="isUserMonitor"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            <tr class="hover:bg-gray-50" *ngFor="let atividade of atividades">
              <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                <div class="relative h-10 w-10">
                <img class="h-full w-full rounded-full object-cover object-center" 
                  [src]="atividade.crianca.genero === 'Masculino' ? '../../../assets/boy.png' : '../../../assets/girl.png'" 
                  alt="" />
                </div>
                <div class="text-sm">
                  <div class="font-medium text-gray-700">{{ atividade.crianca.nome }}</div>
                  <div class="text-gray-400">{{ atividade.crianca.turma }}</div>
                </div>
              </th>
              <td class="px-6 py-4">{{ atividade.data | date:'dd/MM/yyyy HH:mm' }} </td>
              <td class="px-6 py-4">{{ atividade.monitor.nome }} </td>
              <td class="px-6 py-4">{{ atividade.tipoAtividade }}</td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <span class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold"
                    [ngClass]="{
                      'bg-green-50 text-green-600': atividade.status === 'Sim',
                      'bg-yellow-50 text-yellow-600': atividade.status === 'Pouco',
                      'bg-red-50 text-red-600': atividade.status === 'Não'
                    }">
                    {{ atividade.status }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">{{ atividade.periodo }}</td>
              <td class="px-6 py-4" *ngIf="isUserMonitor">
                <div class="flex justify-end gap-4">
                  <a class="cursor-pointer" (click)="deleteAtividade(atividade.id)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="h-6 w-6" x-tooltip="tooltip">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </a>
                </div>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class AtividadesTableComponent implements OnInit {
  @Input({ required: true }) atividades!: Atividade[];
  @Input({ required: true }) isUserMonitor!: boolean;

  ngOnInit(): void {
    this.atividades.sort((a, b) => b.data.getTime() - a.data.getTime());
  }

  deleteAtividade(atividadeId: string): void {
    const atividadesFromLocalStorage = JSON.parse(localStorage.getItem('atividades') || '[]');
    const atividadesAtualizadas = atividadesFromLocalStorage.filter((atividade: Atividade) => atividade.id !== atividadeId);
    this.atividades = this.atividades.filter(atividade => atividade.id !== atividadeId);
    localStorage.setItem('atividades', JSON.stringify(atividadesAtualizadas));
  }
}
