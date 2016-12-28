import { Injectable } from '@angular/core';
import { Http, Request, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../models/employee.model';
const URL_LANGUAGES = 'app/resources/languages.json';
@Injectable()
export class FormPoster {
    constructor(private _http: Http) {

    }
    private _extractLanguages(res:Response) {
        let body = res.json();
        return body.data || {};
    }
    private _extractData(res: Response) {
        let body = res.json();
        return body.fields || {};
    }
    private _handleError(error: any) {
        console.error('post error: ', error);
        return Observable.throw(error.statusText);
    }
    getLanguages(): Observable<any> {
        return this._http.get(URL_LANGUAGES)
                   .map((response: Response) => response.json())
                   .catch(this._handleError);
    
        // return this.http.get('http://localhost:3100/get-languages')
        //                 .map(this._extractLanguages)
        //                 .catch(this._handleError);
    }
    postEmployeeForm(employee: Employee): Observable<any> {
        let body = JSON.stringify(employee);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers })

        return this._http.post('http://localhost:3100/postemployee', body, options)
                        .map(this._extractData)
                        .catch(this._handleError);
    }
}