import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';


export class UploadData {

  constructor(
    public tags: Array<string>
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class FileUpload {
  
  constructor(
    private http: HttpClient
  ) {}

  upload_file(file: File, data: UploadData) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('tags', JSON.stringify(data.tags));

    return this.http.post<Data>('/api/documents/upload', formData);
  }
}
