const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

const API_URL = "https://taixiu1.taison01.com/api/luckydice1/GetSoiCau";

// Biên dịch JSON → tiếng Việt
function bienDichTaiXiu(item) {
  const phienHienTai = item.SessionId + 1;

  return {
    "Phiên trước": item.SessionId,
    "Phiên hiện tại": phienHienTai,
    "Xúc xắc 1": item.FirstDice,
    "Xúc xắc 2": item.SecondDice,
    "Xúc xắc 3": item.ThirdDice,
    "Tổng điểm": item.DiceSum,
    "Kết quả": item.BetSide === 1 ? "Xỉu" : "Tài"
  };
}

// API local – chỉ lấy phiên mới nhất
app.get("/api/son", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });

    let data = response.data;

    // Nếu API trả về object đơn
    if (!Array.isArray(data)) {
      return res.json(bienDichTaiXiu(data));
    }

    // Sắp xếp theo SessionId (mới → cũ)
    data.sort((a, b) => b.SessionId - a.SessionId);

    const newest = data[0];

    res.json(bienDichTaiXiu(newest));

  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Không lấy được dữ liệu Son Club",
      detail: err.message
    });
  }
});

// Trang test
app.get("/", (req, res) => {
  res.send(`
    <h2>Son Club Tài Xỉu (Phiên mới nhất)</h2>
    <p>API: <a href="/api/son">/api/son</a></p>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
