import { Component, OnInit } from '@angular/core';
import { AccessLogService } from '../access-log.service';
import { AccessLog } from '../models/access-log.model';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-access-logs',
    standalone: true,
  imports: [CommonModule, RouterLink],
    templateUrl: './access-logs.component.html',
    styleUrls: ['./access-logs.component.css']
})
export class AccessLogsComponent implements OnInit {
    accessLogs: AccessLog[] = [];
    isLoading: boolean = true;

    constructor(private accessLogService: AccessLogService) {}

    ngOnInit(): void {
        this.loadAccessLogs();
    }

    private loadAccessLogs(): void {
        this.accessLogService.getAccessLogs().subscribe({
            next: (logs) => {
                this.accessLogs = logs;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Failed to load access logs', error);
                this.isLoading = false;
            }
        });
    }
}
