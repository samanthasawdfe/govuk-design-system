module.exports = {
  extends: ['html-validate:recommended'],
  rules: {
    // In some Nunjucks macro calls, we use single quotes for attributes since
    // we wrap macro string properties in double quotes.
    'attr-quotes': ['error', { style: 'any' }],

    // We don't use boolean attributes consistently – buttons currently
    // use disabled="disabled"
    'attribute-boolean-style': 'off',

    // Allow for multiple buttons in the same form to have the same name
    // (as in the cookie banner examples)
    'form-dup-name': [
      'error',
      { shared: ['radio', 'checkbox', 'submit', 'button'] }
    ],

    // Allow pattern attribute on input type="number"
    'input-attributes': 'off',

    // Flags most of our page titles because we append "- GOV.UK Design System"
    // to all of them.
    'long-title': 'off',

    // Allow for conditional comments (used in header for fallback png)
    'no-conditional-comment': 'off',

    // Allow inline styles for testing purposes
    'no-inline-style': 'off',

    // Allow for explicit roles on regions that have implict roles
    // We do this to better support AT with older versions of IE that
    // have partial support for HTML5 semantic elements
    'no-redundant-role': 'off',

    // More hassle than it's worth 👾
    'no-trailing-whitespace': 'off',

    // We still support creating `input type=button` with the button
    // component, but you have to explicitly choose to use them over
    // buttons
    'prefer-button': 'off',

    // Allow use of roles where there are native elements that would give
    // us that role automatically, e.g. <section> instead of
    // <div role="region">
    //
    // This is mainly needed for links styled as buttons, but we do this
    // in the cookie banner and notification banner too
    'prefer-native-element': 'off',

    // HTML Validate is opinionated about IDs beginning with a letter and
    // only containing letters, numbers, underscores and dashes – which is
    // more restrictive than the spec allows.
    //
    // Relax the rule to allow anything that is valid according to the
    // spec.
    'valid-id': ['error', { relaxed: true }],

    // Flags our back to top anchor (views/layouts/_generic.njk#L27) for not
    // having descriptive text. Automated accessibility testing doesn't flag,
    // so turning this off until we review our navigation.
    'wcag/h30': 'off',

    // Flags the form in views/layouts/layout-example.njk#L35 when the example
    // code does not have a submit button. This is because we wrap our
    // examples in <form> elements to disable browser validation:
    // https://github.com/alphagov/govuk-design-system/pull/522
    'wcag/h32': 'off'
  },
  elements: [
    'html5',
    {
      // Allow textarea autocomplete attribute to be street-address
      // (html-validate only allows on/off in default rules)
      textarea: {
        attributes: {
          autocomplete: { enum: ['on', 'off', 'street-address'] }
        }
      },
      // Allow buttons to omit the type attribute (defaults to 'submit')
      button: {
        attributes: {
          type: { required: false }
        }
      },
      // Horrible hack to allow nested form elements for 3 current instances:
      // https://github.com/alphagov/govuk-design-system/issues/2609
      form: {
        permittedDescendants: [{}]
      },
      // Allow h1 to have children. This is because we have status tags within
      // the <h1>. There's an issue to fix this:
      // https://github.com/alphagov/govuk-design-system/issues/2606
      h1: {
        permittedContent: ['div', 'label', 'span']
      },
      // We added a summary to fix an accessibility issue, though we could
      // probably revisit.
      // https://github.com/alphagov/govuk-design-system/pull/301
      table: {
        attributes: {
          summary: {
            deprecated: false
          }
        }
      }
    }
  ]
}
