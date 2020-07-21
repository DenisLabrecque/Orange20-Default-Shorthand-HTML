fetch('mark-down/mark-down.html')

customElements.define('mark-down',
   class extends HTMLElement {
      connectedCallback() {
         setTimeout(() => {
            let markdown = this.innerHTML
            let contents = this
            require(['common/showdown-2.0.0'], (showdown) => {
               let converter = new showdown.Converter()
               let html = converter.makeHtml(markdown)
               contents.innerHTML = html
            })
         })
      }
   })