import {
  provideRouter,
  RouteReuseStrategy,
  withComponentInputBinding,
} from "@angular/router";
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from "@ionic/angular/standalone";
import { routes } from "./app/app.routes";
import { provideStore } from "@ngrx/store";
import { Reducer } from "./app/store/reducer";
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";
import { provideHttpClient } from "@angular/common/http";
import { provideHotToastConfig } from "@ngneat/hot-toast";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { IonicStorageModule } from "@ionic/storage-angular";
import { bootstrapApplication } from "@angular/platform-browser";
import { enableProdMode, importProvidersFrom } from "@angular/core";

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore(Reducer),
    provideHotToastConfig(),
    provideStoreDevtools({ maxAge: 30 }),
    provideIonicAngular({ mode: "md" }),
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(
      IonicStorageModule.forRoot({ storeName: "expert_app" })
    ),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
});
