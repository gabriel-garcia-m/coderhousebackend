window.onload = () => {
  const socket = io();

  socket.on("messages", (data) => {
    retrievedMessages(data);
  });

  async function cargaProds(prods) {
    let htmlRen = "";
    const t = await fetch("../views/tabla.ejs").then((res) => res.text());
    htmlRen = ejs.render(t, { prods });
    document.getElementById("tabla").innerHTML = htmlRen;
  }

  socket.on("productos", contenidoProds => {
    cargaProds(contenidoProds);
  });

  document.getElementById("envioProd").addEventListener("click", () => {
    const newProd = {
      nombre: document.getElementById("nombre").value,
      codigo: document.getElementById("codigo").value,
      stock: document.getElementById("stock").value,
      precio: document.getElementById("precio").value,
      imagen: document.getElementById("imagen").value,
    };
    socket.emit("storeNewP", newProd);
  });

  function retrievedMessages(data) {
    console.log('entro a retrievedMessages en main', data)
    const html = data
      .map((elem, index) => {
        return `
                <div class="direct-chat-info clearfix">
                    <span id="emailChat" class="direct-chat-name pull-right">${elem.email}</span>
                    <span class="direct-chat-timestamp pull-left">[${elem.date}]</span>
                </div>
                <div id="chatContent" class="direct-chat-text">${elem.texto}</div>
            `;
      })
      .join(" ");
    document.getElementById("messages").innerHTML = html;
  }

  document.getElementById("estructuraChat").addEventListener("submit", (e) => {
    e.preventDefault();
    addMessage();
  });

  function addMessage() {
    const nuevoMensaje = {
      email: document.getElementById("correo").value,
      texto: document.getElementById("publicacion").value,
    };
    socket.emit("messegesNew", nuevoMensaje);
  }
};
