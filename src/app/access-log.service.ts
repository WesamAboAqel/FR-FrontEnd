import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccessLog } from './models/access-log.model';

@Injectable({
    providedIn: 'root'
})
export class AccessLogService {
    private baseUrl = 'http://localhost:8080/api'; // Adjust as necessary

    constructor(private http: HttpClient) {}

    getAccessLogs(): Observable<AccessLog[]> {
        return this.http.get<AccessLog[]>(`${this.baseUrl}/accesslog/get`); // Adjust the endpoint as necessary
    }

    postAccessLog(accessLog: AccessLog): Observable<AccessLog> {
        return this.http.post<AccessLog>(`${this.baseUrl}/accesslog/post`, accessLog);
    }
}
