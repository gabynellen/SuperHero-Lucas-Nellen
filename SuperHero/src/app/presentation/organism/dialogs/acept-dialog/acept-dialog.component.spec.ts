import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptDialogComponent } from './acept-dialog.component';

describe('AceptDialogComponent', () => {
  let component: AceptDialogComponent;
  let fixture: ComponentFixture<AceptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AceptDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AceptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
