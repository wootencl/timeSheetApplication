//Help: http://liquidmedia.org/blog/2011/02/backbone-js-part-3/

export const personCollectionView = Backbone.View.extend({
  initialize : function(options) {
    this.personView = options.childView;

    this.personViews = {};

    this.collection.each(this.add, this);
    this.listenTo(this.collection, 'add', this.add);
    this.listenTo(this.collection, 'remove', this.removePerson);
  },
  add: function(person) {
    var personView = this.personViews[person.id] || new this.personView({
      model: person
    });
    this.listenTo(personView, 'remove', this.removePerson);
    this.personViews[person.id] = personView;

    if (this.rendered) {
      $(this.el).append(personView.render().el);
    }
  },
  removePerson: function(person) {
    var viewToRemove = this.personViews[person.id];
    viewToRemove.close();
  },
  render: function() {
    this.rendered = true;
    this.collection.each( function(person) {
      this.$el.append(this.personViews[person.id].render().el);
    }, this);
  }
});