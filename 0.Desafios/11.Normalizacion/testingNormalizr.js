import { normalize, schema, denormalize } from "normalizr";
import util from "util";

const post = [

    {
      author: {
        correo: "42195mx@pm.me",
        nombre: "Gabriel",
        apellido: "Garcia Mondragon",
        edad: "11",
        alias: "papi",
        avatar: "https://cdn1.iconfinder.com/data/icons/summer-holiday-sticker/512/Beach-512.png"
      },
      texto: "Mundial 2022",
      date: "21/12/2022 9:17:40 PM"
    }
]

  


const aut = new schema.Entity("authors",{},{ idAttribute: 'correo' });
const posteo = new schema.Entity("mensajes", {
  author: [aut],
});

const normalizedData = normalize(post, posteo);

function print(obj) {
  console.log(util.inspect(obj, false, null, true));
}

console.log("-----------   Normalizado:");
print(normalizedData);
console.log("original", JSON.stringify(post).length);
console.log("normalized", JSON.stringify(normalizedData).length);


console.log('-----------   Desnormalizado:');
const denormalizedData = denormalize(normalizedData.result, posteo, normalizedData.entities)
print(denormalizedData)