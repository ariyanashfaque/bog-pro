import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetMapViewPage } from './asset-map-view.page';

describe('AssetMapViewPage', () => {
  let component: AssetMapViewPage;
  let fixture: ComponentFixture<AssetMapViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssetMapViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
