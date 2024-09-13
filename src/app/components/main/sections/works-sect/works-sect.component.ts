import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FetchService } from '../../../../services/fetch.service';

import { WorksData } from '../../../../interfaces/fetch.interface';
import { UtilService } from '../../../../services/util.service';

@Component({
  selector: 'app-works-sect',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './works-sect.component.html',
  styleUrls: ['./works-sect.component.scss', '../sections.component.scss'],
})
export class WorksSectComponent implements OnInit {
  /********************************************/
  /* Block describing the DI properties START */
  /********************************************/

  /**
   * fetchService
   *
   * @private
   * @property
   * @type {FetchService}
   */
  private fetchService = inject(FetchService);

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

  /***************************************************************************/
  /* Block describing the Properties, Setter, Getter and Other methods START */
  /***************************************************************************/

  /**
   * _worksList
   *
   * @private
   * @property
   * @type {WorksData[]}
   */
  private _worksList: WorksData[] = [];

  /**
   * _worksList setter
   *
   * @private
   * @property
   * @setter
   * @param {WorksData[]}
   */
  private set worksList(list: WorksData[]) {
    this._worksList = list;
  }

  /**
   * _worksList getter
   *
   * @protected
   * @property
   * @getter
   * @returns {WorksData[]}
   */
  protected get worksList() {
    return this._worksList;
  }

  /*************************************************************************/
  /* Block describing the Properties, Setter, Getter and Other methods END */
  /*************************************************************************/

  /****************************************************/
  /* Block describing Anuglar lifecycle methods START */
  /****************************************************/

  /**
   * ngOnInit
   *
   * @lifecycle
   */
  ngOnInit(): void {
    const bindWorksList = async () => {
      this.worksList = await this.getAllWorks();
    };

    void bindWorksList();
  }

  /**************************************************/
  /* Block describing Anuglar lifecycle methods END */
  /**************************************************/

  /*********************************************************/
  /* Block describing methods that call fetch method START */
  /*********************************************************/

  /**
   * getAllWorks
   *
   * @private
   * @property
   * @returns {Promise<WorksData[]>}
   */
  private getAllWorks = async (): Promise<WorksData[]> => {
    const response = await this.fetchService.fetchAllWorks();

    let worksData: WorksData[] = [];
    if (response.header.ok) {
      worksData = response.data;
    }

    return worksData;
  };

  /*******************************************************/
  /* Block describing methods that call fetch method END */
  /*******************************************************/

  /*******************************************/
  /* Block describing an Event handler START */
  /*******************************************/

  /**
   * clickTriangle
   *
   * blogセクションまでスクロール
   *
   * @protected
   * @property
   * @returns {void}
   */
  protected clickTriangle = () => {
    this.utilService.scrollToElement('blogSect', 800);
  };

  /*****************************************/
  /* Block describing an Event handler END */
  /*****************************************/
}
