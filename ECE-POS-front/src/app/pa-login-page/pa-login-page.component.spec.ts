import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaLoginPageComponent } from './pa-login-page.component';

describe('PaLoginPageComponent', () => {
  let component: PaLoginPageComponent;
  let fixture: ComponentFixture<PaLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaLoginPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
