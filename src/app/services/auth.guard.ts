import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router , private toast : ToastrService){};
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {

      if (this.authService.isLoggedGuard){
        return true
      }
      else {
        this.toast.warning ('You dont have permission to access this page ')

        this.router.navigate(['/login'])
        return false
      }
      
  }
  
}