import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDialogComponent } from './item-dialog.component';

describe('AddItemDialogComponent', () => {
  let component: ItemDialogComponent;
  let fixture: ComponentFixture<ItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
