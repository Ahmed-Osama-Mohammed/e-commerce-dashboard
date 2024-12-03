// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseChartDirective  } from 'ng2-charts'; 
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { productReducer } from './store/products/product.reducer';
import { ProductEffects } from './store/products/product.effects';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoginComponent } from './shared/components/login-component/login.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


@NgModule({ declarations: [AppComponent, LoginComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        NoopAnimationsModule, 
        AppRoutingModule,
        BaseChartDirective ,
        StoreModule.forRoot({
            router: routerReducer, 
            products: productReducer
        }),
        EffectsModule.forRoot([ProductEffects]),
        StoreRouterConnectingModule.forRoot(),
        StoreDevtoolsModule.instrument({
          maxAge: 25, 
          connectInZone: true,
        }),
        FormsModule,
        RouterModule.forChild([{ path: '', component: LoginComponent }]),
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule], providers: [provideHttpClient(withInterceptorsFromDi()),[provideCharts(withDefaultRegisterables())]] })
export class AppModule {}
