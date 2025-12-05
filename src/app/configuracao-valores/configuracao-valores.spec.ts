import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoValores } from './configuracao-valores';

describe('ConfiguracaoValores', () => {
  let component: ConfiguracaoValores;
  let fixture: ComponentFixture<ConfiguracaoValores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracaoValores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracaoValores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});