//Help: http://liquidmedia.org/blog/2011/02/backbone-js-part-3/

app.views.personCollectionView = Backbone.View.extend({
  initialize : function(options) {
    this.personView = options.childView;

    this.personViews = {};

    this.collection.each(this.add, this);
    this.listenTo(this.collection, 'add', this.add);
    this.listenTo(this.collection, 'remove', this.remove);
  },
  add: function(person) {
    var personView = this.personViews[person.id] || new this.personView({
      model: person,
      el: this.$el
    });

    this.personViews[person.id] = personView;

    if (this.rendered) {
      $(this.el).append(personView.render());
    }
  },
  render: function() {
    this.rendered = true;
    this.collection.each( function(person) {
      this.$el.append(this.personViews[person.id].render());
    }, this);
  }
});