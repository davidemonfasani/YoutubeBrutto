import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistPopupComponent } from './playlist-popup.component';

describe('PlaylistPopupComponent', () => {
  let component: PlaylistPopupComponent;
  let fixture: ComponentFixture<PlaylistPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistPopupComponent]
    });
    fixture = TestBed.createComponent(PlaylistPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
