import React from "react";
import { Copy } from "lucide-react";
import { useLocation } from "react-router";
import { toast } from "sonner";

const IntegrationPage = () => {
  const location = useLocation();
  const { newAdminId, name } = location.state || {};

  const scriptSnippet = `<script>
  window.ChatbotConfig = {
    apiUrl: 'https://chatbot-server-1-7wa3.onrender.com/api',
    socketUrl: 'https://chatbot-server-1-7wa3.onrender.com/',
    adminId: '${newAdminId}'
  };
</script>
<script src="https://anikcse19.github.io/chatbot-widget2/widget.js"></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptSnippet);
    toast.info("Script copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Integrate Chatbot
        </h1>
        <p className="text-gray-600 mb-6">
          Copy the script below and paste it before the closing{" "}
          <code>&lt;/body&gt;</code> tag on your website.
        </p>

        <div className="bg-gray-100 border rounded-lg p-4 flex justify-between items-center mb-6">
          <code className="text-sm text-gray-700">{scriptSnippet}</code>
          <button
            onClick={copyToClipboard}
            className="ml-3 p-2 rounded-md hover:bg-gray-200 transition cursor-pointer"
          >
            <Copy className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <a
          href="/login"
          className="inline-block w-full bg-blue-600 text-white py-3 rounded-xl shadow hover:bg-blue-700 transition font-medium"
        >
          Continue to Admin Dashboard
        </a>
      </div>
    </div>
  );
};

export default IntegrationPage;
