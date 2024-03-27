import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SapConfigurationPage } from './sap-configuration.page';

describe('SapConfigurationPage', () => {
  let component: SapConfigurationPage;
  let fixture: ComponentFixture<SapConfigurationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SapConfigurationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
