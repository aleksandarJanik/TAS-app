import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { LogInService } from '../login/components/login/logIn.service';
 
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
    constructor(private _router:Router, private loginService: LogInService ) {
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