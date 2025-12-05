import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosRas } from './servicos-ras';

describe('ServicosRas', () => {
  let component: ServicosRas;
  let fixture: ComponentFixture<ServicosRas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicosRas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicosRas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
