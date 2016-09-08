import { Person } from '../models/index';

export const Persons = Backbone.Collection.extend({
  url: '/persons',
  model: Person
});