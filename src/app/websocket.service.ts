import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from './transaction';

@Injectable()
export class WebsocketService {

    private readonly ConnectionUrl = "wss://ws.blockchain.info/inv";
    private readonly BTCRateUrl = "https://api.coindesk.com/v1/bpi/currentprice/USD.json";
    private connection: WebSocket;
    private usdRate: number;

    public status: string;
    public transactions: Array<Transaction> = [];

    constructor(private httpClient: HttpClient) {
        this.createConnection();
        this.attachListeners();
    }

    private createConnection(): void {
        this.connection = new WebSocket(this.ConnectionUrl);
        this.status = 'Connecting ...';
    }

    private subscribe(): void {
        this.connection.send('{ "op": "unconfirmed_sub" }');
    }

    private unsubscribe(): void {
        this.connection.send('{ "op": "unconfirmed_unsub" }');
    }

    private attachListeners(): void {
        this.connection.onopen = () => {
            this.status = 'Connected';
            this.httpClient.get(this.BTCRateUrl).subscribe((resp: any) => {
                this.usdRate = resp.bpi.USD.rate_float;
                this.subscribe();
            });
        };
        this.connection.onclose = () => {
            this.status = 'Disconnected';
            this.unsubscribe();
        };
        this.connection.onmessage = (event) => {
            let data = JSON.parse(event.data).x,
                btcValue = data.out[0].value / Math.pow(10, 8);
            if (btcValue > 1) {
                this.transactions.push({
                    time: data.time,
                    hash: data.hash,
                    btcValue: btcValue,
                    usdValue: btcValue * this.usdRate
                });
            }
        };
        this.connection.onerror = () => {
            this.status = 'Disconnected. Error occured.'
        };
    }

    public closeConnection(): void {
        this.unsubscribe();
        this.connection.close();
    }
}
