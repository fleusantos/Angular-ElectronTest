import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ElectronService } from 'ngx-electron';

import { AppComponent } from './app.component';
import { DataEntryComponent } from './data-entry/data-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    DataEntryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
