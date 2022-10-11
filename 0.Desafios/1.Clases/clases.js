class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  addBook(author, title) {
    this.libros.push({ autor: author, nombre: title });
    const names = this.libros.map(getBookNames);
    function getBookNames(item) {
      return [item.nombre].join(",");
    }
    return names;
  }

  getFullName() {
    return `Nombre completo >> ${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
    const countMascota = () => {
      return this.mascotas.length;
    };
    return countMascota();
  }
}

const ejecuta = () => {
  const usuario1 = new Usuario(
    "Juan",
    "Garcia",
    [{ autor: "Tolkien", nombre: "El Senor de los Anillos" }],
    ["Nikki", "Gordon"]
  );
  console.log("Funcion getFullName", usuario1.getFullName());
  console.log("Funcion addMascota", usuario1.addMascota("Pancho"));
  console.log("Funcion addBook", usuario1.addBook("PK Dick", "Ubik"));
};

ejecuta();
