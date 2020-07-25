customElements.define('mark-down',
   class extends HTMLElement {
      connectedCallback() {
         setTimeout(() => {
            let markdown = this.innerHTML
            let contents = this

            const scriptPromise = new Promise((resolve, reject) => {
               const script = document.createElement('script')
               document.body.appendChild(script)
               script.onload = resolve
               script.onerror = reject
               script.async = true
               script.src = 'elements/common/showdown-2.0.0.js'
            })
            scriptPromise.then(() => {
               let converter = new showdown.Converter()
               let html = converter.makeHtml(markdown)
               contents.innerHTML = html
            })
         })
      }
   })