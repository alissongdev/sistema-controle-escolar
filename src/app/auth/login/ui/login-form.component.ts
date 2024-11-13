import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Credentials } from '../../../shared/interfaces/credentials';
import { LoginStatus } from '../data-access/login.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="max-w-lg w-full bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-bold text-center mb-6">
          Agenda Digital - EMEB José Aparecido Silva de Almeida
        </h2>

        @if (loginStatus === 'error') {
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
        >
          Não foi possível se autenticar com os dados informados.
        </div>
        }

        <form
          [formGroup]="loginForm"
          (ngSubmit)="login.emit(loginForm.getRawValue())"
          class="space-y-4"
        >
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >E-mail</label
            >
            <input
              type="email"
              id="email"
              formControlName="email"
              autocomplete="email"
              name="email"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Senha</label
            >
            <input
              type="password"
              id="password"
              formControlName="password"
              autocomplete="current-password"
              name="password"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class LoginFormComponent {
  @Input({ required: true }) loginStatus!: LoginStatus;
  @Output() login = new EventEmitter<Credentials>();

  private fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    email: [''],
    password: [''],
  });
}
