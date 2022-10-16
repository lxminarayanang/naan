import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../services/common/common.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    auth: any;
    token: any;
    constructor(
        private service: CommonService,
        private router: Router,
    ) {
        this.token = this.service.session("get", 'Authorization');

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.token) {
            return true;
        } else {
            this.service.logout();
            return false;
        }
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        this.router.navigate(['/home/']);
        return false
    }
}
