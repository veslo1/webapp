'use strict';

module.exports = {
  activeNavbarItem: element(by.css('.top-bar-section ul li.active')),

  projectsLink: element(by.css('#projects-link')),
  directoryLink: element(by.css('#directory-link')),
  merchantsLink: element(by.css('#merchants-link')),
  transactionsLink: element(by.css('#transactions-link')),
  fundersLink: element(by.css('#funders-link')),

  navbarEmail: element(by.css("#navbar-email")),
  userOptionsDropdown: element(by.css("#user-options-dropdown")),

  myProfileLink: element(by.css('#my-profile-link')),
  bankAccountsLink: element(by.css('#bank-accounts-link')),
  logoutLink: element(by.css('#logout-link')),

  h1Title: element(by.css('#buildpay-top-bar h1')),
  h2Title: element(by.css('h2')),
  h4Title: element(by.css('h4')),
  detailsHeader: element(by.css('h4.details-header')),

  navbarEmail: element(by.css('#navbar-email')),

  toastMessage: element(by.repeater('msg in messages')).element(by.css('.inform-message-content')),

  get: function() {
    browser.get(this.url);
  },

  clickProfileMenuOption: function() {
    this.navbarEmail.click();
    this.myProfileLink.click();
  },

  submitButton: element(by.css('[type="submit"]')),

  dateToUTCString: function(dateString) {
    return (new Date(dateString)).toUTCString();
  },

  dateFormatRegex: /[A-Z][a-z]{2} \d{1,2}, \d{4} \d{1,2}:\d{1,2}:\d{1,2} (AM|PM)/,

  fieldErrorsFor: function(fieldName) {
    //var fieldName = field.getAttribute('name');
    //return element(by.css(`.field-errors-${fieldName}`))

    return element(by.css(`.field-errors-${fieldName}`))
  },

  // workaround for firefox only sending 1st char of new text when editing a text field that already has a value
  clearFieldAndThenTypeText: function(field, text) {
    field.clear();
    text.split('').forEach((c) => field.sendKeys(c));
  }

  //errorsForField: function(field) {
    //var fieldName = field.getAttribute('name');
    //return element(by.css(`.field-errors-${fieldName}`))
  //}

};
