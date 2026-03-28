// ===== LOAD DATA =====
let events = JSON.parse(localStorage.getItem("events")) || [
  {
    title: "Concert Sơn Tùng",
    desc: "Show âm nhạc cực đỉnh",
    img: "https://picsum.photos/300/200?1",
    category: "Âm nhạc",
    date: "2026-04-15",
    location: "Hà Nội",
    price: "500.000đ"
  }
];

let currentCategory = "all";

// ===== RENDER =====
function renderEvents(category = "all") {
  currentCategory = category;
  applyFilters();
}

// ===== FILTER =====
function applyFilters() {
  const date = document.getElementById("filterDate").value;
  const location = document.getElementById("filterLocation").value;

  let filtered = events;

  if (currentCategory !== "all") {
    filtered = filtered.filter(e => e.category === currentCategory);
  }

  if (date) {
    filtered = filtered.filter(e => e.date === date);
  }

  if (location) {
    filtered = filtered.filter(e => e.location === location);
  }

  renderList(filtered);
}

// ===== HIỂN THỊ =====
function renderList(data) {
  const list = document.getElementById("eventList");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = "<p>Không có sự kiện</p>";
    return;
  }

  data.forEach(e => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-img">
        <img src="${e.img}">
        <span class="tag">${e.category}</span>
      </div>

      <div class="info">
        <h4>${e.title}</h4>
        <p class="meta">📅 ${e.date}</p>
        <p class="meta">📍 ${e.location}</p>

        <div class="bottom">
          <span class="price">${e.price}</span>
          <button class="buy-btn">Xem</button>
        </div>
      </div>
    `;

    card.onclick = () => {
      localStorage.setItem("eventDetail", JSON.stringify(e));
      window.location.href = "sự kiện.html";
    };

    list.appendChild(card);
  });
}

// ===== MODAL LOGIN =====
function openLogin() {
  document.getElementById("login").style.display = "block";
}

function closeLogin() {
  document.getElementById("login").style.display = "none";
}

// ===== CREATE EVENT MODAL =====
function openCreateEvent() {
  document.getElementById("createEventModal").style.display = "block";
}

function closeCreateEvent() {
  document.getElementById("createEventModal").style.display = "none";
}

// ===== CREATE EVENT =====
function createEvent() {
  const title = document.getElementById("evTitle").value;
  const desc = document.getElementById("evDesc").value;
  const category = document.getElementById("evCategory").value;
  const date = document.getElementById("evDate").value;
  const location = document.getElementById("evLocation").value;
  const price = document.getElementById("evPrice").value;

  if (!title || !desc || !category || !date || !location || !price) {
    alert("Vui lòng nhập đầy đủ!");
    return;
  }

  const newEvent = {
    title,
    desc,
    category,
    date,
    location,
    price,
    img: "https://picsum.photos/300/200?random=" + Math.random()
  };

  events.push(newEvent);

  // Lưu vào localStorage
  localStorage.setItem("events", JSON.stringify(events));

  // Reset form
  document.getElementById("evTitle").value = "";
  document.getElementById("evDesc").value = "";
  document.getElementById("evCategory").value = "";
  document.getElementById("evDate").value = "";
  document.getElementById("evLocation").value = "";
  document.getElementById("evPrice").value = "";

  closeCreateEvent();
  renderEvents();
}

// ===== NAVBAR =====
function openMyTickets() {
  alert("Chức năng 'Vé của tôi' cần backend 😄");
}

// ===== LOAD =====
renderEvents();