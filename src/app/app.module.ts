import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { TitleComponent } from './components/title/title.component';
import { SwitchComponent } from './components/switch/switch.component';
import { ContentComponent } from './components/content/content.component';
import { GetHttpServiceService } from './services/get-http-service.service';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    TitleComponent,
    SwitchComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [GetHttpServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
