import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Recado } from '../interfaces/recado';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../auth/login/data-access/login.service';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-recado-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="recadoForm"
          (ngSubmit)="onSubmit()"
          class="bg-white shadow-md border rounded-lg p-4 space-y-4">
      <div>
        <label class="block text-gray-700">Assunto</label>
        <input type="text" formControlName="assunto" id="assunto" name="assunto" required class="w-full mt-1 p-2 border rounded-md" placeholder="Assunto do recado">
      </div>
      <div>
        <label class="block text-gray-700">Mensagem</label>
        <textarea formControlName="mensagem" id="mensagem" name="mensagem" required class="w-full mt-1 p-2 border rounded-md" rows="4" placeholder="Escreva sua mensagem"></textarea>
      </div>
      <div class="flex justify-end">
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">Enviar</button>
      </div>
    </form>
    <div *ngIf="showToast" class="max-w-xs fixed bottom-4 right-4 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert">
      <div class="flex p-4">
        <div class="flex-shrink-0">
          <svg class="flex-shrink-0 size-4 text-teal-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
          </svg>
        </div>
        <div class="ms-3">
          <p class="text-sm text-gray-700 dark:text-neutral-400">
            Recado enviado com sucesso!
          </p>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class RecadoFormComponent {
  @Output() recado = new EventEmitter<Recado>();
    
  private fb = inject(FormBuilder);
  loginService = inject(LoginService);

  showToast = false;

  isUserMonitor = this.loginService.isUserMonitor();

  nomeEmailRemetente = (() => {
    return this.isUserMonitor ? 'A Escola' : this.loginService.getResponsavel()!.nome + ' (' + this.loginService.getResponsavel()!.email + ')';
  })();

  remetenteId = (() => {
    return this.isUserMonitor ? this.loginService.getMonitor()!.id : this.loginService.getResponsavel()!.id;
  })();

  recadoForm = this.fb.nonNullable.group({
    id: [this.generateId()],
    remetenteId: [this.remetenteId],
    nomeEmailRemetente: [this.nomeEmailRemetente],
    dataEnvio: [new Date().toLocaleDateString()],
    assunto: [''],
    mensagem: [''],
  });

  generateId() {
    return uuidv4();
  }

  onSubmit() {
    this.recado.emit(this.recadoForm.getRawValue());
    this.recadoForm.reset({
      id: this.generateId(),
      remetenteId: this.remetenteId,
      nomeEmailRemetente: this.nomeEmailRemetente,
      dataEnvio: new Date().toLocaleDateString(),
      assunto: '',
      mensagem: '',
    });
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }
}
