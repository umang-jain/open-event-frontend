import Ember from 'ember';

const { Controller, RSVP } = Ember;

export default Controller.extend({
  actions: {
    save() {
      this.get('model.event').save()
        .then(data => {
          let promises = [];
          promises.push(this.get('model.event.tickets').toArray().map(ticket => ticket.save()));
          promises.push(this.get('model.event.socialLinks').toArray().map(link => link.save()));
          if (this.get('model.event.copyright.licence')) {
            promises.push(this.get('model.event.copyright').then(copyright => copyright.save()));
          }
          if (this.get('model.event.tax.name')) {
            if (this.get('model.event.isTaxEnabled')) {
              promises.push(this.get('model.event.tax').then(tax => tax.save()));
            } else {
              promises.push(this.get('model.event.tax').then(tax => tax.destroyRecord()));
            }
          }
          RSVP.Promise.all(promises)
            .then(() => {
              this.transitionToRoute('events.view.edit.sponsors', data.id);
            }, function() {
              this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
            });
        })
        .catch(() => {
          this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
        });
    },
    move() {
      this.get('model.event').save()
        .then(data => {
          let promises = [];
          promises.push(this.get('model.event.tickets').toArray().map(ticket => ticket.save()));
          promises.push(this.get('model.event.socialLinks').toArray().map(link => link.save()));
          if (this.get('model.event.copyright.licence')) {
            promises.push(this.get('model.event.copyright').then(copyright => copyright.save()));
          }
          if (this.get('model.event.tax.name')) {
            if (this.get('model.event.isTaxEnabled')) {
              promises.push(this.get('model.event.tax').then(tax => tax.save()));
            } else {
              promises.push(this.get('model.event.tax').then(tax => tax.destroyRecord()));
            }
          }
          RSVP.Promise.all(promises)
            .then(() => {
              this.transitionToRoute('events.view.edit.sponsors', data.id);
            }, function() {
              this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
            });
        })
        .catch(() => {
          this.get('notify').error(this.l10n.t('Oops something went wrong. Please try again'));
        });
    }
  }
});