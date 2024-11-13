import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { LoginService } from '../../auth/login/data-access/login.service';
import { DataService } from '../../shared/data-access/data.service';
import {
  Atividade,
  AtividadeRealizada,
  Periodo,
  TipoAtividade,
} from '../../shared/interfaces/atividade';
import { Crianca } from '../../shared/interfaces/crianca';

@Component({
  selector: 'app-cadastrar-atividade',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="max-w-md mx-auto bg-white shadow-md border rounded-lg overflow-hidden p-5"
    >
      <h3 class="text-xl font-semibold mb-3">Cadastrar Novas Atividades</h3>
      <form (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <label class="block text-gray-700">Criança</label>
          <select
            [(ngModel)]="selectedCrianca"
            name="selectedCrianca"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          >
            <option *ngFor="let crianca of criancas" [ngValue]="crianca">
              {{ crianca.nome }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Atividades</label>
          <div
            *ngFor="let atividade of atividadesConfig; let i = index"
            class="mb-2 p-2 border rounded"
          >
            <div>
              <input
                type="checkbox"
                [(ngModel)]="atividade.selected"
                name="atividade-{{ i }}"
                class="mr-2"
              />
              {{ atividade.tipoAtividade }}
            </div>
            <div class="mt-2" *ngIf="atividade.selected">
              <label class="block text-gray-700">Status</label>
              <select
                [(ngModel)]="atividade.status"
                name="status-{{ i }}"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              >
                <option
                  *ngFor="let status of atividadeRealizadas"
                  [ngValue]="status"
                >
                  {{ status }}
                </option>
              </select>
            </div>
            <div class="mt-2" *ngIf="atividade.selected">
              <label class="block text-gray-700">Período</label>
              <select
                [(ngModel)]="atividade.periodo"
                name="periodo-{{ i }}"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                required
              >
                <option *ngFor="let periodo of periodos" [ngValue]="periodo">
                  {{ periodo }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Cadastrar Atividades
        </button>
      </form>
      <div
        *ngIf="showToast"
        class="max-w-xs fixed bottom-4 right-4 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
        role="alert"
      >
        <div class="flex p-4">
          <div class="flex-shrink-0">
            <svg
              class="flex-shrink-0 size-4 text-teal-500 mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
              ></path>
            </svg>
          </div>
          <div class="ms-3">
            <p class="text-sm text-gray-700 dark:text-neutral-400">
              Atividades cadastradas com sucesso!
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CadastrarAtividadeComponent implements OnInit {
  @Output() atividadeCadastrada = new EventEmitter<Atividade[]>();
  @Input() selectedTurma: string = 'Todas as turmas';

  criancas: Crianca[] = [];
  allCriancas: Crianca[] = [];
  selectedCrianca?: Crianca;
  tipoAtividades = Object.values(TipoAtividade);
  atividadeRealizadas = Object.values(AtividadeRealizada);
  periodos = Object.values(Periodo);

  showToast = false;

  atividadesConfig = this.tipoAtividades.map((tipo) => ({
    tipoAtividade: tipo,
    selected: false,
    status: undefined as AtividadeRealizada | undefined,
    periodo: undefined as Periodo | undefined,
  }));

  constructor(
    private dataService: DataService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    if (this.loginService.isUserMonitor()) {
      this.dataService
        .getCriancasByTurma(this.loginService.getMonitor()!.turmas)
        .subscribe((criancas) => {
          this.allCriancas = criancas;
          this.filterCriancasByTurma();
        });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedTurma'] && this.allCriancas.length > 0) {
      this.filterCriancasByTurma();
      this.selectedCrianca = undefined;
    }
  }

  private filterCriancasByTurma() {
    this.criancas =
      this.selectedTurma === 'Todas as turmas'
        ? this.allCriancas
        : this.allCriancas.filter(
            (crianca) => crianca.turma === this.selectedTurma
          );
  }

  saveAtividadeToLocalStorage(atividade: Atividade): void {
    const atividades = JSON.parse(localStorage.getItem('atividades') || '[]');
    atividades.push(atividade);
    localStorage.setItem('atividades', JSON.stringify(atividades));
  }

  generateId(): string {
    return uuidv4();
  }

  onSubmit(): void {
    if (this.selectedCrianca) {
      const atividades: Atividade[] = this.atividadesConfig
        .filter((atividade) => atividade.selected)
        .map((atividade) => ({
          id: this.generateId(),
          crianca: this.selectedCrianca!,
          data: new Date(),
          monitor: this.loginService.getMonitor()!,
          tipoAtividade: atividade.tipoAtividade,
          status: atividade.status!,
          periodo: atividade.periodo,
        }));

      this.showToast = true;

      setTimeout(() => (this.showToast = false), 3000);

      this.atividadesConfig.forEach((atividade) => {
        atividade.selected = false;
        atividade.status = undefined;
        atividade.periodo = undefined;
      });

      this.selectedCrianca = undefined;

      this.atividadeCadastrada.emit(atividades);
    }
  }
}
