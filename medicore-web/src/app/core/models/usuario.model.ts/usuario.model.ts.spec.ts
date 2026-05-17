import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioModelTs } from './usuario.model.ts.js';

describe('UsuarioModelTs', () => {
  let component: UsuarioModelTs;
  let fixture: ComponentFixture<UsuarioModelTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioModelTs],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioModelTs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
