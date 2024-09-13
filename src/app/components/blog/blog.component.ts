import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Carousel } from 'bootstrap';

import { FetchService } from '../../services/fetch.service';
import { UtilService } from '../../services/util.service';

import { BlogData } from '../../interfaces/fetch.interface';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog.component.html',
})
export class BlogComponent implements OnInit, AfterViewInit {
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
   * _blogData
   *
   * @private
   * @property
   * @type {BlogData}
   */
  private _blogData: BlogData = {
    id: '',
    title: '',
    body: '',
    datetime: '',
    img1: '',
    img2: '',
    img3: '',
  };

  /**
   * _blogData setter
   *
   * @private
   * @setter
   * @param {BlogData} data
   */
  private set blogData(data: BlogData) {
    this._blogData = data;
  }

  /**
   * _blogData getter
   *
   * @protected
   * @getter
   * @returns {BlogData}
   */
  protected get blogData() {
    return this._blogData;
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
    // リファラの設定
    sessionStorage.setItem('referrer', window.location.href);

    const bindBlog = async (id: string) => {
      this.blogData = await this.getBlogDataById(id);
    };

    // パスパラメータの取得
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        void bindBlog(id);
      }
    });
  }

  /**
   * ngAfterViewInit
   *
   * コンポーネントのビューが初期化された後に実行されるライフサイクルフック
   *
   * @lifecycle
   */
  ngAfterViewInit(): void {
    // スライドショーの初期化
    const myCarousel = document.querySelector('#blogCarousel');
    if (myCarousel) {
      new Carousel(myCarousel, {
        interval: 3000,
        ride: 'carousel',
      });
    }
  }

  /**************************************************/
  /* Block describing Anuglar lifecycle methods END */
  /**************************************************/

  /*********************************************************/
  /* Block describing methods that call fetch method START */
  /*********************************************************/

  /**
   * getBlogDataById
   *
   * @private
   * @property
   * @param {string} id
   * @returns {Promise<BlogData>}
   */
  private getBlogDataById = async (id: string): Promise<BlogData> => {
    const response = await this.fetchService.fetchBlogById(id);

    let blogData: BlogData = {
      id: '',
      title: '',
      body: '',
      datetime: '',
      img1: '',
      img2: '',
      img3: '',
    };
    if (response.header.ok) {
      blogData = response.data[0];
      blogData.body = this.utilService.cvtNewlinesToHtml(response.data[0].body);
    }

    return blogData;
  };

  /*******************************************************/
  /* Block describing methods that call fetch method END */
  /*******************************************************/
}
