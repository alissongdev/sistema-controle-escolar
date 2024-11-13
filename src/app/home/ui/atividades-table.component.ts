import { CommonModule, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import {
  Component,
  EventEmitter,
  Input,
  LOCALE_ID,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { LoginService } from '../../auth/login/data-access/login.service';
import { Atividade } from '../../shared/interfaces/atividade';
import { ModalEditarAtividadeComponent } from './modal-editar-atividade.component';

registerLocaleData(ptBr);

@Component({
  selector: 'app-atividades-table',
  standalone: true,
  imports: [CommonModule, ModalEditarAtividadeComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  template: `
    <div
      class="overflow-hidden rounded-lg border border-gray-200 shadow-md mb-8 mt-4"
    >
      <div *ngIf="isUserMonitor" class="p-4 bg-white">
        <label
          for="turma-select"
          class="block mb-2 text-sm font-medium text-gray-700"
          >Selecione a Turma:</label
        >
        <select
          id="turma-select"
          class="block w-1/4 p-2 border border-gray-300 rounded-md"
          (change)="onTurmaChange($event)"
          [value]="selectedTurma"
        >
          <option *ngFor="let turma of turmas" [value]="turma">
            {{ turma }}
          </option>
        </select>
      </div>
      <table
        class="w-full border-collapse bg-white text-left text-sm text-gray-500"
      >
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Criança
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Data Atividade
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Monitor(a)
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Atividade
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Realizada
            </th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">
              Período
            </th>
            <th
              scope="col"
              class="px-6 py-4 font-medium text-gray-900"
              *ngIf="isUserMonitor"
            ></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
          <tr
            class="hover:bg-gray-50"
            *ngFor="let atividade of filteredAtividades"
          >
            <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
              <div class="relative h-10 w-10">
                <img
                  class="h-full w-full rounded-full object-cover object-center"
                  [src]="
                    atividade.crianca.genero === 'Masculino'
                      ? '../../../assets/boy.png'
                      : '../../../assets/girl.png'
                  "
                  alt=""
                />
              </div>
              <div class="text-sm">
                <div class="font-medium text-gray-700">
                  {{ atividade.crianca.nome }}
                </div>
                <div class="text-gray-400">{{ atividade.crianca.turma }}</div>
              </div>
              <div
                class="autism-icon flex items-center"
                *ngIf="atividade.crianca.autista"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 512.001 512.001"
                  style="enable-background:new 0 0 512.001 512.001"
                  xml:space="preserve"
                >
                  <path
                    style="fill:#ffd54f"
                    d="M462.365 110.69V49.635H401.31c0 23.266-18.861 42.128-42.128 42.128s-42.128-18.862-42.128-42.128h-61.055l-23.331 39.358 23.331 21.698c23.266 0 42.128 18.862 42.128 42.128s-18.862 42.128-42.128 42.128l-19.995 31.501 19.995 29.554 97.992 92.887 108.372-92.887v-61.055c23.267 0 42.128-18.861 42.128-42.128s-18.858-42.129-42.126-42.129z"
                  />
                  <path
                    style="fill:#029ae6"
                    d="M462.365 317.056v-61.055H401.31c0 23.266-18.861 42.128-42.128 42.128s-42.128-18.862-42.128-42.128h-61.055l-94.727 92.887 94.727 113.479h61.055c0 23.267 18.861 42.128 42.128 42.128 23.266 0 42.128-18.861 42.128-42.128h61.055v-61.055c-23.266 0-42.128-18.862-42.128-42.128 0-23.267 18.862-42.128 42.128-42.128z"
                  />
                  <path
                    style="fill:#66bb6a"
                    d="m256 256.001-94.727-91.275-111.638 91.275v61.055c-23.266 0-42.128 18.862-42.128 42.128 0 23.266 18.862 42.128 42.128 42.128v61.055h61.055c0-23.266 18.862-42.128 42.128-42.128s42.128 18.862 42.128 42.128H256v-61.055c-23.266 0-42.128-18.862-42.128-42.128 0-23.267 18.862-42.128 42.128-42.128v-61.055z"
                  />
                  <path
                    style="fill:#ee534f"
                    d="M298.128 152.818c0-23.266-18.862-42.128-42.128-42.128V49.635h-61.055c0-23.266-18.862-42.128-42.128-42.128s-42.128 18.862-42.128 42.128H49.635v61.055c23.266 0 42.128 18.862 42.128 42.128s-18.862 42.128-42.128 42.128v61.055h61.055c0-23.267 18.862-42.128 42.128-42.128s42.128 18.862 42.128 42.128H256v-61.055c23.267 0 42.128-18.861 42.128-42.128z"
                  />
                  <path
                    d="M469.872 103.75V49.635a7.507 7.507 0 0 0-7.507-7.507H401.31a7.507 7.507 0 0 0-7.507 7.507c0 19.091-15.532 34.621-34.621 34.621s-34.621-15.531-34.621-34.621a7.507 7.507 0 0 0-7.507-7.507H201.886C198.257 18.309 177.635 0 152.818 0s-45.439 18.308-49.068 42.128H49.635a7.507 7.507 0 0 0-7.507 7.507v61.055a7.507 7.507 0 0 0 7.507 7.507c19.09 0 34.621 15.531 34.621 34.621 0 19.09-15.532 34.622-34.621 34.622a7.507 7.507 0 0 0-7.507 7.507v115.169C18.308 313.744 0 334.366 0 359.183s18.308 45.439 42.128 49.068v54.115a7.507 7.507 0 0 0 7.507 7.507h61.055a7.507 7.507 0 0 0 7.507-7.507c0-19.09 15.532-34.621 34.621-34.621s34.622 15.532 34.622 34.621a7.507 7.507 0 0 0 7.507 7.507h115.169c3.628 23.82 24.25 42.128 49.068 42.128s45.439-18.308 49.068-42.128h54.115a7.507 7.507 0 0 0 7.507-7.507v-61.055a7.507 7.507 0 0 0-7.507-7.507c-19.09 0-34.621-15.531-34.621-34.621s15.532-34.621 34.621-34.621a7.507 7.507 0 0 0 7.507-7.507V201.886c23.82-3.628 42.128-24.25 42.128-49.068s-18.309-45.44-42.13-49.068zm-7.507 83.689a7.507 7.507 0 0 0-7.507 7.507v53.548H401.31a7.507 7.507 0 0 0-7.507 7.507c0 13.841-8.639 26.735-21.425 32.012-3.477 1.435-5.403 5.423-4.343 9.04 1.232 4.207 6.007 6.516 10.072 4.837 15.877-6.556 27.576-21.392 30.147-38.383h46.604v46.608c-23.82 3.628-42.128 24.25-42.128 49.068s18.308 45.439 42.128 49.068v46.608H401.31a7.507 7.507 0 0 0-7.507 7.507c0 19.09-15.532 34.622-34.621 34.622s-34.621-15.532-34.621-34.622a7.507 7.507 0 0 0-7.507-7.507h-53.548v-53.548a7.507 7.507 0 0 0-7.507-7.507c-15.112 0-28.362-9.664-32.971-24.046a7.507 7.507 0 0 0-14.297 4.581c5.832 18.2 21.313 31.13 39.761 33.916v46.604h-46.608c-3.628-23.82-24.25-42.128-49.068-42.128s-45.439 18.308-49.068 42.128H57.141v-53.548a7.507 7.507 0 0 0-7.507-7.507c-19.09 0-34.621-15.531-34.621-34.621s15.532-34.621 34.621-34.621a7.507 7.507 0 0 0 7.507-7.507v-53.548h53.548a7.507 7.507 0 0 0 7.507-7.507c0-13.396 7.854-25.717 20.01-31.388 3.945-1.841 5.498-6.922 3.27-10.655-1.938-3.248-6.195-4.545-9.617-2.951-15.119 7.054-25.597 21.291-28.099 37.486H57.141v-46.608c23.82-3.628 42.128-24.25 42.128-49.068s-18.308-45.44-42.128-49.068V57.142h53.548a7.507 7.507 0 0 0 7.507-7.507c0-19.091 15.532-34.621 34.621-34.621s34.622 15.531 34.622 34.621a7.507 7.507 0 0 0 7.507 7.507h53.548v53.548a7.507 7.507 0 0 0 7.507 7.507c15.242 0 28.527 9.767 33.059 24.303 1.215 3.901 5.504 6.146 9.401 4.932 3.872-1.206 6.155-5.478 4.932-9.401-5.741-18.414-21.277-31.492-39.886-34.289v-46.6h46.608c3.628 23.82 24.25 42.128 49.068 42.128s45.439-18.308 49.068-42.128h46.608v53.548a7.507 7.507 0 0 0 7.507 7.507c19.09 0 34.622 15.531 34.622 34.621-.001 19.09-15.532 34.621-34.623 34.621z"
                  />
                  <path
                    d="M347.705 288.666c-13.843-4.864-23.144-17.991-23.144-32.665a7.507 7.507 0 0 0-7.507-7.507h-53.548v-46.616c16.345-2.517 30.652-13.136 37.653-28.468 1.578-3.457.249-7.674-3.028-9.592-3.777-2.211-8.816-.615-10.628 3.356-5.622 12.311-17.987 20.266-31.503 20.266a7.507 7.507 0 0 0-7.507 7.507v53.548h-46.598a49.837 49.837 0 0 0-1.531-6.873c-4.666-15.629-16.827-28.176-33.127-33.119a7.507 7.507 0 0 0-4.358 14.367c14.689 4.455 24.559 17.77 24.559 33.132a7.507 7.507 0 0 0 7.507 7.507h53.548v46.614c-16.498 2.532-30.873 13.293-37.819 28.839a7.508 7.508 0 0 0 3.791 9.916c3.7 1.653 8.268-.103 9.916-3.791 5.57-12.467 17.981-20.522 31.619-20.522a7.507 7.507 0 0 0 7.507-7.507V263.51h46.613c2.743 17.903 15.158 33.191 32.609 39.323 4.598 1.615 9.815-1.944 9.992-6.811a7.511 7.511 0 0 0-5.016-7.356z"
                  />
                </svg>
              </div>
            </th>
            <td class="px-6 py-4">
              {{ atividade.data | date : 'dd/MM/yyyy HH:mm' }}
            </td>
            <td class="px-6 py-4">{{ atividade.monitor.nome }}</td>
            <td class="px-6 py-4">{{ atividade.tipoAtividade }}</td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <span
                  class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold"
                  [ngClass]="{
                    'bg-green-50 text-green-600': atividade.status === 'Sim',
                    'bg-yellow-50 text-yellow-600':
                      atividade.status === 'Pouco',
                    'bg-red-50 text-red-600': atividade.status === 'Não'
                  }"
                >
                  {{ atividade.status }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4">{{ atividade.periodo }}</td>
            <td class="px-6 py-4" *ngIf="isUserMonitor">
              <div class="flex justify-end gap-4">
                <a
                  class="cursor-pointer edit-button"
                  (click)="openEditModal(atividade)"
                >
                  <svg
                    class="feather feather-edit"
                    fill="none"
                    height="24"
                    stroke="blue"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    />
                    <path
                      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    />
                  </svg>
                </a>
                <a
                  class="cursor-pointer"
                  (click)="deleteAtividade(atividade.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="red"
                    class="h-6 w-6"
                    x-tooltip="tooltip"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </a>
                <app-modal-editar-atividade
                  [isOpen]="isEditModalOpen"
                  [atividade]="selectedAtividade"
                  (close)="isEditModalOpen = false"
                  (save)="handleSaveEdit($event)"
                />
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
  @Output() atividadeDeletada = new EventEmitter<string>();
  @Output() atividadeEditada = new EventEmitter<Atividade>();
  @Output() turmaChanged = new EventEmitter<string>();
  turmas: string[] = [];
  isEditModalOpen = false;
  selectedAtividade?: Atividade;
  selectedTurma: string = 'Todas as turmas';
  filteredAtividades: Atividade[] = [];

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.turmas = [
      'Todas as turmas',
      ...this.loginService.getMonitor()!.turmas,
    ];
    this.atividades.sort((a, b) => b.data.getTime() - a.data.getTime());
    this.filteredAtividades = this.atividades;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['atividades']) {
      this.filteredAtividades =
        this.selectedTurma === 'Todas as turmas'
          ? this.atividades
          : this.atividades.filter(
              (atividade) => atividade.crianca.turma === this.selectedTurma
            );
      this.filteredAtividades.sort(
        (a, b) => b.data.getTime() - a.data.getTime()
      );
    }
  }

  onTurmaChange(event: Event) {
    const turma = (event.target as HTMLSelectElement).value;
    this.selectedTurma = turma;
    this.filteredAtividades =
      turma === 'Todas as turmas'
        ? [...this.atividades]
        : this.atividades.filter(
            (atividade) => atividade.crianca.turma === turma
          );
    this.filteredAtividades.sort((a, b) => b.data.getTime() - a.data.getTime());
    this.turmaChanged.emit(turma);
  }

  openEditModal(atividade: Atividade) {
    this.selectedAtividade = atividade;
    this.isEditModalOpen = true;
  }

  handleSaveEdit(updatedAtividade: Atividade) {
    const atividadesFromLocalStorage = JSON.parse(
      localStorage.getItem('atividades') || '[]'
    );

    const atividadesAtualizadas = atividadesFromLocalStorage.map(
      (atividade: Atividade) =>
        atividade.id === updatedAtividade.id ? updatedAtividade : atividade
    );

    localStorage.setItem('atividades', JSON.stringify(atividadesAtualizadas));

    this.atividades = this.atividades.map((atividade) =>
      atividade.id === updatedAtividade.id ? updatedAtividade : atividade
    );

    this.atividadeEditada.emit(updatedAtividade);

    this.isEditModalOpen = false;
    this.selectedAtividade = undefined;
  }

  deleteAtividade(atividadeId: string): void {
    const atividadesFromLocalStorage = JSON.parse(
      localStorage.getItem('atividades') || '[]'
    );
    const atividadesAtualizadas = atividadesFromLocalStorage.filter(
      (atividade: Atividade) => atividade.id !== atividadeId
    );
    this.atividades = this.atividades.filter(
      (atividade) => atividade.id !== atividadeId
    );
    localStorage.setItem('atividades', JSON.stringify(atividadesAtualizadas));
    this.atividadeDeletada.emit(atividadeId);
  }
}
