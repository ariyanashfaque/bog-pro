import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApprovalAssetMappedCardComponent } from './approval-asset-mapped-card.component';

describe('ApprovalAssetMappedCardComponent', () => {
  let component: ApprovalAssetMappedCardComponent;
  let fixture: ComponentFixture<ApprovalAssetMappedCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalAssetMappedCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApprovalAssetMappedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
