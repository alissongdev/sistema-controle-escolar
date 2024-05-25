import { Component, inject } from "@angular/core";
import { LoginService } from "../../auth/login/data-access/login.service";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [RouterLink],
  template: `
    <aside class="flex sticky top-0">
      <div class="flex flex-col items-center w-16 min-h-screen py-8 bg-white border border-gray-200">
        <nav class="flex flex-col items-center flex-1 space-y-8 ">
          <a [routerLink]="['/home']" class="cursor-pointer p-1.5 inline-block text-blue-500 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </a>
          <a [routerLink]="['/recados']" class="cursor-pointer p-1.5 text-blue-500 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </a>
        </nav>
        <div class="flex flex-col items-center mt-4 space-y-4">
          <a [routerLink]="['/home']" class="cursor-pointer relative inline-flex items-center justify-center w-8 h-8 text-white rounded bg-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-labelledby="title description" role="graphics-symbol">
              <title id="title">User Icon</title>
              <desc id="description">
                User profile icon
              </desc>
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </a>
          <a (click)="logout()" class="text-gray-500 cursor-pointer transition-colors duration-200 rotate-180 rtl:rotate-0 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  `,
  styles: []
})
export class SidebarComponent {
  loginService = inject(LoginService);
  private router = inject(Router);

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
