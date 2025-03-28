import { TestBed } from '@angular/core/testing';
import { SuperHeroMockRepository } from './super-hero-mock';
import { SuperHeroModel } from '@models';
import { firstValueFrom } from 'rxjs';

describe('SuperHeroMockRepository', () => {
  let repository: SuperHeroMockRepository;

  const mockSuperHero: SuperHeroModel = {
    id: '1',
    name: 'Barry Allen',
    nickName: 'Flash',
    power: 'Speed',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperHeroMockRepository],
    });
    repository = TestBed.inject(SuperHeroMockRepository);
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  describe('getSuperHeroById', () => {
    it('should return correct superhero by id', async () => {
      const hero = await firstValueFrom(repository.getSuperHeroById(1));
      expect(hero).toEqual(mockSuperHero);
    });
  });

  describe('getAllSuperHeros', () => {
    it('should return all superheroes', async () => {
      const heroes = await firstValueFrom(repository.getAllSuperHeros());
      expect(heroes).toBeTruthy();
    });
  });

  describe('putSuperHero', () => {
    it('should update superhero and return first 5 heroes', () => {
      const allHeroes: SuperHeroModel[] = [
        mockSuperHero,
        { id: '2', name: 'Clark Kent', nickName: 'Superman', power: 'Power' },
      ];

      const updatedHero = { ...mockSuperHero, name: 'Barry Allen Updated' };
      const result = repository.putSuperHero(updatedHero, allHeroes);

      expect(result.length).toBeLessThanOrEqual(5);
      expect(result[0].name).toBe('Barry Allen Updated');
    });
  });

  describe('postSuperHero', () => {
    it('should add new superhero and return first 5 heroes', () => {
      const allHeroes: SuperHeroModel[] = [mockSuperHero];
      const newHero: SuperHeroModel = {
        id: '',
        name: 'New Hero',
        nickName: 'New',
        power: 'Test',
      };

      const result = repository.postSuperHero(newHero, allHeroes);

      expect(result.length).toBeLessThanOrEqual(5);
      expect(allHeroes.length).toBe(2);
      expect(allHeroes[1].id).toBe('2');
    });
  });
});
