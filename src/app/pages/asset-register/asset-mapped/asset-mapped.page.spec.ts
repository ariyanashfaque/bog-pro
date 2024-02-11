import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetMappedPage } from './asset-mapped.page';

describe('AssetMappedPage', () => {
  let component: AssetMappedPage;
  let fixture: ComponentFixture<AssetMappedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssetMappedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
