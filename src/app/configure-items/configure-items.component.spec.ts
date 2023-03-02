import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureItemsComponent } from './configure-items.component';

describe('ConfigureItemsComponent', () => {
  let component: ConfigureItemsComponent;
  let fixture: ComponentFixture<ConfigureItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
