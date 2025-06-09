import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./chatPage.css";

//const API_BASE_URL = "/api"; // Proxy will handle the base URL
const API_BASE_URL = "https://englishlearningco.onrender.com/api";


const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      message: "Hey! Let's chat.",
      sender: "AI Assistant",
      direction: "incoming",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/signin");
    } else {
      setToken(storedToken);
      fetchChatHistory(storedToken);
    }
  }, [navigate]);

  async function fetchChatHistory(authToken) {
    try {
      const response = await fetch(`${API_BASE_URL}/chat/history`, {
        method: "GET",
        headers: {
          Authorization: `Token ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chat history");
      }

      const data = await response.json();

      if (!data.history || !Array.isArray(data.history)) {
        console.warn("No chat history found, keeping default message.");
        return;
      }

      const formattedMessages = data.history.map((msg) => ({
        message: msg.content,
        sender: msg.role === "assistant" ? "AI Assistant" : "user",
        direction: msg.role === "assistant" ? "incoming" : "outgoing",
      }));

      setMessages((prev) => [...prev, ...formattedMessages]);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  }

  const handleSend = async (message) => {
    const newMessage = { message, direction: "outgoing", sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    await sendMessageToBackend(newMessage);
  };

  async function sendMessageToBackend(userMessage) {
    if (!token) return;

    const apiRequestBody = {
      messages: userMessage.message, // Changed 'message' to 'messages' to match backend
    };

    console.log("Sending message to API:", JSON.stringify(apiRequestBody));

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });

      const responseText = await response.text();
      console.log("Raw response from API:", responseText);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log("Parsed API response:", data);

      setMessages((prev) => [
        ...prev,
        {
          message: data.response,
          sender: "AI Assistant",
          direction: "incoming",
        },
      ]);
    } catch (error) {
      console.error("Error communicating with the API:", error);
      setMessages((prev) => [
        ...prev,
        {
          message: "Sorry, there was an issue connecting to the server.",
          sender: "AI Assistant",
          direction: "incoming",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="chat-page">
      <div className="chat-container">
        <MainContainer>
          <ChatContainer>
            <ConversationHeader>
              <Avatar name="AI Assistant" src="logoThree.png" />
              <ConversationHeader.Content userName="AI Assistant" />
              <ConversationHeader.Actions>
                <button
                  className="end-chat-btn"
                  onClick={() => navigate("/mini")}
                >
                  End Chat
                </button>
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="AI Assistant is typing..." />
                ) : null
              }
            >
              {messages.map((msg, i) => (
                <Message key={i} model={msg} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default ChatPage;

/*import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./chatPage.css";

const API_BASE_URL = "/api"; // Proxy will handle the base URL

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/signin");
    } else {
      setToken(storedToken);
      fetchChatHistory(storedToken);
    }
  }, [navigate]);

  async function fetchChatHistory(authToken) {
    const requestUrl = `${API_BASE_URL}/chat/history`;
    console.log("Fetching chat history from:", requestUrl);
    try {
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          Authorization: `Token ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch chat history: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      const formattedMessages = data.history.map((msg) => ({
        message: msg.content,
        sender: msg.role === "assistant" ? "AI Assistant" : "user",
        direction: msg.role === "assistant" ? "incoming" : "outgoing",
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  }

  const handleSend = async (message) => {
    const newMessage = { message, direction: "outgoing", sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    await sendMessageToBackend(newMessage);
  };

  async function sendMessageToBackend(userMessage) {
    if (!token) return;

    const apiRequestBody = {
      message: userMessage.message,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          message: data.response,
          sender: "AI Assistant",
          direction: "incoming",
        },
      ]);
    } catch (error) {
      console.error("Error communicating with the API:", error);
      setMessages((prev) => [
        ...prev,
        {
          message: "Sorry, there was an issue connecting to the server.",
          sender: "AI Assistant",
          direction: "incoming",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="chat-page">
      <div className="chat-container">
        <MainContainer>
          <ChatContainer>
            <ConversationHeader>
              <Avatar name="AI Assistant" src="logoThree.png" />
              <ConversationHeader.Content userName="AI Assistant" />
              <ConversationHeader.Actions>
                <button
                  className="end-chat-btn"
                  onClick={() => navigate("/mini")}
                >
                  End Chat
                </button>
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="AI Assistant is typing..." />
                ) : null
              }
            >
              {messages.map((msg, i) => (
                <Message key={i} model={msg} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default ChatPage;

//i think this code works perfectly both chathistory and chat urls are provided ,the problem from his side.
//updating the code to proxy
/*import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./chatPage.css";

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/signin");
    } else {
      setToken(storedToken);
      fetchChatHistory(storedToken);
    }
  }, [navigate]);

  async function fetchChatHistory(authToken) {
    try {
      const response = await fetch("/api/chat/history", {
        method: "GET",
        headers: {
          Authorization: `Token ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch chat history");
      const data = await response.json();

      const formattedMessages = data.history.map((msg) => ({
        message: msg.content,
        sender: msg.role === "assistant" ? "AI Assistant" : "user",
        direction: msg.role === "assistant" ? "incoming" : "outgoing",
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  }

  const handleSend = async (message) => {
    const newMessage = { message, direction: "outgoing", sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    await sendMessageToBackend(newMessage);
  };

  async function sendMessageToBackend(userMessage) {
    if (!token) return;

    const apiRequestBody = {
      message: userMessage.message,
    };

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });

      if (!response.ok) throw new Error(`API error: ${response.statusText}`);
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          message: data.response,
          sender: "AI Assistant",
          direction: "incoming",
        },
      ]);
    } catch (error) {
      console.error("Error communicating with the API:", error);
      setMessages((prev) => [
        ...prev,
        {
          message: "Sorry, there was an issue connecting to the server.",
          sender: "AI Assistant",
          direction: "incoming",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="chat-page">
      <div className="chat-container">
        <MainContainer>
          <ChatContainer>
            <ConversationHeader>
              <Avatar name="AI Assistant" src="logoThree.png" />
              <ConversationHeader.Content userName="AI Assistant" />
              <ConversationHeader.Actions>
                <button
                  className="end-chat-btn"
                  onClick={() => navigate("/mini")}
                >
                  End Chat
                </button>
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="AI Assistant is typing..." />
                ) : null
              }
            >
              {messages.map((msg, i) => (
                <Message key={i} model={msg} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default ChatPage;*/

//THIS CODE ONLY USES /CHAT URL
/*import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./chatPage.css";

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      message: "Hello, let's practice!",
      sentTime: "just now",
      sender: "AI Assistant",
      direction: "incoming",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/signin");
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  const handleSend = async (message) => {
    const newMessage = { message, direction: "outgoing", sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    await sendMessageToBackend(newMessage);
  };

  async function sendMessageToBackend(userMessage) {
    if (!token) return;

    const apiRequestBody = {
      message: userMessage.message,
    };

    try {
      const response = await fetch(
        "https://englishlearningco.onrender.com/api/chat",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      if (!response.ok) throw new Error(`API error: ${response.statusText}`);
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          message: data.response,
          sender: "AI Assistant",
          direction: "incoming",
        },
      ]);
    } catch (error) {
      console.error("Error communicating with the API:", error);
      setMessages((prev) => [
        ...prev,
        {
          message: "Sorry, there was an issue connecting to the server.",
          sender: "AI Assistant",
          direction: "incoming",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="chat-page">
      <div className="chat-container">
        <MainContainer>
          <ChatContainer>
            <ConversationHeader>
              <Avatar name="AI Assistant" src="logoThree.png" />
              <ConversationHeader.Content userName="AI Assistant" />
              <ConversationHeader.Actions>
                <button
                  className="end-chat-btn"
                  onClick={() => navigate("/mini")}
                >
                  End Chat
                </button>
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="AI Assistant is typing..." />
                ) : null
              }
            >
              {messages.map((msg, i) => (
                <Message key={i} model={msg} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default ChatPage;*/

//older
//this is the chat page component
/*import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
//default styles
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
//custom styles
import "./chatPage.css";

const GROQ_API_KEY = "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";

const systemMessage = {
  role: "system",
  content: `You are a friendly and engaging conversational AI."  
`,
};

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, let's practice!",
      sentTime: "just now",
      sender: "Groq Assistant",
      direction: "incoming",
    },
  ]);
  //this line is new:
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = { message, direction: "outgoing", sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    await processMessageToGroq([...messages, newMessage]);
  };

  async function processMessageToGroq(chatMessages) {
    const apiMessages = chatMessages.map((msg) => ({
      role: msg.sender === "Groq Assistant" ? "assistant" : "user",
      content: msg.message,
    }));

    const apiRequestBody = {
      model: "llama-3.3-70b-versatile",
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      if (!response.ok) throw new Error(`API error: ${response.statusText}`);
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          message: data.choices[0].message.content,
          sender: "Groq Assistant",
          direction: "incoming",
        },
      ]);
    } catch (error) {
      console.error("Error communicating with the Groq API:", error);
      setMessages((prev) => [
        ...prev,
        {
          message: "Sorry, there was an issue connecting to the server.",
          sender: "Groq Assistant",
          direction: "incoming",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="chat-page">
      <div className="chat-container">
        <MainContainer>
          <ChatContainer>
            <ConversationHeader>
              <Avatar name="LingoMate" src="logoThree.png" />
              <ConversationHeader.Content userName="" />
              <ConversationHeader.Actions>
                <button
                  className="end-chat-btn"
                  onClick={() => navigate("/mini")}
                >
                  End Chat
                </button>
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="Groq Assistant is typing..." />
                ) : null
              }
            >
              {messages.map((msg, i) => (
                <Message key={i} model={msg} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default ChatPage;*/
