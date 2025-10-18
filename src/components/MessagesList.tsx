import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { Message } from "@/hooks/useMessages";
import { cn } from "@/lib/utils";

interface MessagesListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessagesList = ({ messages, isLoading }: MessagesListProps) => {
  const { user } = useAuth();

  if (isLoading) {
    return <div className="p-4 text-center text-muted-foreground">Loading messages...</div>;
  }

  if (messages.length === 0) {
    return <div className="p-4 text-center text-muted-foreground">No messages yet</div>;
  }

  return (
    <ScrollArea className="h-[400px] p-4">
      <div className="space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.sender_id === user?.id;
          
          return (
            <div
              key={message.id}
              className={cn(
                "flex",
                isOwnMessage ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[70%] rounded-lg p-3",
                  isOwnMessage
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-sm">{message.message}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default MessagesList;
