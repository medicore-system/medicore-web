import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthResponseModelTs } from './auth-response.model.ts.js';

describe('AuthResponseModelTs', () => {
  let component: AuthResponseModelTs;
  let fixture: ComponentFixture<AuthResponseModelTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthResponseModelTs],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthResponseModelTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
