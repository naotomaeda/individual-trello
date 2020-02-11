import { DialogService } from './dialog/dialog.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { TextFilterPipe } from './pipes/text-filter.pipe';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './loading/loading.service';
import { LayoutService } from './layout/layout.service';
import { StorageService } from './storage/storage.service';
import { SnackbarService } from './snackbar/snackbar.service';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    TextFilterPipe,
    LoadingComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    FormsModule,
    TextFilterPipe,
    LoadingComponent
  ],
  providers: [
    TextFilterPipe,
    LoadingService,
    LayoutService,
    StorageService,
    SnackbarService,
    DialogService
  ],
  entryComponents: [
    DialogComponent
  ],
  bootstrap: []
})
export class SharedModule { }
