import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTicketViewComponent } from './user-ticket-view.component';

describe('UserTicketViewComponent', () => {
  let component: UserTicketViewComponent;
  let fixture: ComponentFixture<UserTicketViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTicketViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTicketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
