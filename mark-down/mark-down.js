customElements.define('mark-down',
   class extends HTMLElement {
      connectedCallback() {
         setTimeout(() => {
            let markdown = this.innerHTML
            let contents = this
            //fetch('common/showdown-2.0.0.js').then(() => {
            //   let converter = new showdown.Converter()
            //   let html = converter.makeHtml(markdown)
            //   contents.innerHTML = html
            //})
            require(['common/showdown-2.0.0'], (showdown) => {
               let converter = new showdown.Converter()
               let html = converter.makeHtml(markdown)
               contents.innerHTML = html
            })
         })
      }
   })