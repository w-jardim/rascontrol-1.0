import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgIconsConfig, provideIcons } from '@ng-icons/core';
import { 
  lucideLayoutDashboard, 
  lucideUsers, 
  lucideFileText, 
  lucideSettings, 
  lucideCalendar, 
  lucideBarChart3, 
  lucideSettings2, 
  lucideLogOut, 
  lucideUser, 
  lucideLock,
  lucideFile,
  lucideStar,
  lucideBuilding,
  lucideIdCard,
  lucideCar,
  lucideUtensils,
  lucideClipboard,
  lucideClock,
  lucideTimer,
  lucideDollarSign,
  lucideEdit,
  lucideTrash,
  lucideSave,
  lucideX,
  lucideFileX,
  lucidePlus,
  lucideUserPlus,
  lucideChevronRight
} from '@ng-icons/lucide';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNgIconsConfig({
      size: '1.5em'
    }),
    provideIcons({
      lucideLayoutDashboard,
      lucideUsers,
      lucideFileText,
      lucideSettings,
      lucideCalendar,
      lucideBarChart3,
      lucideSettings2,
      lucideLogOut,
      lucideUser,
      lucideLock,
      lucideFile,
      lucideStar,
      lucideBuilding,
      lucideIdCard,
      lucideCar,
      lucideUtensils,
      lucideClipboard,
      lucideClock,
      lucideTimer,
      lucideDollarSign,
      lucideEdit,
      lucideTrash,
      lucideSave,
      lucideX,
      lucideFileX,
      lucidePlus,
      lucideUserPlus,
      lucideChevronRight
    })
  ]
};
