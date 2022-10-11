class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  addBook(author, title) {
    this.libros.push({ autor: author, nombre: title });
  }

  getBookNames() {
    const names = this.libros.map(getOnlyNames);
    function getOnlyNames(item) {
      return [item.nombre].join(",");
    }
    return names;
  }

  getFullName() {
    return `Nombre completo >> ${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
  }

  countMascota = () => {
    return this.mascotas.length;
  };
}

const ejecuta = () => {
  const usuario1 = new Usuario(
    "Juan",
    "Garcia",
    [{ autor: "Tolkien", nombre: "El Senor de los Anillos" }],
    ["Nikki", "Gordon"]
  );
  console.log("Funcion getFullName", usuario1.getFullName());
  usuario1.addMascota("Pancho");
  console.log("Funcion countMascota", usuario1.countMascota());
  usuario1.addBook("PK Dick", "Ubik");
  console.log("Funcion getBookNames", usuario1.getBookNames());
};

ejecuta();
