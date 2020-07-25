class imgFigure extends HTMLElement {
   constructor() {
      super()

      // Wait for the page to load
      setTimeout(() => {

         let src = this.getAttribute('src')
         let title = this.getAttribute('title')
         let author = this.getAttribute('author')
         let link = this.getAttribute('link')
         let source = this.getAttribute('source')
         let sourceLink = this.getAttribute('source-link')
         let license = this.getAttribute('license')
         let content = this.innerHTML

         let shadow = this.attachShadow({ mode: 'open' })

         // Get the custom template
         fetch('elements/img-figure.html')
            .then(response => response.text())
            .then(data => {
               let parser = new DOMParser();
               let parsed = parser.parseFromString(data, 'text/html')
               let template = parsed.querySelector('template')

               // Image (mandatory)
               let img = template.content.querySelector('img')
               img.src = src

               // Header (optional)
               if (title === null)
                  template.content.querySelector('header').remove
               else
                  template.content.querySelector('header').innerHTML = title

               // Content (optional)
               if (content.length === 0)
                  template.content.querySelector('figcaption div.caption').remove
               else
                  template.content.querySelector('figcaption div.caption').innerHTML = content

               // Author (optional)
               if (author === null)
                  template.content.querySelector('footer a.author').remove
               else {
                  template.content.querySelector('footer a.author').innerHTML = author
                  if (link !== null) {
                     template.content.querySelector('footer a.author').setAttribute('href', link)
                  }
               }

               // Source (optional)
               if (source === null)
                  template.content.querySelector('footer a.source').remove
               else {
                  template.content.querySelector('footer a.source').innerHTML = source
                  if (sourceLink !== null) {
                     template.content.querySelector('footer a.source').setAttribute('href', sourceLink)
                  }
               }

               // License (optional)
               if (license === null)
                  template.content.querySelector('footer a.license').remove
               else
                  template.content.querySelector('footer a.license').innerHTML = license

               shadow.appendChild(template.content.cloneNode(true))
            })
      })
   }
}

customElements.define('img-figure', imgFigure)