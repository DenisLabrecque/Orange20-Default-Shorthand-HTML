class hTitle extends HTMLElement {
   constructor() {
      super()

      // Wait for the page to load
      setTimeout(() => {

         let title = this.getAttribute('title')
         let subtitle = this.getAttribute('subtitle')
         let level = this.getAttribute('level')
         let content = this.innerHTML
         let shadow = this.attachShadow({ mode: 'open' })

         // Get the custom template
         fetch('elements/h-title.html')
            .then(response => response.text())
            .then(data => {
               let parser = new DOMParser();
               let parsed = parser.parseFromString(data, 'text/html')
               let template = parsed.querySelector('template')

               // Title (required)
               let h1 = template.content.querySelector('h1')
               let titleElement = titleType(level)
               titleElement.innerHTML = title
               h1.replaceWith(titleElement)

               // Subtitle (optional)
               if (subtitle === null)
                  template.content.querySelector('p.subtitle').remove()
               else
                  template.content.querySelector('p.subtitle').innerHTML = subtitle
               

               // Content (optional)
               console.log(content)
               if (content.length === 0)
                  template.content.querySelector('div.emphasis').remove()
               else
                  template.content.querySelector('div.emphasis').innerHTML = content
                  
               shadow.appendChild(template.content.cloneNode(true))
            })
      })
   }
}

customElements.define('h-title', hTitle)

// Takes a string from h1-h6 (or 1-6) and returns the matching element.
// Defaults to h1
function titleType(level) {
   switch(level) {
      case 'h1':
      case null:
      case '1':
         return document.createElement('h1')
      case 'h2':
      case '2':
         return document.createElement('h2')
      case 'h3':
      case '3':
         return document.createElement('h3')
      case 'h4':
      case '4':
         return document.createElement('h4')
      case 'h5':
      case '5':
         return document.createElement('h5')
      case 'h6':
      case '6':
         return document.createElement('h6')
      default:
         return document.createElement('h1')
   }
}