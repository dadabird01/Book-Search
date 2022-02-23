var searchBook = "";

$("input.search").on("keypress", function (event) {
  if (event.which == 13) {
    event.preventDefault();
    loadData();
  }
});

$(".submitBtn").on("click", function (event) {
  event.preventDefault();
  loadData();
});

function loadData() {
  searchBook = $(".search").val();
  $(".booklist").children().remove();


  
  axios.get(
      "https://www.googleapis.com/books/v1/volumes?maxResults=10&q=" +
        searchBook
    )
    .then((res) => {
      console.log(res.data.items[0].volumeInfo.title);
      books_list(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function books_list(bookList) {
  let myList = $(".booklist");
  console.log(bookList.items);
  $.each(bookList.items, function (index, book) {
    myList.append(addItem(book));
  });
}

function addItem(book) {
  const list_html = `
          <div class="book">
            <img ${
              book.volumeInfo.imageLinks
                ? `src=${book.volumeInfo.imageLinks.thumbnail}`
                : `alt="No Image"`
                }"/>
            <div class="info">
              <span>book title : ${book.volumeInfo.title}</span>
              <span>author : ${book.volumeInfo.authors}</span>
            </div>
          </div>
	`;
  return list_html;
}
