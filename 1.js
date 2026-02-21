const express = require("express");

const app = express();
const PORT = 3000;

/* ===========================
   1️⃣ API BÀN THƯỜNG
=========================== */
app.get("/xd88", async (req, res) => {
    try {
        const response = await fetch("https://xd88txhu.hacksieucap.pro/xd88huddm");
        const data = await response.json();

        // đổi phiendudoan -> phien_hien_tai
        if (data.phiendudoan) {
            data.phien_hien_tai = data.phiendudoan;
            delete data.phiendudoan;
        }

        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Lỗi bàn thường" });
    }
});

/* ===========================
   2️⃣ API MD5
=========================== */
app.get("/md5", async (req, res) => {
    try {
        const response = await fetch("https://xocdia88md5.hacksieucap.pro/txmd5v2");
        const data = await response.json();

        // đổi du_doan_van_sau -> du_doan
        if (data.du_doan_van_sau) {
            data.du_doan = data.du_doan_van_sau;
            delete data.du_doan_van_sau;
        }

        // đổi phien_dudoan -> phien_hien_tai
        if (data.phien_dudoan) {
            data.phien_hien_tai = data.phien_dudoan;
            delete data.phien_dudoan;
        }

        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Lỗi MD5" });
    }
});

app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});
