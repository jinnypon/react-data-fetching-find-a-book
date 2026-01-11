import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  //ส่วนรับข้อมูลจาก sever
  const [books, setBooks] = useState([]);

  useEffect(() => {
  getJohnProfile();
  }, []);

  const getJohnProfile = async () => {
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=<query-param-value>"
    );
    setBooks(response.data.items);
  };

  //ส่วนกรอกคำเสริช
  const [searchText, setsearchText] = useState("");

  /*ฟิลเตอร์ คัดเฉพาะที่มีคำที่ตรง
    -โดยไม่สนตัวใหญ่-เล็ก
    - ถ้ามีช่องว่างขั้น ให้แยกคำค้น แล้วหาที่มีทั้งหมด
    แล้วเก็บใน array filteredBooks
  */
  const filteredBooks = books.filter((book) => {
      const title = book.volumeInfo.title.toLowerCase();
      const keywords = searchText.toLowerCase().trim().split(/\s+/);

      return keywords.every((word) => title.includes(word));
  });

  return <div className="App">
    <h1>Find a Book</h1>
     <form>
      <label>
        <input
          type="text"
          name="searchText"
          value={searchText}
          onChange={(event) => setsearchText(event.target.value)}
          placeholder="Search book"
        />
      </label>
    </form>
    <ul>
      {filteredBooks.map((book) => (
        <li key={book.id} className="filteredBookList">
          {book.volumeInfo.title}
        </li>
      ))}
    </ul>
  </div>;
}

export default App;
