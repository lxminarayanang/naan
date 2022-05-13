import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public baseUrl: string = environment.domain;
  public encryptedReq = environment.encryptedReq;

  constructor(private http: HttpClient) {}

  // POST API Method While Pass JSON Data
  otherPostService(url: string, data?: any, params?: any): any {
    const headers_custom = {
      headers: new Headers({
        'x-api-key': 'dhyDNulWAg2NzBsLmw4Lc6Jl9EbQI37w5RWV39uF',
      }),
    };
    return this.http.post(url, headers_custom).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }
  otherGetService(url: string): any {
    const headers_custom1 = {
      headers: new Headers({
        'x-api-key': 'dhyDNulWAg2NzBsLmw4Lc6Jl9EbQI37w5RWV39uF',
      }),
    };
    return this.http
      .get(url, {
        headers: new HttpHeaders({
          'x-api-key': 'dhyDNulWAg2NzBsLmw4Lc6Jl9EbQI37w5RWV39uF',
        }),
      })
      .pipe(
        map((res) => res),
        catchError((err) => throwError(err))
      );
  }
  otherGetService1(url: string): any {
    return this.http.get(url).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }

  // POST API Method While Pass JSON Data
  postService(url: string, data?: any, params?: any): any {
    if (this.encryptedReq) {
      data = { data: this.encryptData(JSON.stringify(data)) };
      url = this.encryptData(url);
    }
    return this.http.post(this.baseUrl + url, data, { params: params }).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }

  // PATCH API Method
  patchService(url: string, data?: any, params?: any): any {
    if (this.encryptedReq) {
      data = { data: this.encryptData(JSON.stringify(data)) };
      url = this.encryptData(url);
    }
    return this.http.patch(this.baseUrl + url, data, { params: params }).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }

  // PUT API Method
  putService(url: string, data?: any, params?: any): any {
    if (this.encryptedReq) {
      data = { data: this.encryptData(JSON.stringify(data)) };
      url = this.encryptData(url);
    }
    return this.http.put(this.baseUrl + url, data, { params: params }).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }

  // GET API Method
  getService(url: string, params?: any): any {
    if (this.encryptedReq) url = this.encryptData(url);

    return this.http.get(this.baseUrl + url, { params: params }).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }

  // DELETE API Method
  deleteService(url: string, params?: any): any {
    if (this.encryptedReq) url = this.encryptData(url);
    return this.http.delete(this.baseUrl + url, { params: params }).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }

  // POST Method While Pass Form Data
  postFile(url: string, formData: any): any {
    if (this.encryptedReq) url = this.encryptData(url);
    return this.http.post(this.baseUrl + url, formData).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }

  // GET Method While Getting File
  getFile(url: string): Observable<Blob> {
    if (this.encryptedReq) url = this.encryptData(url);
    return this.http.get(this.baseUrl + url, { responseType: 'blob' }).pipe(
      map((res) => res),
      catchError((err) => throwError(err))
    );
  }

  // Encrypt the passing plain text using crypto js encryption
  encryptData(plainText: string): string {
    let encryptedData = CryptoJS.AES.encrypt(
      plainText,
      environment.secretKey
    ).toString();
    return encryptedData;
  }

  // Decrypt the passing plain text using crypto js decryption
  decryptData(encryptedText: string): string {
    var decryptedData = CryptoJS.AES.decrypt(
      encryptedText,
      environment.secretKey
    ).toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
}
