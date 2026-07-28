import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'

const CHATS = [
  { id: 1, name: 'Sarah Chen', role: 'UX Instructor', avatar: 'SC', unread: 2, lastMsg: 'Great progress on your wireframe assignment!', time: '10:42 AM' },
  { id: 2, name: 'UI/UX Study Group', role: 'Group Chat (8 members)', avatar: 'SG', unread: 0, lastMsg: 'Does anyone have feedback on lesson 3?', time: 'Yesterday' },
  { id: 3, name: 'EduTrack Support', role: 'Support Team', avatar: 'ES', unread: 0, lastMsg: 'Your certificate verification request has been approved.', time: 'Jul 19' },
]

export default function Messages({ navigate, currentPage }) {
  const [selectedChat, setSelectedChat] = useState(CHATS[0])
  const [messages, setMessages] = useState([
    { sender: 'them', text: 'Hi John! How is the Figma course coming along?', time: '10:30 AM' },
    { sender: 'me', text: 'Hey Sarah! Moving through Module 1. The user research lesson was super helpful.', time: '10:35 AM' },
    { sender: 'them', text: 'Great progress on your wireframe assignment! Keep up the good work.', time: '10:42 AM' },
  ])
  const [inputText, setInputText] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return
    setMessages((prev) => [
      ...prev,
      { sender: 'me', text: inputText, time: 'Just now' },
    ])
    setInputText('')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar navigate={navigate} currentPage={currentPage} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopNav navigate={navigate} currentPage={currentPage} breadcrumb={[{ label: 'Messages' }]} />

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Chat List */}
          <div style={{ width: 320, background: '#fff', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: 20, borderBottom: '1px solid #F3F4F6' }}>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, color: '#111827', margin: '0 0 12px' }}>Messages</h2>
              <input
                placeholder="Search conversations..."
                style={{ width: '100%', padding: '8px 12px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 13, outline: 'none' }}
              />
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {CHATS.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 20px',
                    background: selectedChat.id === chat.id ? '#EFF6FF' : 'transparent',
                    borderLeft: selectedChat.id === chat.id ? '4px solid #2563EB' : '4px solid transparent',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#2563EB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>
                    {chat.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13.5, color: '#111827' }}>{chat.name}</span>
                      <span style={{ fontSize: 11, color: '#9CA3AF' }}>{chat.time}</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#6B7280', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.lastMsg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Conversation Window */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
            {/* Header */}
            <div style={{ height: 60, background: '#fff', borderBottom: '1px solid #E5E7EB', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#2563EB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
                {selectedChat.avatar}
              </div>
              <div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 14.5, color: '#111827', margin: 0 }}>{selectedChat.name}</h3>
                <span style={{ fontSize: 11.5, color: '#6B7280' }}>{selectedChat.role}</span>
              </div>
            </div>

            {/* Messages body */}
            <div style={{ flex: 1, padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: m.sender === 'me' ? 'flex-end' : 'flex-start',
                    maxWidth: '65%',
                  }}
                >
                  <div
                    style={{
                      background: m.sender === 'me' ? '#2563EB' : '#fff',
                      color: m.sender === 'me' ? '#fff' : '#111827',
                      padding: '10px 16px',
                      borderRadius: m.sender === 'me' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      fontSize: 13.5,
                      lineHeight: 1.5,
                    }}
                  >
                    {m.text}
                  </div>
                  <div style={{ fontSize: 10.5, color: '#9CA3AF', marginTop: 4, textAlign: m.sender === 'me' ? 'right' : 'left' }}>
                    {m.time}
                  </div>
                </div>
              ))}
            </div>

            {/* Input bar */}
            <form onSubmit={handleSend} style={{ padding: 16, background: '#fff', borderTop: '1px solid #E5E7EB', display: 'flex', gap: 10 }}>
              <input
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{ flex: 1, padding: '10px 16px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 13.5, outline: 'none' }}
              />
              <button
                type="submit"
                style={{ padding: '10px 20px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 13.5, cursor: 'pointer' }}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
