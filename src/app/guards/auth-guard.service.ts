import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, CanActivateChild, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LogInService } from '../login/components/login/logIn.service';
 
 
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
 
    constructor(private _router:Router, private loginService: LogInService ) {
    }

    async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let sessions = await this.loginService.getSessions();
        //check some condition  
        if (sessions)  {
            let userName = localStorage.getItem("userName");
            if (userName){
               let userInSession = sessions.find(u => u.sessionId.includes(userName));
               if (userInSession) {
                alert('You are Already Logged in.');
                this._router.navigateByUrl("/class");
                return false;
               }
            }
            return true;
        } 
        return true;
    }
 
    async canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Promise<boolean> {
        
        let sessions = await this.loginService.getSessions();
        //check some condition  
        if (sessions)  {
            let userName = localStorage.getItem("userName");
            if (userName){
               let userInSession = sessions.find(u => u.sessionId.includes(userName));
               if (userInSession) {
                   return true;
               }
            }
            alert('You are not allowed to view this page, please login.');
            this._router.navigateByUrl("/create-account");
            return false;
        } 
        return false;
    }
 
}