import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCitas } from './header-citas';

describe('HeaderCitas', () => {
  let component: HeaderCitas;
  let fixture: ComponentFixture<HeaderCitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCitas],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderCitas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
