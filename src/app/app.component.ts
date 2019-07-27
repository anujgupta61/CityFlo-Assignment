import { Component } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public currPage: number = 1;

    constructor(private wsService: WebsocketService) { }

    public setCurrentPage(pageNum: number): void {
        this.currPage = pageNum;
    }

    public ngOnDestroy(): void {
        this.wsService.closeConnection();
    }
}
