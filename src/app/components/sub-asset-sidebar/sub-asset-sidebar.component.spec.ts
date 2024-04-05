import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { SubAssetSidebarComponent } from "./sub-asset-sidebar.component";

describe("SubAssetsModalComponent", () => {
  let component: SubAssetSidebarComponent;
  let fixture: ComponentFixture<SubAssetSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SubAssetSidebarComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SubAssetSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
