import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtInterceptorTs } from './jwt.interceptor.ts';

describe('JwtInterceptorTs', () => {
  let component: JwtInterceptorTs;
  let fixture: ComponentFixture<JwtInterceptorTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JwtInterceptorTs],
    }).compileComponents();

    fixture = TestBed.createComponent(JwtInterceptorTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
