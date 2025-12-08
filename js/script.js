// script.js - funciones simples para la TP
// 1) Filtrado por categoría + búsqueda (cliente-side, sin servidor)
// 2) Validación mínima del formulario de contacto

// script.js - funciones simples para la TP
// 1) Filtrado por categoría + búsqueda (cliente-side, sin servidor)
// 2) Validación mínima del formulario de contacto

document.addEventListener('DOMContentLoaded', function(){
  // Búsqueda y filtro
  const searchInput = document.querySelector('#productos input[aria-label="buscar"]');
  const categorySelect = document.querySelector('#productos select.form-select');
  const productCards = Array.from(document.querySelectorAll('#productos article'));

  function applyFilter(){
    const term = (searchInput && searchInput.value) ? searchInput.value.trim().toLowerCase() : '';
    const cat = categorySelect ? categorySelect.value : '';

    productCards.forEach(card => {
      const title = card.querySelector('.card-title') ? card.querySelector('.card-title').textContent.toLowerCase() : '';
      const desc = card.querySelector('.card-text') ? card.querySelector('.card-text').textContent.toLowerCase() : '';
      const matchesTerm = term === '' || title.includes(term) || desc.includes(term);
      const matchesCat = cat === '' || (card.dataset.category && card.dataset.category === cat);
      card.style.display = (matchesTerm && matchesCat) ? '' : 'none';
    });
  }

  if(searchInput && categorySelect){
    searchInput.addEventListener('input', applyFilter);
    categorySelect.addEventListener('change', applyFilter);
  }

  // Validación muy simple del formulario de contacto
  /*const contactForm = document.querySelector('.contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', function(ev){
      ev.preventDefault();
      const name = document.getElementById("nombre");
      const email = document.getElementById("email");
      const msg = document.getElementById("mensaje");
      let ok = true;
      // resetear mensajes
      contactForm.querySelectorAll('.invalid-feedback').forEach(n => n.remove());

      if(!name.value.trim()){
        const f = document.createElement('div'); f.className='invalid-feedback'; f.textContent='El nombre es obligatorio.'; name.after(f); ok=false;
      }
      if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)){
        const f = document.createElement('div'); f.className='invalid-feedback'; f.textContent='Ingresa un email válido.'; email.after(f); ok=false;
      }
      if(msg.value.trim().length < 8){
        const f = document.createElement('div'); f.className='invalid-feedback'; f.textContent='El mensaje es muy corto.'; msg.after(f); ok=false;
      }

      if(ok){
        console.log("OK! pasa validación");
        const btn = contactForm.querySelector('button[type="submit"], button'); 
        btn.textContent = 'Enviando...';
        setTimeout(()=>{
          btn.textContent = 'Enviar';
          alert('Formulario enviado (simulado).\\nEn un proyecto real, aquí se haría un POST al servidor.');
          contactForm.reset();
        }, 700);
      }
    });
  }
}); */


const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  // ensure native validation won't interrupt
  contactForm.setAttribute('novalidate', 'true');

  contactForm.addEventListener('submit', function (ev) {
    ev.preventDefault();

    const name = document.getElementById("nombre");
    const email = document.getElementById("email");
    const msg = document.getElementById("mensaje");
    let ok = true;

    // limpiar errores previos
    contactForm.querySelectorAll('.invalid-feedback').forEach(n => n.remove());
    [name, email, msg].forEach(f => f.classList.remove('is-invalid'));

    // Nombre
    if (!name.value.trim()) {
      const f = document.createElement('div');
      f.className = 'invalid-feedback';
      f.textContent = 'El nombre es obligatorio.';
      name.classList.add('is-invalid');
      name.after(f);
      ok = false;
    }

    // Email
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!email.value.trim()) {
      const f = document.createElement('div');
      f.className = 'invalid-feedback';
      f.textContent = 'El correo es obligatorio.';
      email.classList.add('is-invalid');
      email.after(f);
      ok = false;
    } else if (!re.test(email.value.trim())) {
      const f = document.createElement('div');
      f.className = 'invalid-feedback';
      f.textContent = 'El correo ingresado no es válido.';
      email.classList.add('is-invalid');
      email.after(f);
      ok = false;
    }

    // Mensaje
    if (msg.value.trim().length < 8) {
      const f = document.createElement('div');
      f.className = 'invalid-feedback';
      f.textContent = 'El mensaje debe tener al menos 8 caracteres.';
      msg.classList.add('is-invalid');
      msg.after(f);
      ok = false;
    }

    if (ok) {
      const btn = contactForm.querySelector('button[type="submit"], button');
      if (btn) btn.textContent = 'Enviando...';
      setTimeout(() => {
        if (btn) btn.textContent = 'Enviar';
        alert('Mensaje enviado correctamente (simulado).');
        contactForm.reset();
      }, 700);
    }
  });
}

});

 


