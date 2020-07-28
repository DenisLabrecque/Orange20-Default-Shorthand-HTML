//const { fromEvent } = rxjs;

const images = document.querySelectorAll('article img');
const detailModal = document.querySelector('#detail-modal');
const detailBgModal = document.querySelector('.bg');

console.log(detailBgModal)

let canShowModal = true;

detailBgModal.addEventListener("transitionend", () => {
   if (detailBgModal.style.opacity === '0') {
      const showImage = document.querySelector('[fullscreen=true]')
      showImage.style.zIndex = 0;
      detailBgModal.style.bottom = 'auto';
      showImage.removeAttribute('fullscreen')
      canShowModal = true;
   }
});

const checkIsImagePortrait = (src) => {
   return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
         let isImagePortrait;
         const ratio = img.naturalWidth / img.naturalHeight;
         const pratio = window.innerWidth / window.innerHeight;
         console.log('pratio', pratio)
         if (ratio < pratio) {
            isImagePortrait = true;
         } else {
            isImagePortrait = false
         }
         resolve(isImagePortrait);
      };
   });
};

const showModal = (imageElement) => {
   const src = imageElement.getAttribute('src');
   const modalImage = document.querySelector('#detail-modal img');
   return checkIsImagePortrait(src).then(isPortrait => {
      const src = imageElement.getAttribute('src');
      if (isPortrait) {
         modalImage.style.height = '100%';
         modalImage.style.width = 'auto';
      } else {
         modalImage.style.height = 'auto';
         modalImage.style.width = '100%';
      }

      detailModal.style.top = `${window.scrollY}px`;
      detailModal.style.height = `${window.innerHeight}px`;
      detailModal.style.display = 'flex';

      detailBgModal.style.bottom = '0';
      detailBgModal.style.opacity = 1;
      document.querySelector('#detail-modal img').setAttribute('src', src);
   });
};

const hideModal = () => {
   detailBgModal.style.opacity = 0;
   detailModal.style.display = 'none';
   canShowModal = false;
};

let modalDetailPos;

const handleBodyScroll = () => {
   const { scrollY } = window;
   if (Math.abs(scrollY - modalDetailPos) > 50) {
      const event = new Event('click');
      detailModal.dispatchEvent(event);
      window.removeEventListener('scroll', handleBodyScroll);
   }
};

images.forEach((image) => {
   fromEvent(image, 'click').subscribe(() => {
      if (!canShowModal) {
         return
      }

      image.setAttribute('fullscreen', true)
      console.log('show image')

      showModal(image).then(() => {
         const modalImage = document.querySelector('#detail-modal img');

         const firstSnap = image.getBoundingClientRect();
         const lastSnap = modalImage.getBoundingClientRect();

         const {
            deltaX,
            deltaY,
            deltaWidth,
            deltaHeight
         } = getDelta(firstSnap, lastSnap);

         modalImage.animate([
            {
               transformOrigin: 'top left',
               transform: `
          translate(${deltaX}px, ${deltaY}px)
          scale(${deltaWidth}, ${deltaHeight})
        `
            },
            {
               transformOrigin: 'top left',
               transform: 'none'
            }
         ], {
            duration: 300,
            easing: 'ease-in-out',
            fill: 'both'
         }).onfinish = () => {
            modalDetailPos = window.scrollY;
            window.addEventListener('scroll', handleBodyScroll)
         };
      });
   });
})

const getDelta = (firstSnap, lastSnap) => {
   const deltaX = firstSnap.left - lastSnap.left;
   const deltaY = firstSnap.top - lastSnap.top;
   const deltaWidth = firstSnap.width / lastSnap.width;
   const deltaHeight = firstSnap.height / lastSnap.height;
   return {
      deltaX: deltaX,
      deltaY: deltaY,
      deltaWidth: deltaWidth,
      deltaHeight: deltaHeight
   };
}

fromEvent(detailModal, 'click').subscribe(() => {

   const showImage = document.querySelector('[fullscreen=true]');
   if (!showImage) {
      return;
   }
   const modalImage = document.querySelector('#detail-modal img');

   console.log('showImage', showImage)
   const firstSnap = modalImage.getBoundingClientRect();
   const lastSnap = showImage.getBoundingClientRect();

   hideModal();

   const {
      deltaX,
      deltaY,
      deltaWidth,
      deltaHeight
   } = getDelta(firstSnap, lastSnap);

   showImage.style.zIndex = 100;

   showImage.animate([
      {
         transformOrigin: 'top left',
         transform: `
        translate(${deltaX}px, ${deltaY}px)
        scale(${deltaWidth}, ${deltaHeight})
      `
      },
      {
         transformOrigin: 'top left',
         transform: 'none'
      }
   ], {
      duration: 400,
      easing: 'ease',
      fill: 'both'
   });
});