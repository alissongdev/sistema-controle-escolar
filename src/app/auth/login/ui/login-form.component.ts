import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Credentials } from "../../../shared/interfaces/credentials";
import { LoginStatus } from '../data-access/login.service';

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600" alt="Your Company">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Acessar a plataforma</h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          [formGroup]="loginForm"
          (ngSubmit)="login.emit(loginForm.getRawValue())"
          class="space-y-6"
        >
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">E-mail</label>
            <div class="mt-2">
              <input formControlName="email" id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label class="block text-sm font-medium leading-6 text-gray-900">Senha</label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-blue-600 hover:text-blue-500">Esqueceu a senha?</a>
              </div>
            </div>
            <div class="mt-2">
              <input formControlName="password" id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
            </div>
          </div>

          @if (loginStatus === 'error') {
            <div class="text-red-500">Não foi possível se autenticar com os dados informados.</div>
          }

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Entrar</button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          Ainda não tem uma conta?
          <a href="#" class="font-semibold leading-6 text-blue-600 hover:text-blue-500">Cadastre-se</a>
        </p>
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
