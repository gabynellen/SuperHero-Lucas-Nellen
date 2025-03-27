import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SuperHeroRepository } from '@repositories';
import { SuperHeroMockEntity } from '@entities';
import { SuperHeroModel } from '@models';
import { SuperHeroMapper } from '@mappers';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroMockRepository extends SuperHeroRepository {
  private mapper = new SuperHeroMapper();

  supers = [
    { id: 1, name: 'Barry Allen', nickName: 'Flash', power: 'Speed' },
    { id: 2, name: 'Clark Kent', nickName: 'Superman', power: 'Power' },
    { id: 3, name: 'Bruce Wayne', nickName: 'Batman', power: 'Money' },
    {
      id: 4,
      name: 'Diana Prince',
      nickName: 'Wonder Woman',
      power: 'Strength',
    },
    { id: 5, name: 'Hal Jordan', nickName: 'Green Lantern', power: 'Ring' },
    {
      id: 6,
      name: 'Arthur Curry',
      nickName: 'Aquaman',
      power: 'Water Control',
    },
    { id: 7, name: 'Victor Stone', nickName: 'Cyborg', power: 'Technology' },
    { id: 8, name: 'Oliver Queen', nickName: 'Green Arrow', power: 'Archery' },
    { id: 9, name: 'Billy Batson', nickName: 'Shazam', power: 'Magic' },
    {
      id: 10,
      name: 'J onn' + ' J onzz',
      nickName: 'Martian Manhunter',
      power: 'Shape-shifting',
    },
    {
      id: 11,
      name: 'Peter Parker',
      nickName: 'Spider-Man',
      power: 'Spider Abilities',
    },
    { id: 12, name: 'Tony Stark', nickName: 'Iron Man', power: 'Technology' },
    {
      id: 13,
      name: 'Steve Rogers',
      nickName: 'Captain America',
      power: 'Super Soldier',
    },
    {
      id: 14,
      name: 'Natasha Romanoff',
      nickName: 'Black Widow',
      power: 'Espionage',
    },
    { id: 15, name: 'Thor Odinson', nickName: 'Thor', power: 'God of Thunder' },
    { id: 16, name: 'Bruce Banner', nickName: 'Hulk', power: 'Strength' },
    {
      id: 17,
      name: 'Wanda Maximoff',
      nickName: 'Scarlet Witch',
      power: 'Magic',
    },
    {
      id: 18,
      name: 'Stephen Strange',
      nickName: 'Doctor Strange',
      power: 'Sorcery',
    },
    {
      id: 19,
      name: 'T Challa',
      nickName: 'Black Panther',
      power: 'Enhanced Abilities',
    },
    {
      id: 20,
      name: 'Scott Lang',
      nickName: 'Ant-Man',
      power: 'Size Manipulation',
    },
    {
      id: 21,
      name: 'Carol Danvers',
      nickName: 'Captain Marvel',
      power: 'Energy Manipulation',
    },
    { id: 22, name: 'Sam Wilson', nickName: 'Falcon', power: 'Flight' },
    {
      id: 23,
      name: 'Bucky Barnes',
      nickName: 'Winter Soldier',
      power: 'Enhanced Abilities',
    },
    { id: 24, name: 'Clint Barton', nickName: 'Hawkeye', power: 'Archery' },
    { id: 25, name: 'Jean Grey', nickName: 'Phoenix', power: 'Telepathy' },
    { id: 26, name: 'Logan', nickName: 'Wolverine', power: 'Regeneration' },
    {
      id: 27,
      name: 'Ororo Munroe',
      nickName: 'Storm',
      power: 'Weather Control',
    },
    {
      id: 28,
      name: 'Charles Xavier',
      nickName: 'Professor X',
      power: 'Telepathy',
    },
    { id: 29, name: 'Kitty Pryde', nickName: 'Shadowcat', power: 'Phasing' },
    {
      id: 30,
      name: 'Kurt Wagner',
      nickName: 'Nightcrawler',
      power: 'Teleportation',
    },
    { id: 31, name: 'Raven', nickName: 'Raven', power: 'Magic' },
    {
      id: 32,
      name: 'Dick Grayson',
      nickName: 'Nightwing',
      power: 'Acrobatics',
    },
    {
      id: 33,
      name: 'Barbara Gordon',
      nickName: 'Batgirl',
      power: 'Martial Arts',
    },
  ];

  constructor() {
    super();
  }

  getSuperHeroById(id: number): Observable<SuperHeroModel> {
    return from(this.supers)
      .pipe(filter((superH: SuperHeroMockEntity) => superH.id === id))
      .pipe(map(this.mapper.mapFrom));
  }

  getAllSuperHeros(): Observable<SuperHeroModel> {
    return from(this.supers).pipe(map(this.mapper.mapFrom));
  }
}
