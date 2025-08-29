// Backend API base URL
window.API_BASE = "https://chat-backend-fply.onrender.com";

const chatBox = document.getElementById("chat");
const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;

  // show user message
  addMessage(message, "user");
  messageInput.value = "";

  try {
    // send message to backend API
    const res = await fetch(`${window.API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    addMessage(data.reply, "bot");
  } catch (err) {
    addMessage("⚠️ Error: cannot reach chatbot API", "bot");
  }
});
