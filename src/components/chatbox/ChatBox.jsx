const ChatBox = ({ messages, currentUser }) => {
  console.log("chat box",messages)
  return (
    <div
      style={{
        height: "425px", // fixed parent height
        display: "flex",
        flexDirection: "column",
        // border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      {/* Scrollable messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
        }}
      >
        {messages.map((msg, i) => {
          const isStatusMessage =
            msg.text === "Admin is online" || msg.text === "Admin is offline";

          if (isStatusMessage) {
            return (
              <div
                key={`status-${i}`}
                style={{
                  textAlign: "center",
                  margin: "10px 0",
                  fontWeight: 500,
                  color: msg.text === "Admin is online" ? "green" : "red",
                }}
              >
                {msg.text}
              </div>
            );
          }

          const isOwnMessage =
            currentUser === "user"
              ? msg.sender === "user"
              : msg.sender === "admin" || msg.sender === "bot";

          return (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: isOwnMessage ? "flex-end" : "flex-start",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  backgroundColor: isOwnMessage ? "#e0f7fa" : "#dcedc8",
                  padding: "8px 12px",
                  borderRadius: "16px",
                  maxWidth: "70%",
                }}
              >
                <strong>{msg.sender}</strong>: {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional fixed footer (input, buttons, etc.) */}
      {/* <div style={{ borderTop: "1px solid #ccc", padding: "0.5rem" }}>
    Input box here
  </div> */}
    </div>
  );
};

export default ChatBox;
