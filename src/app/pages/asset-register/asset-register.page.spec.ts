import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetRegisterPage } from './asset-register.page';

describe('AssetRegisterPage', () => {
  let component: AssetRegisterPage;
  let fixture: ComponentFixture<AssetRegisterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssetRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
