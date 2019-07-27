import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxLineChartModule } from 'ngx-line-chart';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        ChartComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgxLineChartModule,
        FormsModule
    ],
    providers: [WebsocketService],
    bootstrap: [AppComponent]
})
export class AppModule { }
