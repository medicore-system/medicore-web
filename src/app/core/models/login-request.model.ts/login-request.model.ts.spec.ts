import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRequestModelTs } from './login-request.model.ts.js';

describe('LoginRequestModelTs', () => {
  let component: LoginRequestModelTs;
  let fixture: ComponentFixture<LoginRequestModelTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRequestModelTs],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginRequestModelTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
