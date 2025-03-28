import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperHeroComponent } from './super-hero.component';
import {
  GetAllSuperHeroUsecase,
  PutSuperHeroUsecase,
  PostSuperHeroUsecase,
} from '@useCases';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SuperHeroModel } from '@models';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SuperHeroComponent', () => {
  let component: SuperHeroComponent;
  let fixture: ComponentFixture<SuperHeroComponent>;
  let getAllSuperHeroUsecaseSpy: jasmine.SpyObj<GetAllSuperHeroUsecase>;
  let putSuperHeroUsecaseSpy: jasmine.SpyObj<PutSuperHeroUsecase>;
  let postSuperHeroUsecaseSpy: jasmine.SpyObj<PostSuperHeroUsecase>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  const mockSuperHero: SuperHeroModel = {
    id: '1',
    name: 'Test Hero',
    nickName: 'Test',
    power: 'Testing',
  };

  const mockSuperHeroes: SuperHeroModel[] = [
    mockSuperHero,
    { id: '2', name: 'Hero 2', nickName: 'Test 2', power: 'Power 2' },
  ];

  beforeEach(async () => {
    const getAllSpy = jasmine.createSpyObj('GetAllSuperHeroUsecase', [
      'execute',
    ]);
    const putSpy = jasmine.createSpyObj('PutSuperHeroUsecase', ['execute']);
    const postSpy = jasmine.createSpyObj('PostSuperHeroUsecase', ['execute']);
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [SuperHeroComponent, NoopAnimationsModule],
      providers: [
        { provide: GetAllSuperHeroUsecase, useValue: getAllSpy },
        { provide: PutSuperHeroUsecase, useValue: putSpy },
        { provide: PostSuperHeroUsecase, useValue: postSpy },
        { provide: MatDialog, useValue: matDialogSpy },
      ],
    }).compileComponents();

    getAllSuperHeroUsecaseSpy = TestBed.inject(
      GetAllSuperHeroUsecase
    ) as jasmine.SpyObj<GetAllSuperHeroUsecase>;
    putSuperHeroUsecaseSpy = TestBed.inject(
      PutSuperHeroUsecase
    ) as jasmine.SpyObj<PutSuperHeroUsecase>;
    postSuperHeroUsecaseSpy = TestBed.inject(
      PostSuperHeroUsecase
    ) as jasmine.SpyObj<PostSuperHeroUsecase>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperHeroComponent);
    component = fixture.componentInstance;
    getAllSuperHeroUsecaseSpy.execute.and.returnValue(of(mockSuperHero));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial data', () => {
    expect(getAllSuperHeroUsecaseSpy.execute).toHaveBeenCalled();
    expect(component.allSupers.length).toBeGreaterThan(0);
  });

  it('should filter superheroes', () => {
    component.allSupers = mockSuperHeroes;
    const event = { target: { value: 'Test' } } as unknown as Event;

    component.filterSupers(event);

    expect(component.supers.length).toBeLessThanOrEqual(5);
    expect(component.supers[0].name).toContain('Test');
  });

  it('should load supers with pagination', () => {
    component.allSupers = mockSuperHeroes;
    const pageEvent = {
      pageIndex: 0,
      pageSize: 5,
      length: mockSuperHeroes.length,
    };

    component.loadSupers(pageEvent);

    expect(component.supers.length).toBeLessThanOrEqual(5);
  });

  it('should open create dialog', () => {
    dialogSpy.open.and.returnValue({
      afterClosed: () => of({ superHero: mockSuperHero }),
    } as any);
    postSuperHeroUsecaseSpy.execute.and.returnValue(mockSuperHeroes);

    component.createEditSuper('crear');

    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should open edit dialog', () => {
    dialogSpy.open.and.returnValue({
      afterClosed: () => of({ superHero: mockSuperHero }),
    } as any);
    putSuperHeroUsecaseSpy.execute.and.returnValue(mockSuperHeroes);

    component.createEditSuper('editar', mockSuperHero);

    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should delete superhero', () => {
    dialogSpy.open.and.returnValue({
      afterClosed: () => of(true),
    } as any);

    const initialLength = mockSuperHeroes.length;
    component.allSupers = [...mockSuperHeroes];

    component.deleteElement(mockSuperHero);

    expect(component.allSupers.length).toBeLessThan(initialLength);
  });
});
