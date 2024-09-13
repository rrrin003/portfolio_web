import { Component, inject } from '@angular/core';
import { UtilService } from '../../../../services/util.service';

@Component({
  selector: 'app-profile-sect',
  standalone: true,
  imports: [],
  templateUrl: './profile-sect.component.html',
  styleUrls: ['./profile-sect.component.scss', '../sections.component.scss'],
})
export class ProfileSectComponent {
  /********************************************/
  /* Block describing the DI properties START */
  /********************************************/

  /**
   * utilService
   *
   * @private
   * @property
   * @type {UtilService}
   */
  private utilService = inject(UtilService);

  /*************************************/
  /* Block describing the property END */
  /*************************************/

  /*******************************************/
  /* Block describing an Event handler START */
  /*******************************************/

  /**
   * clickTriangle
   *
   * worksセクションまでスクロール
   *
   * @protected
   * @property
   * @returns {void}
   */
  protected clickTriangle = () => {
    this.utilService.scrollToElement('worksSect', 800);
  };

  /*****************************************/
  /* Block describing an Event handler END */
  /*****************************************/
}
