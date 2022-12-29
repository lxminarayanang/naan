import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { CommonToastrComponent } from '@shared/components/common-toastr/common-toastr.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrConfigData } from '../../components/common-toastr/toastr-data.interface';
import { FileSizePipe } from '@shared/pipe/filesize.pipe';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public loaderApiUrls = new BehaviorSubject<any>([]);

  public isLoading = new BehaviorSubject(false);

  public editData: any = {};

  public max_filesize: number = 2.0; // In MB

  public minProfile_width: number = 150; // In Pixels

  public minProfile_height: number = 150; // In Pixels

  auth: any;

  screenReaderMode: any = 'off';
  todayDate = new Date();

  constructor(
    private apiservice: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private filesize: FileSizePipe,
    private toastr: ToastrService
  ) {}

  // Set/Get/Remove for Session storage
  session(method: string, key: string, value?: any): any {
    if (method === 'get') {
      let sessionData = sessionStorage.getItem(key);
      return sessionData
        ? environment.encryptedReq
          ? this.apiservice.decryptData(sessionData)
          : sessionData
        : null;
    } else if (method === 'set') {
      environment.encryptedReq
        ? (value = this.apiservice.encryptData(value))
        : '';
      sessionStorage.setItem(key, value);
    } else if (method === 'remove') sessionStorage.removeItem(key);
  }

  // POST API Method While Pass JSON Data
  postService(url: string, data?: any, loaderState?: any, params?: any): any {
    const language = localStorage.getItem('language');
    let temp = url.indexOf('?');
    const tempUrl =
      temp == -1
        ? url + '?language=' + language
        : url + '&language=' + language;
    return this.apiservice.postService(tempUrl, data, params);
  }

  // PATCH API Method
  patchService(url: string, data?: any, params?: any): any {
    const language = localStorage.getItem('language');
    let temp = url.indexOf('?');
    const tempUrl =
      temp == -1
        ? url + '?language=' + language
        : url + '&language=' + language;

    return this.apiservice.patchService(tempUrl, data, params);
  }

  // Third party  API Method
  otherPostService(url: string, data?: any, params?: any): any {
    return this.apiservice.otherPostService(url, data);
  }
  otherGetService(url: string): any {
    return this.apiservice.otherGetService(url);
  }
  otherGetService1(url: string): any {
    return this.apiservice.otherGetService1(url);
  }


  // GET API Method
  othergetService(url: string, params?: any): any {

    return this.apiservice.othergetService(url, params);
  }

  // PUT API Method
  putService(url: string, data?: any, params?: any): any {
    return this.apiservice.putService(url, data, params);
  }

  // GET API Method
  getService(url: string, params?: any): any {
    if(url.includes('school_details')  || url.includes('student_details')){

      return this.apiservice.getService(url);
    }
    const language = localStorage.getItem('language');
    let temp = url.indexOf('?');
    const tempUrl =
      temp == -1
        ? url + '?language=' + language
        : url + '&language=' + language;

    return this.apiservice.getService(tempUrl, params);
  }

  // DELETE API Method
  deleteService(url: string, params?: any): any {
    return this.apiservice.deleteService(url, params);
  }

  // POST Method While Pass Form Data
  postFile(url: string, formData: any): any {
    return this.apiservice.postFile(url, formData);
  }

  // GET Method While Getting File
  getFile(url: string): Observable<Blob> {
    return this.apiservice.getFile(url);
  }

  dateCompare(date: any) {
    const date1 = new Date(date);
    const date2 = new Date();
    return date ? date1.getTime() > date2.getTime() : false;
  }

  // When User Logged In Store The User Token In Local Storage
  login(token: string): any {
    this.session('set', 'activateUser', JSON.stringify(jwt_decode(token)));
    this.auth = this.session('get', 'activateUser');
    return this.auth;
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  playAudio(text: string) {
    let audio = new Audio();
    audio.src = `https://texttospeech.responsivevoice.org/v1/text:synthesize?text=${text}&lang=ta&engine=g1&name=&pitch=0.5&rate=0.5&volume=1&key=mYbFXldZ&gender=male`;
    audio.load();
    audio.play();
  }

  // Get Mat Progress Button Options
  getMatProgressBtnOpt(
    text: string,
    className?: string,
    spinnerSize?: number
  ): any {
    return {
      active: false,
      disabled: false,
      raised: true,
      stroked: true,
      spinnerColor: 'accent',
      fullWidth: false,
      mode: 'indeterminate',
      spinnerSize: spinnerSize || 20,
      text: text,
      customClass: className || '',
    };
  }

  navigate(url: string) {
    this.router.navigate([this.router.url.split('/')[1] + url]);
  }

  // Common SnackBar Toastr
  // Show the Toast Message
  showToastr(message: string, messageType: string, title?: string) {
    var customClass: string = '';
    switch (messageType) {
      case 'success':
        // without Title
        if (message && !title) {
          this.toastr.success(message, '', { timeOut: 2000 });
        }
        // with Title
        else if (message && title) {
          this.toastr.success(message, title, { timeOut: 2000 });
        }
        break;
      case 'error':
        // without Title
        if (message && !title) {
          this.toastr.error(message, '', { timeOut: 2000 });
        }
        // with Title
        else if (message && title) {
          this.toastr.error(message, title, { timeOut: 2000 });
        }
        break;
      case 'warning':
        // without Title
        if (message && !title) {
          this.toastr.warning(message, '', { timeOut: 2000 });
        }
        // with Title
        else if (message && title) {
          this.toastr.warning(message, title, { timeOut: 2000 });
        }
        break;
      case 'info':
        // without Title
        if (message && !title) {
          this.toastr.info(message, '', { timeOut: 2000 });
        }
        // with Title
        else if (message && title) {
          this.toastr.info(message, title, { timeOut: 2000 });
        }
        break;
    }
  }

  // Convert File Size Bytes to KB or MB or GB

  bytesToExtensions(size: number, extension: string) {
    return this.filesize.transform(size, extension);
  }

  // Check the Image is Less than Maximum File Size

  check_Correctsize(fileSize: number) {
    const max_size = this.max_filesize; // Max File Upload Size

    const file_size = this.bytesToExtensions(fileSize, 'MB').split('')[0]; // File Size in Mb

    if (parseInt(file_size) > max_size) {
      // Check The File Size is Less Than Maximum File Size
      // this.toastr.info('Maximum file size allowed is ' + max_size  + 'Mb','Create Sub Admin');

      return false; // Return Image is Invalid
    }

    return true; // Return Image is Valid
  }

  // Check the Image Height and Width is Higher than Minimum Height and Width

  check_CorrectPixels(image: any) {
    if (
      image.width < this.minProfile_width ||
      image.height < this.minProfile_height
    ) {
      // this.toastr.info('Image '+(image.width < 150 ? 'width' :'heght')+' is smaller than 150px','Create Sub Admin');

      return false; // Return Image is Invalid
    }

    return true; // Return Image is Valid
  }

  convert12HourFormat(time24: any) {
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);

    const period = +sHours < 12 ? 'AM' : 'PM';

    const hours = +sHours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
  }

  convertTo24HourFormat(time12: any) {
    const [sHours, minutes, period] = time12
      .match(/([0-9]{1,2}):([0-9]{2}) (AM|PM)/)
      .slice(1);

    const PM = period === 'PM';

    const hours = (+sHours % 12) + (PM ? 12 : 0);

    return `${('0' + hours).slice(-2)}:${minutes}`;
  }
}
