import { Injectable } from '@angular/core';

import {
  Blog,
  BlogData,
  Response,
  Works,
  WorksData,
} from '../interfaces/fetch.interface';

import { CONSTANTS } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  /***************************************************************************/
  /* Block describing the Properties, Setter, Getter and Other methods START */
  /***************************************************************************/

  /**
   * _worksUrl
   *
   * @private
   * @property
   * @type {string}
   */
  private _worksUrl = CONSTANTS.JSON_SERVER_WORKS_URL;

  /**
   * _worksUrl getter
   *
   * @private
   * @getter
   * @returns {string}
   */
  private get worksUrl() {
    return this._worksUrl;
  }

  /**
   * _blogUrl
   *
   * @private
   * @property
   * @type {string}
   */
  private _blogUrl = CONSTANTS.JSON_SERVER_BLOG_URL;

  /**
   * _blogUrl getter
   *
   * @private
   * @getter
   * @returns {string}
   */
  private get blogUrl() {
    return this._blogUrl;
  }

  /*************************************************************************/
  /* Block describing the Properties, Setter, Getter and Other methods END */
  /*************************************************************************/

  /******************************************/
  /* Block describing Private methods START */
  /******************************************/

  /**
   * fetchAndParseJson
   *
   * @private
   * @property
   * @param {string} url
   * @returns {Promise<Response>}
   */
  private fetchAndParseJson = async (url: string): Promise<Response> => {
    const response: Response = {
      header: {
        ok: false,
        status: 0,
        statusText: '',
        errMessage: '',
      },
      data: [],
    };

    try {
      const fetchedRes = await fetch(url);
      response.header.ok = fetchedRes.ok;
      response.header.status = fetchedRes.status;
      response.header.statusText = fetchedRes.statusText;

      if (fetchedRes.ok) {
        response.data = (await fetchedRes.json()) as WorksData[] | BlogData[];
      } else {
        throw new Error(
          `Failed to fetch data from ${url}: ${fetchedRes.statusText}`,
        );
      }

      return response;
    } catch (error) {
      response.header.ok = false;
      response.header.status = 500;
      response.header.statusText = 'Internal Server Error';
      response.header.errMessage =
        error instanceof Error ? error.message : 'Unknown Error';
      return response;
    }
  };

  /****************************************/
  /* Block describing Private methods END */
  /****************************************/

  /********************************************/
  /* Block describing the Fetch methods START */
  /********************************************/

  /**
   * fetchAllWorks
   *
   * @public
   * @property
   * @async
   * @returns {Promise<Works>}
   */
  fetchAllWorks = async (): Promise<Works> => {
    const response = (await this.fetchAndParseJson(this.worksUrl)) as Works;
    return response;
  };

  /**
   * fetchWorksById
   *
   * @public
   * @property
   * @async
   * @param {string} id
   * @returns {Promise<Works>}
   */
  fetchWorksById = async (id: string): Promise<Works> => {
    const url = `${this.worksUrl}?id=${id}`;
    const response = (await this.fetchAndParseJson(url)) as Works;
    return response;
  };

  /**
   * fetchAllBolg
   *
   * @public
   * @property
   * @async
   * @returns {Promise<Blog>}
   */
  fetchAllBolg = async (): Promise<Blog> => {
    const response = (await this.fetchAndParseJson(this.blogUrl)) as Blog;
    return response;
  };

  /**
   * fetchBlogById
   *
   * @public
   * @property
   * @async
   * @param {string} id
   * @returns {Promise<Blog>}
   */
  fetchBlogById = async (id: string): Promise<Blog> => {
    const url = `${this.blogUrl}?id=${id}`;
    const response = (await this.fetchAndParseJson(url)) as Blog;
    return response;
  };

  /******************************************/
  /* Block describing the Fetch methods END */
  /******************************************/
}
