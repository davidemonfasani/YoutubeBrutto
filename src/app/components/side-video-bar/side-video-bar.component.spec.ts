import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideVideoBarComponent } from './side-video-bar.component';

describe('SideVideoBarComponent', () => {
  let component: SideVideoBarComponent;
  let fixture: ComponentFixture<SideVideoBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideVideoBarComponent]
    });
    fixture = TestBed.createComponent(SideVideoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
