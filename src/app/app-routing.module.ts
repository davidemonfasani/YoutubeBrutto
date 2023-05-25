import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { VideoComponent } from './pages/video/video.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { HistoryComponent } from './pages/history/history.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { LoginComponent } from './pages/login/login.component';
import { homeGuard } from './guards/home.guard';

const routes: Routes = [
  {path: '', redirectTo: '/homepage', pathMatch: 'full'},
  {path: 'homepage', component: HomepageComponent },
  {path: 'video', component: VideoComponent },
  {path: 'profile', component: ProfileComponent,  canActivate: [homeGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'history', component: HistoryComponent, canActivate: [homeGuard]},
  {path: 'subscriptions', component: SubscriptionsComponent, canActivate: [homeGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
