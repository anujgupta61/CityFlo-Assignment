import { Component } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { Transaction } from '../transaction';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {

    public matchingTxns: Array<Transaction> = [];

    constructor(private wsService: WebsocketService) { }

    public onBTCChange(event: any): void {
        if (event.target.value === "") {
            this.matchingTxns = [];
        } else {
            this.matchingTxns = this.wsService.transactions.sort(
                (txn1, txn2) => {
                    let btcVal = Number(event.target.value);
                    return Math.abs(txn1.btcValue - btcVal) - Math.abs(txn2.btcValue - btcVal);
                }).slice(0, 3);
        }
    }
}
