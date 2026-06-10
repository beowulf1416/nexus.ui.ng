import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiResponse, Uuid } from 'core';
import { FolderData } from '../models/folder-data';
import { URLS } from '../constants';


@Injectable({
  providedIn: 'root',
})
export class DocumentService {

  constructor(
    private http: HttpClient
  ) {}

  fetch_folders(
    tenant_id: Uuid
  ): Observable<ApiResponse> {
    console.log('fetch_folders');

    return of(new ApiResponse(
      true,
      'successfully fetched folders',
      {
        folders: new Array<FolderData>(
          new FolderData(1, 'test 1', new Array<FolderData>()),
          new FolderData(2, 'test 2', new Array<FolderData>()),
          new FolderData(3, 'test 3', new Array<FolderData>()),
        )
      }
    ))
  }

  upload(
    tenant_id: Uuid,
    file: File
  ): Observable<ApiResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<ApiResponse>(
      `${URLS.base_url}/tenant/${tenant_id}/upload`,
      formData
    );
  }
}
