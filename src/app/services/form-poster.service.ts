import { Injectable } from '@angular/core';
import { Http, Request, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../models/employee.model';

@Injectable()
export class FormPoster {
    constructor(private http: Http) {

    }
    private extractLanguages(res:Response) {
        let body = res.json();
        return body.data || {};
    }
    private extractData(res: Response) {
        let body = res.json();
        return body.fields || {};
    }
    private handleError(error: any) {
        console.error('post error: ', error);
        return Observable.throw(error.statusText);
    }
    getLanguages(): Observable<any> {
        return this.http.get('http://localhost:3100/get-languages')
                        .map(this.extractLanguages)
                        .catch(this.handleError);
    }
    postEmployeeForm(employee: Employee): Observable<any> {
        let body = JSON.stringify(employee);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers })

        return this.http.post('http://localhost:3100/postemployee', body, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
}