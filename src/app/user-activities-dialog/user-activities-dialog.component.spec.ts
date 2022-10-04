import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivitiesDialogComponent } from './user-activities-dialog.component';

describe('UserActivitiesDialogComponent', () => {
  let component: UserActivitiesDialogComponent;
  let fixture: ComponentFixture<UserActivitiesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActivitiesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActivitiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
