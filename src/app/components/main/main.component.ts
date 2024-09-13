import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';

import { TopSectComponent } from './sections/top-sect/top-sect.component';
import { ProfileSectComponent } from './sections/profile-sect/profile-sect.component';
import { WorksSectComponent } from './sections/works-sect/works-sect.component';
import { BlogSectComponent } from './sections/blog-sect/blog-sect.component';

import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TopSectComponent,
    ProfileSectComponent,
    WorksSectComponent,
    BlogSectComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements AfterViewInit, OnDestroy {
  /********************************************/
  /* Block describing the DI properties START */
  /********************************************/

  /**
   * UtilServiceプロパティ
   *
   * @private
   * @property
   * @type {UtilService}
   */
  private utilService = inject(UtilService);

  /******************************************/
  /* Block describing the DI properties END */
  /******************************************/

  /****************************************************/
  /* Block describing Anuglar lifecycle methods START */
  /****************************************************/

  /**
   * ngAfterViewInit
   *
   * @lifecycle
   */
  ngAfterViewInit(): void {
    const referrer = sessionStorage.getItem('referrer');

    if (referrer && this.utilService.checkReferrerMatchesDomain(referrer)) {
      let scrollTarget = '';
      let activeTime = 0;

      if (referrer.includes('works')) {
        scrollTarget = 'worksSect';
        activeTime = 1000;
      } else if (referrer.includes('blog')) {
        scrollTarget = 'blogSect';
        activeTime = 1300;
      }

      setTimeout(() => {
        this.utilService.scrollToElement(scrollTarget, activeTime);
      });
    }
  }

  /**
   * ngOnDestroy
   *
   * @lifecycle
   */
  ngOnDestroy(): void {
    sessionStorage.removeItem('referrer');
  }

  /**************************************************/
  /* Block describing Anuglar lifecycle methods END */
  /**************************************************/
}
