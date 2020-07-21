customElements.define('h-title',
   class extends HTMLElement {
      constructor() {
         super()

         // Wait for the page to load
         setTimeout(() => {

            let title = this.getAttribute('title')
            let subtitle = this.getAttribute('subtitle')
            let content = this.innerHTML
            let shadow = this.attachShadow({ mode: 'open' })

            // Get the custom template
            fetch('h-title/h-title.html')
               .then(response => response.text())
               .then(data => {
                  let parser = new DOMParser();
                  let parsed = parser.parseFromString(data, 'text/html')
                  let template = parsed.querySelector('template')

                  template.content.querySelector('h1').innerHTML = title
                  template.content.querySelector('p.subtitle').innerHTML = subtitle
                  template.content.querySelector('span.emphasis').innerHTML = content

                  shadow.appendChild(template.content.cloneNode(true))
               })
         })
      }
      connectedCallback() {
         setTimeout(() => {
            //const shadow = this.shadowRoot
            ////console.log(this)
            ////console.log(shadow)

            //let title = this.querySelector('h1').getAttribute('title')
            //let subtitle = this.querySelector('h1').getAttribute('subtitle')
            //let content = this.querySelector('h1').innerHTML

            //if (title.length > 0)
            //   shadow.querySelector('h1').innerHTML = title
            //else
            //   shadow.querySelector('h1').remove

            //if (subtitle.length > 0)
            //   shadow.querySelector('p').innerHTML = subtitle
            //else
            //   shadow.querySelector('p').remove

            //if (content.length > 0)
            //   shadow.querySelector('span.emphasis').innerHTML = content
            //else
            //   shadow.querySelector('span.emphasis').remove
         })
      }
   })