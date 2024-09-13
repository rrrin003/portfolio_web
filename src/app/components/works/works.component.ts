import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { FetchService } from '../../services/fetch.service';

import { WorksData } from '../../interfaces/fetch.interface';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './works.component.html',
})
export class WorksComponent implements OnInit {
  /********************************************/
  /* Block describing the DI properties START */
  /********************************************/

  /**
   * activatedRoute
   *
   * @private
   * @property
   * @type {ActivatedRoute}
   */
  private activatedRoute = inject(ActivatedRoute);

  /**
   * fetchService
   *
   * @private
   * @property
   * @type {FetchService}
   */
  private fetchService = inject(FetchService);

  /******************************************/
  /* Block describing the DI properties END */
  /******************************************/

  /***************************************************************************/
  /* Block describing the Properties, Setter, Getter and Other methods START */
  /***************************************************************************/

  /**
   * _worksData
   *
   * @private
   * @property
   * @type {WorksData}
   */
  private _worksData: WorksData = {
    id: '',
    title: '',
    description: '',
    technologies: '',
    schedule: '',
    img: '',
  };

  /**
   * _worksData setter
   *
   * @private
   * @setter
   * @param {WorksData} data
   */
  private set worksData(data: WorksData) {
    this._worksData = data;
  }

  /**
   * _worksData getter
   *
   * @protected
   * @getter
   * @returns {WorksData}
   */
  protected get worksData() {
    return this._worksData;
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
    sessionStorage.setItem('referrer', window.location.href);

    const bindWorks = async (id: string) => {
      this.worksData = await this.getWorksById(id);
    };

    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        void bindWorks(id);
      }
    });

    sessionStorage.setItem('referrer', window.location.href);
  }

  /**************************************************/
  /* Block describing Anuglar lifecycle methods END */
  /**************************************************/

  /*********************************************************/
  /* Block describing methods that call fetch method START */
  /*********************************************************/

  /**
   * getWorksById
   *
   * @private
   * @property
   * @param {string} id
   * @returns {Promise<WorksData>}
   */
  private getWorksById = async (id: string): Promise<WorksData> => {
    const response = await this.fetchService.fetchWorksById(id);

    let worksData: WorksData = {
      id: '',
      title: '',
      description: '',
      technologies: '',
      schedule: '',
      img: '',
    };
    if (response.header.ok) {
      worksData = response.data[0];
    }

    return worksData;
  };

  /*******************************************************/
  /* Block describing methods that call fetch method END */
  /*******************************************************/
}
