import React from 'react';
import { List, Avatar , Badge} from 'antd';

const UserList = ({ users, selectUser, selectedUser }) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(user) => (
                <List.Item
                    onClick={() => selectUser(user)}
                    style={{ cursor: 'pointer', background: selectedUser?.socketId === user.socketId ? '#e6f7ff' : '' }}
                >
                    <List.Item.Meta
                        avatar={<Avatar>{user.displayName.charAt(0)}</Avatar>}
                        title={user.displayName}
                        description={user.newMessage  ? <Badge dot>New messages</Badge> : null}
                        extra={
                            <></>
                            // <Text type="secondary" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            //     {newMessageText}
                            // </Text>
                        }

                    />
                </List.Item>
            )}
        />
    );
};

export default UserList;
