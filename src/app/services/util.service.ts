import { Injectable } from '@angular/core';

import { CONSTANTS } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  /***************************************************************************/
  /* Block describing the Properties, Setter, Getter and Other methods START */
  /***************************************************************************/

  /**
   * _localHostDomain
   *
   * @private
   * @property
   * @type {string}
   */
  private _localHostDomain = CONSTANTS.LOCAL_HOST_DOMAIN;

  /**
   * _localHostDomain getter
   *
   * @private
   * @getter
   * @returns {string}
   */
  private get localHostDomain() {
    return this._localHostDomain;
  }

  /**
   * _localIpDomain
   *
   * @private
   * @property
   * @type {string}
   */
  private _localIpDomain = CONSTANTS.LOCAL_IP_DOMAIN;

  /**
   * _localHostDomain getter
   *
   * @private
   * @getter
   * @returns {string}
   */
  private get localIpDomain() {
    return this._localHostDomain;
  }

  /*************************************************************************/
  /* Block describing the Properties, Setter, Getter and Other methods END */
  /*************************************************************************/

  /******************************************/
  /* Block describing Private methods START */
  /******************************************/

  /**
   * activePointerEvents
   *
   * @private
   * @property
   * @returns {void}
   */
  private activePointerEvents = () => {
    const mainElement = document.getElementById('main');
    if (mainElement) {
      mainElement.style.pointerEvents = '';
      mainElement.style.opacity = '1';
    }
  };

  /**
   * nonePointerEvents
   *
   * @private
   * @property
   * @returns {void}
   */
  private nonePointerEvents = () => {
    const mainElement = document.getElementById('main');
    if (mainElement) {
      mainElement.style.pointerEvents = 'none';
      mainElement.style.opacity = '0.5';
    }
  };

  /****************************************/
  /* Block describing Private methods END */
  /****************************************/

  /***************************************/
  /* Block describing Util methods START */
  /***************************************/

  /**
   * scrollToElement
   *
   * @public
   * @property
   * @param {string} position
   * @param {number} activeTime
   * @returns {void}
   */
  scrollToElement = (position: string, activeTime: number) => {
    const scrollTarget = document.getElementById(position);

    if (scrollTarget) {
      this.nonePointerEvents();
      setTimeout(() => {
        scrollTarget.scrollIntoView({
          behavior: 'smooth',
        });
      }, 100);

      setTimeout(() => {
        this.activePointerEvents();
      }, activeTime);
    }
  };

  /**
   * scrollToTop
   *
   * @public
   * @property
   * @returns {void}
   */
  scrollToTop = () => {
    const scrollTarget = document.getElementById('topSect');

    if (scrollTarget) {
      this.nonePointerEvents();
      setTimeout(() => {
        scrollTarget.scrollIntoView({
          behavior: 'smooth',
        });
      }, 100);

      setTimeout(() => {
        this.activePointerEvents();
      }, 1200);
    }
  };

  /**
   * cvtNewlinesToHtml
   *
   * @public
   * @property
   * @param {string} content
   * @returns {string}
   */
  cvtNewlinesToHtml = (content: string) => content.replace(/\n/g, '<br>');

  /**
   * checkReferrerMatchesDomain
   *
   * @public
   * @property
   * @param {string} referrer
   * @returns {boolean}
   */
  checkReferrerMatchesDomain = (referrer: string) =>
    referrer.includes(this.localHostDomain) ||
    referrer.includes(this.localIpDomain);

  /***************************************/
  /* Block describing Util methods START */
  /***************************************/
}
