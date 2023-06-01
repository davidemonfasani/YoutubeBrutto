import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistpageComponent } from './playlistpage.component';

describe('PlaylistpageComponent', () => {
  let component: PlaylistpageComponent;
  let fixture: ComponentFixture<PlaylistpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaylistpageComponent]
    });
    fixture = TestBed.createComponent(PlaylistpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
