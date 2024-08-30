import {
  Directive,
  inject,
  input,
  effect,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';
@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' });
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        console.log('SHOW ELEMENT');
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        console.log('DO NO SHOW ELEMENT');
        this.viewContainerRef.clear();
      }
    });
  }
}
