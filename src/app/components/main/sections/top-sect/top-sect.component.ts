import { Component, inject } from '@angular/core';
import { UtilService } from '../../../../services/util.service';

@Component({
  selector: 'app-top-sect',
  standalone: true,
  imports: [],
  templateUrl: './top-sect.component.html',
  styleUrl: '../sections.component.scss',
})
export class TopSectComponent {
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

  /******************************************/
  /* Block describing the DI properties END */
  /******************************************/

  /*******************************************/
  /* Block describing an Event handler START */
  /*******************************************/

  /**
   * clickTriangle
   *
   * profileセクションまでスクロール
   *
   * @protected
   * @property
   * @returns {void}
   */
  protected clickTriangle = () => {
    this.utilService.scrollToElement('profileSect', 800);
  };

  /*****************************************/
  /* Block describing an Event handler END */
  /*****************************************/
}
