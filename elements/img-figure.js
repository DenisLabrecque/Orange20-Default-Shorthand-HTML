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

               // Add the HTML attributes and element values
               this.addContent(template, src, title, content, author, link, source, sourceLink, license)

               shadow.appendChild(template.content.cloneNode(true))

               shadow.querySelector('picture img').addEventListener('click', (event) => {
                  this.openModal(shadow, src) // TODO: send the highest available source
               })

               shadow.querySelector('.modal img').addEventListener('click', (event) => {
                  this.closeModal(shadow)
               })

               window.addEventListener('scroll', (event) => {
                  this.closeModal(shadow)
               })
            })
      })
   }

   openModal(shadow, src) {
      // TODO: put this in the initialization section
      let modal = shadow.querySelector('.modal')
      let clickEater = shadow.querySelector('.click-eater')

      
      modal.style.top = `${window.scrollY}px`;
      modal.style.height = `${window.innerHeight}px`;
      modal.style.display = 'flex';

      clickEater.style.bottom = '0';
      clickEater.style.opacity = 1;
   }

   closeModal(shadow) {
      let modal = shadow.querySelector('.modal')
      let clickEater = shadow.querySelector('.click-eater')

      modal.style.display = 'none'

      clickEater.style.bottom = 'unset'
      clickEater.style.opacity = 0;
   }

   addContent(template, src, title, content, author, link, source, sourceLink, license) {
      // Image (mandatory)
      template.content.querySelector('picture img').src = src
      template.content.querySelector('.modal img').src = src
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
   }
}

customElements.define('img-figure', imgFigure)

function isImagePortrait(src) {
   return new Promise((resolve) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
         let isPortrait = false
         const ratio = img.naturalWidth / img.naturalHeight
         const windowRatio = window.innerWidth / window.innerHeight
         if (ratio < windowRatio)
            isPortrait = true
         resolve(isPortrait)
      }
   })
}