import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleGuardTs } from './role.guard.ts';

describe('RoleGuardTs', () => {
  let component: RoleGuardTs;
  let fixture: ComponentFixture<RoleGuardTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleGuardTs],
    }).compileComponents();

    fixture = TestBed.createComponent(RoleGuardTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
