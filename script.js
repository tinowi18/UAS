const belum_selesai = document.getElementById("belum_selesai");
const selesai = document.getElementById("selesai");



function aksiTambahbutton(inputBookIsComplete, idBook) {
  const textButton = document.createElement("div");
  const aksiBaca = buatAksiBaca(idBook);
  const aksiEdit = buatAksiEdit(idBook);
  const aksiHapus = buatAksiHapus(idBook);
  const aksibacaUlang = buatAksiBacaUlang(idBook);

  if (inputBookIsComplete) {
    textButton.append(aksibacaUlang);
  } else {
    textButton.append(aksiBaca);
  }
  textButton.append(aksiEdit, aksiHapus);
  return textButton;
}

function buatAksiBaca(idBook) {
  const aksiBaca = document.createElement("button");
  aksiBaca.classList.add("green");
  aksiBaca.innerText = "Selesaikan Baca";

  return aksiBaca;
}

function buatAksiEdit(idBook) {
  const aksiEdit = document.createElement("button");
  aksiEdit.classList.add("blue");
  aksiEdit.innerText = "Edit Buku";

  aksiEdit.addEventListener("click", function () {
    let confirmation = confirm("Apakah Anda yakin ingin mengedit buku ini?");

    if (confirmation) {
      const inputBook = document.getElementById(idBook);
      const bookTitle = inputBook.querySelector(
        ".book_shelf > .book_list > .book_item > h1"
      ).innerHTML;

      const bookAuthor = inputBook.querySelectorAll(
        ".book_shelf > .book_list > .book_item > p"
      )[0].innerHTML;
      console.log(bookAuthor);
      const bookYear = inputBook.querySelectorAll(
        ".book_shelf > .book_list > .book_item > p"
      )[1].innerHTML;

      document.getElementById("inputBookTitle").value = bookTitle;
      document.getElementById("inputBookAuthor").value = bookAuthor;
      document.getElementById("inputBookYear").value = bookYear;
      document.getElementById("inputBookIsComplete").checked =
        inputBookIsComplete;

      deleteBuku(idBook);
      document.getElementById(idBook).remove();
    }
  });
  return aksiEdit;
}
let bukuSimpan = [];
function deleteBuku(idBook) {
  fetch("https://apem.webakb.com/rest/hapuspgw.php?kode_buku=" + idBook, {
    method: "Delete",

    mode: "cors",

    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  }).then((response) => response.json());
  for (
    let arrayPossition = 0;
    arrayPossition < bukuSimpan.length;
    arrayPossition++
  ) {
    if (bukuSimpan[arrayPossition].id == idBook) {
      bukuSimpan.splice(arrayPossition, 1);
      break;
    }
  }
}
function buatAksiHapus(idBook) {
  const aksiHapus = document.createElement("button");
  aksiHapus.classList.add("red");
  aksiHapus.innerText = "Hapus";

  aksiHapus.addEventListener("click", function () {
    let confirmation = confirm("apakah anda yakin ingin menghapus buku?");

    if (confirmation) {
      const cardParent = document.getElementById(idBook);
      cardParent.addEventListener("eventDelete", function (event) {
        event.target.remove();
      });
      cardParent.dispatchEvent(new Event("eventDelete"));

      deleteBuku(idBook);
      //saveData();
    }
  });

  return aksiHapus;
}

function buatAksiBacaUlang(idBook) {
  const aksibacaUlang = document.createElement("button");
  aksibacaUlang.classList.add("green");
  aksibacaUlang.innerText = "Baca Ulang";

  return aksibacaUlang;
}
