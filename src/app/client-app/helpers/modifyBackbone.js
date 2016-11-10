// Overwriting the built in view.remove() function.
// Reasoning: I decided to do it this way because of the issues arising from
// the acutal destruction of my "#container" div
export const modifyBackbone = (function() {
    Backbone.View.prototype.remove = function() {
            this.$el.children().remove();
            this.$el.empty().off();
            this.stopListening();
            return this;
    };
    // writing a custom close function for backbone views for the purpose of garbage collection
    Backbone.View.prototype.close = function() {
        this.remove();
        this.unbind();
        //prototype necessary to disconnect any model and collection events attached to a view.
        if (this.onClose){
            this.onClose();
        }
    };
})();