const CONVERSATIONS = [
  { id:1, name:'Sari Dewi', username:'@saridewi', avatar:'https://i.pravatar.cc/44?img=5', last:'Oke, nanti aku kirim filenya!', unread:true,
    messages:[
      { from:'them', text:'Hei, desainnya keren banget!', time:'10:02' },
      { from:'me', text:'Makasih! Sudah lama aku kerjain.', time:'10:05' },
      { from:'them', text:'Oke, nanti aku kirim filenya!', time:'10:07' },
    ]},
  { id:2, name:'Budi Santoso', username:'@budisantoso', avatar:'https://i.pravatar.cc/44?img=8', last:'Kapan kita bisa meeting?', unread:false,
    messages:[
      { from:'them', text:'Halo! Kapan kita bisa meeting?', time:'Kemarin' },
      { from:'me', text:'Besok bisa, jam 10 pagi?', time:'Kemarin' },
    ]},
  { id:3, name:'Rina Kusuma', username:'@rinakusuma', avatar:'https://i.pravatar.cc/44?img=12', last:'Terima kasih sudah share!', unread:false,
    messages:[
      { from:'me', text:'Coba baca artikel ini, menarik banget.', time:'Senin' },
      { from:'them', text:'Terima kasih sudah share!', time:'Senin' },
    ]},
];

let activeConv = null;
let allConversations = [...CONVERSATIONS];

function renderConversations(list) {
  const el = document.getElementById('convList');
  el.innerHTML = list.map(c => `
    <div class="conv-item ${activeConv===c.id?'active':''}" onclick="openChat(${c.id})">
      <img src="${c.avatar}" class="conv-avatar" />
      <div class="conv-info">
        <div class="conv-name">${c.name}</div>
        <div class="conv-last">${c.last}</div>
      </div>
      ${c.unread ? '<div class="conv-unread"></div>' : ''}
    </div>`).join('');
}

function openChat(id) {
  activeConv = id;
  const conv = CONVERSATIONS.find(c => c.id === id);
  conv.unread = false;

  document.getElementById('chatEmpty').classList.add('hidden');
  document.getElementById('chatActive').classList.remove('hidden');
  document.getElementById('chatAvatar').src = conv.avatar;
  document.getElementById('chatName').textContent = conv.name;
  document.getElementById('chatUsername').textContent = conv.username;

  renderMessages(conv.messages);
  renderConversations(allConversations);
}

function renderMessages(msgs) {
  const el = document.getElementById('chatMessages');
  el.innerHTML = msgs.map(m => `
    <div>
      <div class="chat-bubble ${m.from}"><div>${m.text}</div><div class="bubble-time">${m.time}</div></div>
    </div>`).join('');
  el.scrollTop = el.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text || !activeConv) return;

  const conv = CONVERSATIONS.find(c => c.id === activeConv);
  const now = new Date().toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' });
  conv.messages.push({ from:'me', text, time: now });
  conv.last = text;
  input.value = '';

  renderMessages(conv.messages);
  renderConversations(allConversations);

  // Simulasi balasan
  setTimeout(() => {
    const replies = ['Oke!', 'Siap 👍', 'Noted!', 'Makasih infonya.', 'Aku pikirin dulu ya.'];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    const now2 = new Date().toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' });
    conv.messages.push({ from:'them', text: reply, time: now2 });
    conv.last = reply;
    renderMessages(conv.messages);
    renderConversations(allConversations);
  }, 1000 + Math.random() * 1000);
}

function filterConversations(q) {
  allConversations = q ? CONVERSATIONS.filter(c => c.name.toLowerCase().includes(q.toLowerCase())) : [...CONVERSATIONS];
  renderConversations(allConversations);
}

renderConversations(CONVERSATIONS);
