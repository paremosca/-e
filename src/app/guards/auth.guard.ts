import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}
  loggedIn : boolean = false;

   async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    await this.ComprobarAuth();

    if (this.loggedIn){

      if(route.routeConfig.path.includes("login") || route.routeConfig.path == ''){
          this.router.navigate(['/inicio'],{ state: { NoSession: 'True' } });
        return !this.loggedIn;
      }else if(route.routeConfig.path.includes("register") || route.routeConfig.path.includes("reset-email")){
        this.router.navigate(['/inicio'],{ state: { NoSession: 'True' } });
      }else{
        return this.loggedIn;
      }
    }else{
      if(route.routeConfig.path.includes("login") || route.routeConfig.path == ''){
        if(route.routeConfig.path == ''){
          this.router.navigate(['/login'],{ state: { NoSession: 'True' } });
        }
        return !this.loggedIn;
      }else if(route.routeConfig.path.includes("register") || route.routeConfig.path.includes("reset-email")){
        return !this.loggedIn;
      }
      else{
        this.router.navigate(['/login'],{ state: { NoSession: 'True' } });
      }
    }

  }

  async ComprobarAuth(){
    try{
      await this.auth.waitForAuthInit();
      this.loggedIn = (await this.auth.IsLogged()).valueOf();
      return this.loggedIn;
    }catch(err:any){
      console.log(err);
    }
  }

}
