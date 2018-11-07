import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';

// import { WebStatusService } from '../web-status/web-status.service';
// import { LoginService } from '../login/login.service';


@Injectable()
export class CanAuthProvide implements CanActivate {
  loginInfo: boolean = true;
  userInfo: any;
  constructor(
    // private statusSrv: WebStatusService,
    // private loginSrv: LoginService,
    private router: Router
  ) { }

  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<any> {
    return this.can()
    // return true;
  }

  can() {
    // this.oauthService.initImplicitFlow();
    let check = localStorage.getItem('roleInfo');
    if (check) {
      console.log('token is available')
      // let up = this.oauthService.loadUserProfile()
      return true;
    } else {
      console.log('token is unavailable');
      this.router.navigate(['login']);
      return false;
      // this.router.navigate(['login']);
    }
  }

}
