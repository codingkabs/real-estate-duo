import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMessages } from "@/hooks/useMessages";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

interface MessagingPanelProps {
  propertyId: string;
  receiverId: string;
  title?: string;
}

const MessagingPanel = ({ propertyId, receiverId, title = "Messages" }: MessagingPanelProps) => {
  const { messages, isLoading, sendMessage } = useMessages(propertyId);

  const handleSendMessage = (messageText: string) => {
    sendMessage(receiverId, messageText);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <MessagesList messages={messages} isLoading={isLoading} />
        <MessageInput onSend={handleSendMessage} />
      </CardContent>
    </Card>
  );
};

export default MessagingPanel;
