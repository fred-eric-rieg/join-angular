import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAllTasksComponent } from './board-all-tasks.component';

describe('BoardAllTasksComponent', () => {
  let component: BoardAllTasksComponent;
  let fixture: ComponentFixture<BoardAllTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardAllTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardAllTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
