import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import {
  UserCardComponent,
  DialogDataExampleDialog,
} from './user-card/user-card.component';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './user-list/user-list.component';
import { ItemFilterPipe } from './shared/item-filter.pipe';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AdminItemsComponent } from './admin-items/admin-items.component';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { ConfigureItemsComponent } from './configure-items/configure-items.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UserActivitiesDialogComponent } from './user-activities-dialog/user-activities-dialog.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    UserListComponent,
    ItemFilterPipe,
    DialogDataExampleDialog,
    ToolbarComponent,
    AdminItemsComponent,
    ItemDialogComponent,
    UserDialogComponent,
    ConfigureItemsComponent,
    ConfirmDialogComponent,
    UserActivitiesDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    NgxChartsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    RouterModule.forRoot([
      { path: '', component: UserListComponent },
      { path: 'items', component: ConfigureItemsComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
AdminItemsComponent;
