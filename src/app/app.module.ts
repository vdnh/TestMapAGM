import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AgmCoreModule } from "../agm/core";

@NgModule({
  imports: [BrowserModule, FormsModule,
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyC9PnuRk42kbCPMOvsfHpn40r5SoyN38zI',
      apiKey: 'AIzaSyBPFjwSzB_MzLoKt3rh0XktfpE0N4CBcWo',
      libraries: ['places', 'drawing', 'geometry'],
    }),
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
