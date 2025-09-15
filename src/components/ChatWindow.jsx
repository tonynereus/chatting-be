import React, { useState ,useRef,useEffect} from 'react';
import { Input, Button, List } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './ChatWindow.css';

const ChatWindow = ({ selectedUser, messages, sendMessage }) => {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (selectedUser && messagesEndRef.current && selectedUser != null) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, selectedUser]);
    

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            sendMessage(message);
            setMessage('');
        }
    };

    const AdminMes = ({ mes }) => {
        return (
            <div className='admin-cont'>
                <List.Item className={'message-admin'}>
                    {mes}
                </List.Item>
            </div>
        )
    }
    const UserMes = ({ mes }) => {
        return (
            <div className='user-cont'>
                <List.Item className={'message-user'}>
                    {mes}
                </List.Item>
            </div>
        )
    }
    return (
        <div className="chat-window">
            <div className="chat-messages">
                <List
                    dataSource={messages}
                    renderItem={msg => (
                        msg.sender == "admin" ?
                            <AdminMes mes={msg.message} /> : <UserMes mes={msg.message} />
                    )}
                />
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
                <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onPressEnter={handleSendMessage}
                />
                <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default ChatWindow;
