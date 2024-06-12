import { enableProdMode, NgModuleRef  } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
.then((moduleRef: NgModuleRef<AppModule>) => {
  const router = moduleRef.injector.get(Router);
  const currentUrl = router.url;
  console.log(currentUrl);
  
  // const arrayUrl = ['/createClient', '/familly', '/createAdmin', '/createExpert', '/createDirector'];
  
  // for (const item of arrayUrl) {
  //   if (currentUrl == item) {
  //     const navbar = document.querySelector('.navbarcontent') as HTMLInputElement;
  //     navbar.style.width = '13rem';
  //     alert('oui')
  //   } else {
  //     const navbar = document.querySelector('.navbarcontent') as HTMLInputElement;
  //     navbar.style.width = '1rem';
  //     alert('non')
  //   }
  // }
})
.catch(err => console.error(err));