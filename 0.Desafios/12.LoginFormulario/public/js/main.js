window.onload = () => {
  const socket = io();

  socket.on("messages", (data) => {
    retrievedMessages(data);
  });

  async function cargaProdsFkr(prods) {
    console.log("Carga productos Fkr", prods.products);
    let htmlRen = "";
    const t = await fetch("../views/tabla.ejs").then((res) => res.text());
    htmlRen = ejs.render(t, { prods });
    document.getElementById("tablaFkr").innerHTML = htmlRen;
  }

  socket.on("productosFkr", (contenidoProds) => {
    cargaProdsFkr(contenidoProds);
  });

  function retrievedMessages(data) {
    console.log("Entro a retrievedMessages en main", data);
    const html = data
      .map((elem, index) => {
        return `
                <div class="direct-chat-info clearfix">
                    <span id="emailChat" class="direct-chat-name pull-right">${elem.author.alias}</span>
                    <span class="direct-chat-timestamp pull-left">[${elem.date}]</span>
                    <span class="direct-chat-timestamp pull-left"><img height="80" width="80" src='${elem.author.avatar}'</span>
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
      author: {
        correo: document.getElementById("correo").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        edad: document.getElementById("edad").value,
        alias: document.getElementById("alias").value,
        avatar: document.getElementById("avatar").value
      },
      texto: document.getElementById("publicacion").value,
    };
    console.log('Reviso nuevoMensaje de addMessage()', nuevoMensaje)

    socket.emit("messegesNew", nuevoMensaje);
  }
};
