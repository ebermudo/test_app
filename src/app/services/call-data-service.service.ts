import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallDataServiceService {
  private loremIpsumUrl = 'https://baconipsum.com/api/?type=all-meat&paras=1&start-with-lorem=1';
  private picsumUrl = 'https://picsum.photos/200/300?random=';
  constructor(private http: HttpClient) { }

  getPicsumUrls(total: number, start: number): Observable<string[]> {
    const urls = [];
    for (let i = start; i <= total; i++) {
      urls.push(this.picsumUrl + i);
    }
    return forkJoin(urls.map(url => this.http.get(url, {responseType: 'blob'}))).pipe(
      map(responses => responses.map(response =>
        URL.createObjectURL(response)
      ))
    );
  }

  getJson(total: number, start: number): Observable<any> {
    return this.getPicsumUrls(total, start).pipe(
      // generamos un array random de numbers para los ids
      map(urls => urls.map((url, index) => ({
        id: index + start,
        photo: url,
        text: ''
      }))),
      // obtenemos el texto random de la API bacon ipsum
      mergeMap(items => this.http.get<any>(this.loremIpsumUrl).pipe(
        map(response => {
          const text = response[0];
          return items.map(item => ({...item, text}));
        })
      ))
    );
  }

  public getData(url: string): Observable<any> {
    return this.http.get(url);
  }
}
