import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingChatButton = () => {
  const handleClick = () => {
    // Placeholder for future chat functionality
    console.log("Chat button clicked");
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
      aria-label="Open chat"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};

export default FloatingChatButton;
