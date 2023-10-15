// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import '../../src/assets/tailwind.css';

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/vue2';
import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import VueRouter from 'vue-router';
import feather from 'vue-feather';
import { ValidationProvider, extend } from 'vee-validate';
import { required, alpha_dash, alpha_spaces } from 'vee-validate/dist/rules';

import router from '../../src/router';
import Logo from '../../src/components/Logo.vue';

import { RootState } from '../../src/store/store';
import { useStore } from '../../src/store';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.

type MountParams = Parameters<typeof mount>;
type OptionsParam = MountParams[1] & { router?: VueRouter };

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Helper mount function for Vue Components
       * @param component Vue Component or JSX Element to mount
       * @param options Options passed to Vue Test Utils
       */
      mount(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component: any,
        options?: OptionsParam & { store?: Store<RootState> },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ): Chainable<any>;
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// Example use:
// cy.mount(MyComponent)
Cypress.Commands.add('mount', (component, options = {}) => {
  Vue.use(VueRouter);

  // Setup options object
  options.extensions = options.extensions || {};
  options.extensions.components = options.extensions.components || {};
  options.extensions.plugins = options.extensions.plugins || [];

  // Use the router passed in via options,
  // or the default one if not provided
  options.router = options.router || router;
  // Use store passed in from options, or initialize a new one
  options.store = options.store || useStore();

  // Register global components
  options.extensions.components['feather'] = feather;
  options.extensions.components['logo'] = Logo;
  options.extensions.components['ValidationProvider'] = ValidationProvider;

  extend('required', required);
  extend('alpha-dash', alpha_dash);
  extend('alpha-spaces', alpha_spaces);

  // Add Vuex plugin
  options.extensions.plugins.push(Vuex);

  return mount(component, options);
});

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`);
});
