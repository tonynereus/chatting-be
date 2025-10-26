import React, { useState, useEffect } from 'react';
import { Button, Layout, Typography } from 'antd';
import io from 'socket.io-client';
import UserList from './components/UserList';
import ChatWindow from './components/ChatWindow';
import './styles.css';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

// const socket = io('http://localhost:5000', {
//   auth: {
//     token: 'admin-secret-token',
//   },
// });

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // const newSocket = io('https://cwu-be.onrender.com', {
    // const newSocket = io('https://cwu-be.onrender.com', {
    const newSocket = io('https://cwu.tonyicon.com.ng', {
      transports: ["websocket"],
      auth: { token: 'admin-secret-token' },
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);



  useEffect(() => {
    if(!socket)
      return ()=>'no socket';
    socket.on('connect', () => {
      console.log('Connected as admin');
    });

    socket.on('userList', (userList) => {
      console.log('got list');
      console.log(userList);
      setUsers(userList);
    });

    socket.on('all-messages', (data) => {
      const messageObject = {};
      data.map(x => {
        messageObject[x.user] = [...(messageObject[x.user] || []), { sender: x.sender, message: x.message }]
      });
      setMessages(messageObject);
    });

    socket.on('receiveMessage', (data) => {
      setMessages((prev) => ({
        ...prev,
        [data.from]: [...(prev[data.from] || []), { sender: data.from, message: data.message }],
      }));

      setUsers(prev => {
        return prev.map(x => {
          console.log(x.socketId == data.from);
          return x.socketId == data.from ? { ...x, newMessage: true } : x
        })
      });

    });

    return () => {
      socket.off('connect');
      socket.off('userList');
      socket.off('receiveMessage');
      socket.off('all-messages');
    };
  }, [socket]);

  const openChat = (user) => {
    setSelectedUser(user);
    setUsers(prev => {
      return prev.map(x => {
        return x.sockedId == user.sockedId ? { ...x, newMessage: false } : x
      })
    })
  }

  const sendMessage = (message) => {
    if (selectedUser) {
      socket.emit('sendMessage', { message, to: selectedUser.socketId });
      setMessages((prev) => ({
        ...prev,
        [selectedUser.socketId]: [...(prev[selectedUser.socketId] || []), { sender: 'admin', message }],
      }));
    }
  };

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Header style={{ background: '#001529', color: '#fff', padding: '0 16px', display: 'flex', alignItems: 'center' }}>
        <Title level={3} style={{ color: '#fff', margin: 0 }}>
          Admin Chat Interface
        </Title>
      </Header>
      <Layout style={{ flexDirection: 'row', width: "100vw" }}>
        {
          !selectedUser && <Sider width={300} style={{ background: '#fff', padding: '20px', borderRight: '1px solid #ddd' }}>
            <UserList users={users} selectUser={openChat} selectedUser={selectedUser} />
          </Sider>
        }
        <Layout style={{ flex: 1 }}>
          <Content style={{ padding: '20px', overflow: 'auto' }}>
            {selectedUser && <div onClick={() => { setSelectedUser() }}>
              <ArrowLeftOutlined />
            </div>}
            {selectedUser ? (
              <ChatWindow
                selectedUser={selectedUser}
                messages={messages[selectedUser.socketId] || []}
                sendMessage={sendMessage}
              />
            ) : (
              <></>
              // <div style={{ textAlign: 'center', padding: '20px' }}>
              //   <Title level={4}>Select a user to start chatting</Title>
              // </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
