import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BlogData } from '../../../../interfaces/fetch.interface';

import { FetchService } from '../../../../services/fetch.service';
import { UtilService } from '../../../../services/util.service';

@Component({
  selector: 'app-blog-sect',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog-sect.component.html',
  styleUrls: ['./blog-sect.component.scss', '../sections.component.scss'],
})
export class BlogSectComponent implements OnInit {
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
   * _blogList
   *
   * @private
   * @property
   * @type {BlogData[]}
   */
  private _blogList: BlogData[] = [];

  /**
   * _blogList setter
   *
   * @private
   * @property
   * @setter
   * @param {BlogData[]}
   */
  private set blogList(list: BlogData[]) {
    this._blogList = list;
  }

  /**
   * _blogList getter
   *
   * @protected
   * @property
   * @getter
   * @returns {BlogData[]}
   */
  protected get blogList() {
    return this._blogList;
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
    const bindBlogList = async () => {
      this.blogList = await this.getAllBlog();
    };

    void bindBlogList();
  }

  /**************************************************/
  /* Block describing Anuglar lifecycle methods END */
  /**************************************************/

  /*********************************************************/
  /* Block describing methods that call fetch method START */
  /*********************************************************/

  /**
   * getAllBlog
   *
   * @private
   * @property
   * @returns {Promise<BlogData>}
   */
  private getAllBlog = async (): Promise<BlogData[]> => {
    const response = await this.fetchService.fetchAllBolg();

    let blogData: BlogData[] = [];
    if (response.header.ok) {
      blogData = response.data;
    }

    return blogData;
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
   * topセクションまでスクロール
   *
   * @protected
   * @property
   * @returns {void}
   */
  protected clickTriangle = () => {
    this.utilService.scrollToTop();
  };

  /*****************************************/
  /* Block describing an Event handler END */
  /*****************************************/
}
