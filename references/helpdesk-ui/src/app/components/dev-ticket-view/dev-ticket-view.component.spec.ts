import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevTicketViewComponent } from './dev-ticket-view.component';

describe('DevTicketViewComponent', () => {
  let component: DevTicketViewComponent;
  let fixture: ComponentFixture<DevTicketViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevTicketViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevTicketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
