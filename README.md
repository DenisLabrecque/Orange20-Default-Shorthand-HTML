# OrangeTwenty Default Shorthand Web Components
Tired of typing multiple lines of HTML and Javascript to do the same common things? These web components have the following advantages:

- Shorthand definition of otherwise long-winded markup (like figures, images, and attribution)
- Automatically semantic, [schema](https://schema.org/)-compliant HTML
- Minimal default styling that can be easily leveraged and augmented
- Functionality the browser "should" offer by default (zoomable images, markdown, modals, etc.)

This is currently a work in progress for my education and personal website revamp. The goal is that when a component's Javascript is linked, the self-contained component can be used without recourse to extra HTML, CSS, Javascript, or constructor functions. The functionality offered should be an uncomplicated, straightforward, try-it-once-and-get-it element that drops into an existing website unobtrusively.

## `<mark-down>`
*Represents contents that need to be expanded from markdown syntax to HTML. Uses the [Showdown](https://github.com/showdownjs/showdown) converter.*

```
   <mark-down>
      ...
   </mark-down>
```

Content within the tags will be rendered as markdown. *Careful: if your code editor automatically formats text inside elements, the extra spacing will cause the markdown to display as plain text.* This tag can be combined inside other tags.

## `<img-figure>`
*A zoomable image with simplified declaration that is described by an optional caption and attribution.*

```
   <img-figure src="..."
               title="..."
               author="..."
               link="...">
      ...
   </img-figure>
```

Expands to the following markup:

```
  <figure>
     <picture>
        <img src="{{ src }}" alt="{{ extracted from file name }}" loading="auto" />
     </picture>
     <figcaption>
        <header>{{ title }}</header>
        {{ tag contents }}
        <footer>
           <a href="{{ link }}">{{ author }}</a>
        </footer>
     </figcaption>
   </figure>
```

*`src`*

The image source URL. Plans in the future to auto-detect thumbnail and full-size alternatives through a common naming convention, allowing only the large image to be specified. To be determined.

*`title`*

Title of the image or work. Will be omitted if left blank.

*`author`*

Name of the person or organization who created the image.

*`link`*

URL to the image's source or author. Will wrap the `author` if included.

*type* [static, smooth, link]

Idea to include different styles of image zooming/linking.

*licence*

Idea to link different types of creative commons and other licenses.

## `<h-title>`
*Page title, subtitle, and emphasized content.*

```
   <h-title title="..."
            subtitle="...">
      ...
   </h-title>
```

Expands to the following markup:

```
   <header>
      <h1>{{ title }}</h1>
      <p class="subtitle">{{ subtitle }}</p>
      <div class="emphasis">{{ element contents }}</div>
   </header>
```

If any property is left blank, its respective element will be removed.

## Wishlist
As this project is currently under development, there are ideas I'm eyeing but haven't gotten to (and possibly never will).

- Default modal (possibly a shorthand of the [HTML `dialog` element](https://developer.mozilla.org/en-US/docs/web/html/element/dialog))
- A parallax image box
- A [scroll spy](https://www.w3schools.com/bootstrap/bootstrap_ref_js_scrollspy.asp) that automatically links to article headers
- Typographical paragraphs that automatically recognize markdown, m-dashes, quotation marks, and prevent orphan words.
- List items that automatically become a responsive navigation menu.
- Default citation (something with quick parameters for adding the author and source to the bottom of the page, and automatically expands a reference list)
- Default quote (something with quick parameters for adding author and source)
- An auto-hide menu (with customizable animation)

Easiest items most likely to get done first. Progress will depend on my development urges and needs.
