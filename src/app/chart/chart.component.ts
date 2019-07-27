import { Component } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { Transaction } from '../transaction';

@Component({
    selector: 'chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent {
    public get status(): string {
        return this.wsService.status;
    }

    public get latestTxns(): Array<Transaction> {
        return this.wsService.transactions.sort(
            (txn1, txn2) => txn2.time - txn1.time).slice(0, 10);
    }

    public get dataSets(): Array<any> {
        let points = [];
        this.latestTxns.forEach((txn) => {
            points.push({ x: txn.time, y: txn.btcValue });
        });
        return [{
            name: 'Latest transactions',
            points: points
        }];
    }

    constructor(private wsService: WebsocketService) { }

    private getIST(unixTime: number): string {
        let date = new Date(unixTime * 1000);
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    public formatXAxisValue(value: number): string {
        return this.getIST(value);
    }
}
