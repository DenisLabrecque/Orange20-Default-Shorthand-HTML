# Orange20 Default Shorthand Web Components
Tired of typing multiple lines of HTML and Javascript to do the same common things? These web components have the following advantages:

- Shorthand definition of otherwise long-winded markup (like figures, images, and attribution)
- Automatically semantic, [schema](https://schema.org/)-compliant HTML
- Minimal default styling that can be easily leveraged and augmented
- Functionality the browser "should" offer by default (zoomable images, markdown, modals, etc.)

This is currently a work in progress for my education and personal website revamp. The goal is that when a component's Javascript is linked, the self-contained component can be used without recourse to extra HTML, CSS, Javascript, or constructor functions. The functionality offered should be an uncomplicated, straightforward, try-it-once-and-get-it element that drops into an existing website unobtrusively.

## Examples
Tired of typing extra HTML? Want to use Markdown, but don't want to use a bunch of classes, setup, and Javascript initializers to accomplish this? Simply import the `mark-down` element using a script tag, and write markdown wherever you want on the page:
```
<mark-down>
# Hello Markdown!
Fabulous paragraph below.
</mark-down>
```

Expands to this automatically:
```
<h1>Hello Markdown!</h1>
<p>Fabulous paragraph below.</p>
```

## How to Use
Go to the folder `dist/` and grab its contents. Then, in your HTML, use the `<script>` tag to import the element; for example, `<script src="elements/h-title.js"></script>`. You will then be able to use that tag.

## Documentation
For a list of elements and how to use them, please [head over to the Wiki](https://github.com/DenisLabrecque/Orange20-Default-Shorthand-HTML/wiki).

## Wishlist
As this project is currently under development, there are ideas I'm eyeing but haven't gotten to (and possibly never will).

- Default modal (possibly a shorthand of the [HTML `dialog` element](https://developer.mozilla.org/en-US/docs/web/html/element/dialog))
- A parallax image box
- A [scroll spy](https://www.w3schools.com/bootstrap/bootstrap_ref_js_scrollspy.asp) that automatically links to article headers
- Typographical paragraphs that automatically recognize markdown, m-dashes, quotation marks, and prevent orphan words.
- List items that automatically become a responsive navigation menu.
- A listview
- Default citation (something with quick parameters for adding the author and source to the bottom of the page, and automatically expands a reference list)
- Default quote (something with quick parameters for adding author and source)
- An auto-hide menu (with customizable animation)

Easiest items most likely to get done first. Progress will depend on my development urges and needs.
