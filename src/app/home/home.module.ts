import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/interceptors';
import { HomeListPipe } from './pipes/home-list.pipe';
import { HomeCardBoardPipe } from './pipes/home-card-board.pipe';
import { CardListComponent } from './card-list/card-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    HomeComponent,
    HomeListPipe,
    HomeCardBoardPipe,
    CardListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: []
})
export class HomeModule { }
