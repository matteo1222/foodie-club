import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import { COLORS } from '../../constants/colors'
import ChatMessage from '../../components/ChatMessage'
import { chatMessages } from '../../mockData/chatMessages'
import ChatInput from '../../components/ChatInput'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import LeaveGroupModal from '../../components/LeaveGroupModal'
import client from '../../feathers/feathers-client'
import { useAuth } from '../../components/auth'
import { useNavigate } from 'react-router-dom'

function ChatScreen() {
    const auth = useAuth()
    const navigate = useNavigate()
    const chatInputRef = useRef(null)
    const messageBoxRef = useRef(null)
    const messagesRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [chatValue, setChatValue] = useState('')
    let params = useParams()
    const groupId = Number(params.groupId)

    const handleChatInputChange = (event) => {
        setChatValue(event.target.value)
    }

    const handleMessageSend = () => {
        if (chatValue.trim() === '') {
            return
        }
        return client
            .service('messages')
            .create({
                text: chatValue.trim(),
                user_id: auth.user.id,
                group_id: groupId
            })
            .then(() => setChatValue(''))
            .catch(err => console.error('Error sending message:', err))
    }

    const handleClickLeave = () => {
        setOpen(true)
    }

    const handleCloseModal = () => {
        setOpen(false)
    }

    const handleLeaveGroup = () => {
        client
            .service('groups')
            .remove(null, {
                query: {
                    leave: true,
                    user_id: auth.user.id,
                    group_id: groupId
                }
            })
            .then(() => {
                setOpen(false)
                navigate('/my-groups')
            })
            .catch(err => console.error('Error leaving group: ', err))
    }

    const scrollToBottom = () => {
        if (messagesRef.current && messageBoxRef.current) {
            const { height } = messagesRef.current.getBoundingClientRect()
            messageBoxRef.current.scrollTo({ top: height, behavior: 'smooth' })
        }
    }
    const onCreated = (created) => {
        if (created.group_id !== groupId) {
            return
        }
        setMessages(prevState => [...prevState, created])
        scrollToBottom()
    }

    const queryMessages = () => {
        return client
            .service('messages')
            .find({
                query: {
                    group_id: groupId
                }
            })
            .then(res => setMessages(res))
            .catch(err => console.error('Error fetching messages:', err))
    }

    useEffect(() => {
        // clear past messages
        setMessages([])
        // query past messages
        queryMessages()
        // set up listener for create/remove event
        client
            .service('messages')
            .on('created', onCreated)
        return (() => {
            client
                .service('messages')
                .removeListener('created')
        })
    }, [groupId])

    useEffect(() => {
        scrollToBottom()
    }, [messagesRef, messageBoxRef])

    return (
        <Grid container sx={{
            background: COLORS.lightGrey,
            width: '100%',
            paddingY: 2,
            paddingX: 2
        }}>
            <Grid item sm={12}>
                <Stack direction='column' ref={messageBoxRef} sx={{
                    height: 500,
                    overflowY: 'scroll',
                    marginBottom: 5
                }}>
                    <div ref={messagesRef}>
                        {
                            messages.map((el, idx) => {
                                console.log('message el', el)
                                // TODO: make image only need to fetch once
                                return (
                                    <ChatMessage
                                        username={el.username}
                                        userId={el.userId}
                                        userAvatarSrc={`http://localhost:3030/${el.userAvatarSrc}`}
                                        message={el.text}
                                        isMine={el.userId === auth.user.id}
                                        key={idx}
                                    />
                                )
                            })
                        }
                    </div>
                </Stack>
            </Grid>
            <Grid item sm={12}>
                <Stack direction='row' justifyContent='center' alignItems='end'>
                    <ChatInput
                        inputRef={chatInputRef}
                        onChange={handleChatInputChange}
                        value={chatValue}
                    />
                    <IconButton
                        aria-label='chat-send-button'
                        sx={{marginX: 2}}
                        disabled={chatValue === ''}
                        onClick={handleMessageSend}
                    >
                        <SendIcon/>
                    </IconButton>
                </Stack>
            </Grid>
            <Grid item sm={12}>
                <Stack direction='row' justifyContent='stretch'>
                    <Button
                        onClick={handleClickLeave}
                        variant='contained'
                        color='error'
                        sx={{
                            marginTop: 3,
                            marginBottom: 2,
                            borderRadius: 20,
                            marginX: 1
                        }}
                    >Leave Group</Button>
                </Stack>
            </Grid>
            <LeaveGroupModal
                open={open}
                handleClose={handleCloseModal}
                handleSubmit={handleLeaveGroup}
            />
        </Grid>
    )
}

export default ChatScreen
