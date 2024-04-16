import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssetMappedFilterModalComponent } from './asset-mapped-filter-modal.component';

describe('AssetMappedFilterModalComponent', () => {
  let component: AssetMappedFilterModalComponent;
  let fixture: ComponentFixture<AssetMappedFilterModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetMappedFilterModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssetMappedFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
