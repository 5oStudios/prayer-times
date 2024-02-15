/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * languages
     * https://hadeethenc.com/api/v1/languages
     *
     * List all available languages for HadeethEnc.com
     *
     * This endpoint returns json object containing all available languages with their iso codes and native names.
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1Languages(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/languages',
        });
    }
    /**
     * /categories/list/?language={language_code}
     * https://hadeethenc.com/api/v1/categories/list/?language=en
     *
     * List all categories by language code.
     *
     * This endpoint accepts language iso code and returns array of json objects each object represents a category.
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1CategoriesList({
        language,
    }: {
        /**
         * language iso code
         */
        language?: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/categories/list/',
            query: {
                'language': language,
            },
        });
    }
    /**
     * /categories/roots/?language={language_code}
     * https://hadeethenc.com/api/v1/categories/roots/?language=en
     *
     * List root categories by language code.
     *
     * This endpoint returns root categories (main categories) in specific language, it accepts language iso code and returns json array of objects each object represents a root category.
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1CategoriesRoots({
        language,
    }: {
        /**
         * language iso code
         */
        language?: string,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/categories/roots/',
            query: {
                'language': language,
            },
        });
    }
    /**
     * /hadeeths/list/?language={language_code}&category_id={category_id}
     * https://hadeethenc.com/api/v1/hadeeths/list/?language=en&category_id=1&page=1&per_page=20
     *
     * List Hadeeths by category id and language iso code.
     *
     * This endpoint accepts language iso code, category id (both required) and page (represents page number, optional defaults to 1) and per_page (optional defaults to 20) and returns json object containing "data" object which contains array of json objects each object represents a Hadeeth basic information (id, title, translations iso codes), the second object is "meta" containing meta data required for pagination.
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1HadeethsList({
        language,
        categoryId,
        page,
        perPage,
    }: {
        /**
         * language iso code
         */
        language?: string,
        /**
         * category id
         */
        categoryId?: number,
        /**
         * page number, optional, defaults to 1
         */
        page?: number,
        /**
         * Hadeeths per page, optional, defaults to 20
         */
        perPage?: number,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hadeeths/list/',
            query: {
                'language': language,
                'category_id': categoryId,
                'page': page,
                'per_page': perPage,
            },
        });
    }
    /**
     * /hadeeths/one/?id={hadeeth_id}&language={language_code}
     * https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=2962
     *
     * https://hadeethenc.com/api/v1/hadeeths/one/?language=en&id=2962
     *
     * Get single Hadeeth details by Hadeeth id and language iso code.
     *
     * The response differs when the language is "Arabic" or not, if it's Arabic then it returns all Hadeeth data (id, title, Hadeeth text (matn), explanation, hints (fawaed), word meaning and references), if non Arabic it returns translated parts (id, title, Hadeeth text (matn), explanation and hints (if translated), it doesnt return reference nor word meaning as they are not translated.
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1HadeethsOne({
        language,
        id,
    }: {
        /**
         * language iso code
         */
        language?: string,
        /**
         * hadeeth id
         */
        id?: number,
    }): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/hadeeths/one/',
            query: {
                'language': language,
                'id': id,
            },
        });
    }
}
